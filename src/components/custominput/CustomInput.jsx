const CustomInput = (props) => {
  const { name, value, setForm, type, label, id, className } = props;
  if (type === "textarea") {
    return (
      <div className=" mb-3 mx-1 ">
        <textarea
          style={{ maxWidth: "98%" }}
          className={`form-control ${className}`}
          id={id}
          placeholder={label}
          name={name}
          value={value}
          onChange={(e) =>
            setForm((pre) => ({ ...pre, [e.target.name]: e.target.value }))
          }
          rows="3"
        ></textarea>
      </div>
    );
  }
  return (
    // <div className="form-floating mb-3 mx-1  ">
    <div className=" mb-3 mx-1 ">
      <input
        style={{ maxWidth: "98%" }}
        type={type}
        className={`form-control ${className}`}
        id={id}
        placeholder={label}
        name={name}
        value={value}
        onChange={(e) =>
          setForm((pre) => ({ ...pre, [e.target.name]: e.target.value }))
        }
      />
      {/* <label htmlFor={id} className="form-label">
        {label}
      </label> */}
    </div>
  );
};

export default CustomInput;
