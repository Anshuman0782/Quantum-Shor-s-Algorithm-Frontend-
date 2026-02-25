import { useState } from "react";
import axios from "axios";
import InputField from "../components/InputField";

function CalculateKey() {
  const [p, setP] = useState("");
  const [q, setQ] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [showTrace, setShowTrace] = useState(false);

  const generationSteps = [
    "Validating prime inputs...",
    "Computing modulus N = p × q...",
    "Calculating Euler’s Totient φ(N)...",
    "Selecting public exponent e...",
    "Computing modular inverse d...",
  ];

  const runGenerationLogs = async () => {
    setShowTrace(true);
    for (let i = 0; i < generationSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setLogs((prev) => [...prev, generationSteps[i]]);
    }
  };

  const handleCalculate = async () => {
    setError("");
    setResult(null);
    setLogs([]);
    setShowTrace(false);

    if (!p || !q) {
      setError("Both prime values are required.");
      return;
    }

    if (Number(p) <= 1 || Number(q) <= 1) {
      setError("p and q must be prime numbers greater than 1.");
      return;
    }

    try {
      setLoading(true);

      await runGenerationLogs();

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/calculate-key`,
        {
          p: Number(p),
          q: Number(q),
        },
      );

      setResult(res.data);

      // Smooth collapse of execution trace
      setTimeout(() => setShowTrace(false), 600);
      setTimeout(() => setLogs([]), 1100);
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("RSA key generation failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-green-400">
        Classical RSA Key Generation
      </h2>

      <p className="text-gray-400 mb-6 max-w-3xl text-sm sm:text-base">
        This module demonstrates the classical RSA key generation process. Given
        two prime numbers p and q, the system computes the modulus, Euler’s
        Totient, public exponent, and private key.
      </p>

      {/* Responsive Input Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Prime (p)"
          value={p}
          onChange={(e) => setP(e.target.value)}
        />
        <InputField
          label="Prime (q)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <button
        onClick={handleCalculate}
        disabled={loading}
        className="mt-6 w-full sm:w-auto px-6 py-3 
                   bg-green-600 rounded-xl hover:bg-green-700 
                   disabled:opacity-50 transition"
      >
        {loading ? "Generating RSA Keys..." : "Generate RSA Keys"}
      </button>

      {/* Animated Generation Trace */}
      <div
        className={`mt-8 overflow-hidden transition-all duration-700 ease-in-out
        ${showTrace ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
          <h4 className="text-sm text-gray-400 mb-4">Key Generation Trace</h4>

          <div className="space-y-3 text-sm text-gray-300">
            {logs.map((log, index) => (
              <div key={index} className="flex items-center gap-3">
                {loading && index === logs.length - 1 ? (
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                ) : (
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                )}
                <span className="break-words">{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-900 text-red-300 p-4 rounded-lg">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-10 bg-gray-900 p-6 rounded-xl border border-gray-800 text-gray-300 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg break-words">
              <p className="text-sm text-gray-400">Modulus (N = p × q)</p>
              <p className="text-lg">{result.n}</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg break-words">
              <p className="text-sm text-gray-400">Euler's Totient φ(N)</p>
              <p className="text-lg">{result.phi}</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg break-words">
              <p className="text-sm text-gray-400">Public Exponent (e)</p>
              <p className="text-lg text-blue-400">{result.public_e}</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg break-words">
              <p className="text-sm text-gray-400">Private Key (d)</p>
              <p className="text-lg text-green-400">{result.private_d}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalculateKey;
