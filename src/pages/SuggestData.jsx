import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SuggestData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  const fetchSuggestion = async () => {
    try {
      setLoading(true);
      setShowContent(false);

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/suggest`);
      // Small delay for smooth UX
      setTimeout(() => {
        setData(res.data);
        setShowContent(true);
      }, 600);
    } catch (err) {
      console.error("Failed to fetch suggestion");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestion();
  }, []);

  const useData = () => {
    navigate("/attack", { state: data });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-red-500">
        Quantum-Simulator Optimized Test Data
      </h2>

      <p className="text-gray-400 mb-6 max-w-3xl text-sm sm:text-base">
        This module generates RSA parameters that are suitable for quantum-based
        factorization demonstrations. The values are intentionally small to
        ensure compatibility with Shor's algorithm simulation.
      </p>

      <div className="bg-gray-900 p-6 sm:p-8 rounded-xl border border-gray-800">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm sm:text-base">
              Generating quantum-friendly RSA parameters...
            </p>
          </div>
        ) : data ? (
          <div
            className={`transition-all duration-700 ease-in-out 
                        ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
              <div className="bg-gray-800 p-4 rounded-lg break-words">
                <p className="text-sm text-gray-400">Modulus (N)</p>
                <p className="text-lg text-blue-400">{data.n}</p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg break-words">
                <p className="text-sm text-gray-400">Public Exponent (e)</p>
                <p className="text-lg text-blue-400">{data.e}</p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg break-words">
                <p className="text-sm text-gray-400">Original Message (M)</p>
                <p className="text-lg text-yellow-400">{data.message}</p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg break-words">
                <p className="text-sm text-gray-400">
                  Generated Ciphertext (C)
                </p>
                <p className="text-lg text-green-400">{data.cipher}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button
                onClick={fetchSuggestion}
                className="w-full sm:w-auto px-6 py-3 
                           bg-purple-600 rounded-xl 
                           hover:bg-purple-700 transition"
              >
                Generate New Parameters
              </button>

              <button
                onClick={useData}
                className="w-full sm:w-auto px-6 py-3 
                           bg-red-600 rounded-xl 
                           hover:bg-red-700 transition"
              >
                Use in Cryptanalysis
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">No data available</p>
        )}
      </div>
    </div>
  );
}

export default SuggestData;
