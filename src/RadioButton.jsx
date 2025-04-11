import "./RadioButton.css";

function RadioButton({ label, name, checked, onChange }) {
    return (
        <label className="radio-button">
            <input
                type="radio"
                name={name}
                checked={checked}
                onChange={onChange}
                className="radio-input"
            />
            <span className="radio-label">{label}</span>
        </label>
    );
}

export default RadioButton;