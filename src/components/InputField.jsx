function InputField({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        type="number"
        min="1"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-800 p-3 rounded-lg outline-none 
                   focus:ring-2 focus:ring-blue-500 
                   border border-gray-700 text-gray-200"
      />
    </div>
  )
}

export default InputField