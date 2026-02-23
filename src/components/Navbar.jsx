import { Link, useLocation } from "react-router-dom"

function Navbar() {
  const location = useLocation()

  const navItem = (path, label) => (
    <Link
      to={path}
      className={`px-4 py-2 rounded-lg transition text-sm ${
        location.pathname === path
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:bg-gray-800"
      }`}
    >
      {label}
    </Link>
  )

  return (
    <div className="bg-gray-950 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 
                      flex flex-col sm:flex-row 
                      items-center sm:justify-between gap-4">

        <div className="text-center sm:text-left">
          <h1 className="text-lg sm:text-xl font-bold text-blue-400">
            Post-Quantum Cryptanalysis Lab
          </h1>
          <p className="text-xs text-gray-500">
            Shor-Based RSA Factorization Demonstration
          </p>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-end gap-3">
          {navItem("/", "Cryptanalysis")}
          {navItem("/calculate", "Key Generator")}
          {navItem("/suggest", "Test Cases")}
          {navItem("/about", "About")}
        </div>
      </div>
    </div>
  )
}

export default Navbar