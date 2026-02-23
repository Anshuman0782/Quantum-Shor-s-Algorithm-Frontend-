import React from "react"

function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 text-gray-300">

      <h2 className="text-3xl font-bold text-blue-400 mb-6">
        About This Project
      </h2>

      <div className="space-y-6 text-sm sm:text-base">

        <p>
          This project demonstrates RSA cryptanalysis inspired by 
          Shor’s Algorithm, a quantum algorithm capable of factoring 
          integers in polynomial time.
        </p>

        <p>
          Due to practical limitations of current quantum hardware and 
          simulators, full modular exponentiation circuits are not 
          feasible for arbitrary RSA moduli. Therefore, this system 
          implements a hybrid quantum-classical approach.
        </p>

        <p>
          The period-finding stage is computed classically to ensure 
          mathematical correctness and stability, while the Quantum 
          Fourier Transform (QFT) stage is visualized using Qiskit 
          to demonstrate the quantum structure of Shor’s Algorithm.
        </p>

        <p>
          This approach reflects realistic constraints in present-day 
          quantum computing research, where hybrid quantum-classical 
          models are widely adopted.
        </p>

        <div className="bg-yellow-900/40 border border-yellow-700 p-4 rounded-lg mt-6">
          <p className="text-yellow-300">
            ⚠ This simulator is designed for educational and research 
            demonstration purposes. It does not represent large-scale 
            practical RSA key breaking using current quantum hardware.
          </p>
        </div>

      </div>
    </div>
  )
}

export default About