import ErrorMessage from "./ErrorMessage";

// Ovo je  "šablona"
export default function InputGroup({
  label,
  name,
  value,
  onChange,
  prefix,
  suffix,
  className,
  error,
}) {
  return (
    <div className={`input-field ${className || ""} ${error && "error"}`}>
      <label>{label}</label>
      <div className="input-wrapper">
        {/* Ako si poslao prefix (npr. £), on se crta ovdje */}
        {prefix && <span className="prefix">{prefix}</span>}
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          step="any"
        />
        {/* Ako si poslao suffix (npr. %), on se crta ovdje */}
        {suffix && <span className="suffix">{suffix}</span>}
      </div>
      <ErrorMessage className={`errormessage ${error ? "visible" : ""}`} />
    </div>
  );
}
