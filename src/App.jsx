import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import BreakRSA from "./pages/BreakRSA"
import CalculateKey from "./pages/CalculateKey"
import SuggestData from "./pages/SuggestData"
import About from "./pages/About"

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<BreakRSA />} />
        <Route path="/calculate" element={<CalculateKey />} />
        <Route path="/suggest" element={<SuggestData />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App