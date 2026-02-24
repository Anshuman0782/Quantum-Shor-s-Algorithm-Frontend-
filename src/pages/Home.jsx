import { Link } from "react-router-dom"
import quantumBg from "../../public/quantum-bg.png"

function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">

 {/* HERO SECTION */}
<div className="relative h-screen flex items-center justify-center text-center overflow-hidden">

{/* Background Image */}
<div
 className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed 
           brightness-[0.7] saturate-[1.1] blur-[1px]"
  style={{
    backgroundImage: `url(${quantumBg})`,
  }}
/>

{/* Professional Gradient Overlay */}
<div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-gray-950"></div>

  {/* Content */}
  <div className="relative z-10 max-w-5xl px-6">
    <h1 className="text-4xl sm:text-6xl font-bold text-blue-400 mb-6">
      Quantum Cryptanalysis Lab
    </h1>

    <p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg mb-10">
      A Hybrid Quantum–Classical Simulation of Shor’s Algorithm
      demonstrating how quantum computing can threaten classical RSA cryptography.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-6">
      <Link
        to="/attack"
        className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-xl transition"
      >
        Launch Cryptanalysis
      </Link>

      <Link
        to="/suggest"
        className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition"
      >
        Generate Test Data
      </Link>
    </div>
  </div>
</div>

      {/* SHORTCUT SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-16">

        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-12 text-purple-400">
          Explore the Simulator
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

          <Link
            to="/attack"
            className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-red-500 transition"
          >
            <h3 className="text-red-400 text-lg font-semibold mb-3">
              Break RSA
            </h3>
            <p className="text-gray-400 text-sm">
              Perform hybrid quantum-classical RSA factorization and
              decrypt ciphertext.
            </p>
          </Link>

          <Link
            to="/calculate"
            className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-green-500 transition"
          >
            <h3 className="text-green-400 text-lg font-semibold mb-3">
              Generate RSA Keys
            </h3>
            <p className="text-gray-400 text-sm">
              Demonstrate classical RSA key generation and key structure.
            </p>
          </Link>

          <Link
            to="/suggest"
            className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-purple-500 transition"
          >
            <h3 className="text-purple-400 text-lg font-semibold mb-3">
              Test Parameters
            </h3>
            <p className="text-gray-400 text-sm">
              Automatically generate RSA parameters suitable for simulation.
            </p>
          </Link>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 text-center">

        <p className="text-gray-400 text-sm mb-3">
          Hybrid Quantum RSA Cryptanalysis Simulator Develop By Anshuman
        </p>

        <a
          href="mailto:anshumansarkar600@gmail.com"
          className="text-blue-400 hover:text-blue-500 transition text-sm"
        >
          Send Feedback
        </a>

      </footer>

    </div>
  )
}

export default Home