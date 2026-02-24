import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { Menu, X } from "lucide-react"

function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const navItem = (path, label) => (
    <Link
      to={path}
      onClick={() => setOpen(false)}
      className={`relative px-3 py-2 text-sm transition ${
        location.pathname === path
          ? "text-white"
          : "text-gray-300 hover:text-white"
      }`}
    >
      {label}

      {/* Active underline */}
      {location.pathname === path && (
        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-500"></span>
      )}
    </Link>
  )

  return (
    <nav className="fixed top-0 left-0 w-full z-50 
                    bg-black/60 backdrop-blur-md 
                    border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-4 
                      flex items-center justify-between">

        {/* Logo */}
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-white">
            Quantum Cryptanalysis Lab
          </h1>
          <p className="text-xs text-gray-400 hidden sm:block">
            Shor-Based RSA Factorization
          </p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navItem("/", "Home")}
          {navItem("/attack", "Cryptanalysis")}
          {navItem("/calculate", "Key Generator")}
          {navItem("/suggest", "Test Cases")}
          {navItem("/about", "About")}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg 
                        border-t border-white/10 
                        px-6 py-4 flex flex-col gap-4">
          {navItem("/", "Home")}
          {navItem("/attack", "Cryptanalysis")}
          {navItem("/calculate", "Key Generator")}
          {navItem("/suggest", "Test Cases")}
          {navItem("/about", "About")}
        </div>
      )}
    </nav>
  )
}

export default Navbar