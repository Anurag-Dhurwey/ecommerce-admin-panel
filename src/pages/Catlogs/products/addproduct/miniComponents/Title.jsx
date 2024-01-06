import React from "react";

const Title = ({ form, setForm }) => {

  return (
    <>
     
      <div className="w-100">
        <input
          style={{ width: "95%" }}
          name="title"
          value={form.title}
          min={0}
          onChange={(e) =>
            setForm((pre) => ({
              ...pre,
              [e.target.name]: e.target.value,
            }))
          }
          type="text"
          id=""
          className="w-90"
          placeholder="Title"
        />
      </div>
    </>
  );
};

export default Title;
