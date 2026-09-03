function Button({ text, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition font-medium ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;