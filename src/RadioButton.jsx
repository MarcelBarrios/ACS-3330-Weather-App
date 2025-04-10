function RadioButton({ label, name, checked, onChange }) {
    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <div className="relative">
                <input
                    type="radio"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className="sr-only"
                />
                <div className={`w-5 h-5 border rounded-full ${checked ? 'border-blue-600' : 'border-gray-300'}`}>
                    <div className={`absolute w-3 h-3 rounded-full left-1 top-1 transition-all ${checked ? 'bg-blue-600' : 'bg-transparent'}`}></div>
                </div>
            </div>
            <span className={`text-sm ${checked ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>{label}</span>
        </label>
    );
}

export default RadioButton;