function ResultCard({ result }) {
  if (!result) return null

  return (
    <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
      <h3 className="text-2xl font-semibold mb-8 text-red-400">
        Quantum Cryptanalysis Report
      </h3>

      {/* Phase 1 */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-200 mb-4">
          Phase 1 – Quantum Factorization
        </h4>

        <div className="grid grid-cols-2 gap-4 text-gray-300">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Recovered Prime p</p>
            <p className="text-lg text-green-400">{result.recovered_p}</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Recovered Prime q</p>
            <p className="text-lg text-green-400">{result.recovered_q}</p>
          </div>
        </div>
      </div>

      {/* Phase 2 */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-200 mb-4">
          Phase 2 – Private Key Reconstruction
        </h4>

        <div className="grid grid-cols-2 gap-4 text-gray-300">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Euler's Totient φ(N)</p>
            <p className="text-lg">{result.phi}</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Recovered Private Key (d)</p>
            <p className="text-lg text-blue-400">{result.private_d}</p>
          </div>
        </div>
      </div>

      {/* Phase 3 */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-200 mb-4">
          Phase 3 – Message Recovery
        </h4>

        <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
          <p className="text-sm text-gray-400">Ciphertext</p>
          <p className="text-lg">{result.cipher}</p>

          <div className="mt-4 border-t border-gray-700 pt-4">
            <p className="text-sm text-gray-400">Decrypted Plaintext</p>
            <p className="text-xl text-yellow-400 font-semibold">
              {result.decrypted}
            </p>
          </div>
        </div>
      </div>

      {/* Verification */}
      <div className="bg-gray-800 p-4 rounded-lg text-gray-300 border border-gray-700">
        <h4 className="text-md font-semibold text-gray-200 mb-2">
          Verification
        </h4>
        <p className="text-sm text-gray-400">
          Encryption Check: M<sup>e</sup> mod N = Ciphertext
        </p>
        <p className="text-sm mt-2">
          {result.decrypted}<sup>{result.public_e}</sup> mod {result.n}
        </p>
      </div>
    </div>
  )
}

export default ResultCard