const CustomInput: React.FC<{
  type: string;
  label?: string;
  i_id?: string;
  i_class?: string;
  name: string;
  value: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}> = (props) => {
  const { type, label, i_id, i_class, name, value, onChange, onBlur } = props;
  return (
    <div className="form-floating mb-3 mx-1 " style={{}}>
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={i_id} className="form-label">
        {label}
      </label>
    </div>
  );
};

export default CustomInput;
