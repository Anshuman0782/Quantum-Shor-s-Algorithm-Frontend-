import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import InputField from "../components/InputField";
import ResultCard from "../components/ResultCard";
import QuantumDetails from "../components/QuantumDetails";

function BreakRSA() {
  const [n, setN] = useState("");
  const [eValue, setEValue] = useState("");
  const [cipher, setCipher] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [logs, setLogs] = useState([]);
  const [showTrace, setShowTrace] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setN(location.state.n || "");
      setEValue(location.state.e || "");
      setCipher(location.state.cipher || "");
    }
  }, [location.state]);

  const executionSteps = [
    "Initializing quantum order-finding circuit...",
    "Executing modular exponentiation...",
    "Measuring quantum period r...",
    "Performing classical post-processing...",
    "Recovering prime factors...",
    "Reconstructing private key...",
  ];

  const runExecutionLogs = async () => {
    setShowTrace(true);

    for (let i = 0; i < executionSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setLogs((prev) => [...prev, executionSteps[i]]);
    }
  };

  const handleBreak = async () => {
    setError("");
    setResult(null);
    setLogs([]);
    setShowTrace(false);

    if (!n || !eValue || !cipher) {
      setError("All fields are required.");
      return;
    }

    if (Number(cipher) >= Number(n)) {
      setError("Ciphertext must be less than modulus N.");
      return;
    }

    try {
      setLoading(true);

      await runExecutionLogs();

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/break-rsa`,
        {
          n: Number(n),
          e: Number(eValue),
          cipher: Number(cipher),
        },
      );

      setResult(res.data);

      // Smooth collapse after completion
      setTimeout(() => {
        setShowTrace(false);
      }, 700);

      setTimeout(() => {
        setLogs([]);
      }, 1200);
    } catch (err) {
      setError("Quantum simulator execution failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-red-500">
        Quantum-Enabled RSA Cryptanalysis
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputField
          label="Modulus (N)"
          value={n}
          onChange={(e) => setN(e.target.value)}
        />
        <InputField
          label="Public Exponent (e)"
          value={eValue}
          onChange={(e) => setEValue(e.target.value)}
        />
        <InputField
          label="Ciphertext (C)"
          value={cipher}
          onChange={(e) => setCipher(e.target.value)}
        />
      </div>

      <button
        onClick={handleBreak}
        disabled={loading}
        className="mt-6 w-full sm:w-auto px-6 py-3 
                   bg-red-600 rounded-xl hover:bg-red-700 
                   disabled:opacity-50 transition"
      >
        {loading
          ? "Executing Quantum Cryptanalysis..."
          : "Launch Cryptanalysis"}
      </button>

      {/* Animated Execution Trace */}
      <div
        className={`mt-8 overflow-hidden transition-all duration-700 ease-in-out
        ${showTrace ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
          <h4 className="text-sm text-gray-400 mb-4">Execution Trace</h4>

          <div className="space-y-3 text-sm text-gray-300">
            {logs.map((log, index) => (
              <div key={index} className="flex items-center gap-3">
                {loading && index === logs.length - 1 ? (
                  <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                ) : (
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
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
        <div className="mt-10">
          <ResultCard result={result} />
          <QuantumDetails result={result} />
        </div>
      )}
    </div>
  );
}

export default BreakRSA;
