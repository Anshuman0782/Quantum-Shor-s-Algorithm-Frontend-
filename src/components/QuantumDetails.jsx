import { useState } from "react"

function QuantumDetails({ result }) {
  const [expanded, setExpanded] = useState(false)
  const [showMath, setShowMath] = useState(false)

  if (!result) return null

  const { quantum_a, period, circuit_image, n, recovered_p, recovered_q } = result

  return (
    <div className="bg-gray-900 p-6 sm:p-8 rounded-xl border border-gray-800 mt-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-purple-400">
          Quantum Phase Analysis
        </h3>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
        >
          {expanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {/* Collapsible Content */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          expanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >

        {/* Explanation */}
        <div className="bg-gray-800 p-4 rounded-lg text-gray-300 text-sm sm:text-base mb-6">
          <p>
            A random value <span className="text-blue-400 font-semibold">a</span> is selected
            such that gcd(a, N) = 1. The algorithm computes the period{" "}
            <span className="text-yellow-400 font-semibold">r</span> satisfying:
          </p>

          <div className="mt-3 text-center text-green-400 font-mono text-lg">
            a<sup>r</sup> ≡ 1 (mod N)
          </div>

          <p className="mt-3">
            This period enables extraction of prime factors via classical post-processing.
          </p>
        </div>

        {/* Quantum Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300 mb-6">

          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Selected Base (a)</p>
            <p className="text-lg text-blue-400 font-semibold">
              {quantum_a ?? "N/A"}
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Computed Period (r)</p>
            <p className="text-lg text-yellow-400 font-semibold">
              {period ?? "N/A"}
            </p>
          </div>

        </div>

        {/* Step-by-Step Math */}
        {quantum_a && period && (
          <div className="bg-gray-800 p-4 rounded-lg mb-6 text-gray-300 text-sm sm:text-base">

            <div className="flex justify-between items-center mb-3">
              <p className="text-gray-400">Mathematical Derivation</p>
              <button
                onClick={() => setShowMath(!showMath)}
                className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded transition"
              >
                {showMath ? "Hide Steps" : "Show Steps"}
              </button>
            </div>

            {showMath && (
              <div className="space-y-3">

                <p>
                  Compute:
                  <span className="text-green-400 font-mono">
                    {" "}x = a<sup>r/2</sup> mod N
                  </span>
                </p>

                <p>
                  Since r is even, we calculate:
                </p>

                <div className="text-center text-yellow-400 font-mono">
                  gcd(x − 1, N) → {recovered_p}
                </div>

                <div className="text-center text-yellow-400 font-mono">
                  gcd(x + 1, N) → {recovered_q}
                </div>

                <p className="text-green-400">
                  These yield the non-trivial factors of N.
                </p>

              </div>
            )}
          </div>
        )}

        {/* Circuit Visualization */}
        {circuit_image && (
          <div className="bg-gray-800 p-4 rounded-lg">

            <p className="text-sm text-gray-400 mb-4">
              Quantum Fourier Transform Circuit
            </p>

            <div className="overflow-auto flex justify-center items-center min-h-[200px]">
              <img
                src={`data:image/png;base64,${circuit_image}`}
                alt="Quantum Circuit"
                className="max-w-full h-auto"
              />
            </div>

          </div>
        )}

      </div>

    </div>
  )
}

export default QuantumDetails