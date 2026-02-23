function CircuitViewer({ circuit }) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Quantum Circuit</h3>
      <img
        src={`data:image/png;base64,${circuit}`}
        alt="Quantum Circuit"
        className="rounded-lg bg-white p-4"
      />
    </div>
  )
}

export default CircuitViewer