import React from "react";

const COD = ({ form, setForm }) => {
  function onChangeHandler() {
    setForm((pre) => {
      return { ...pre, is_cod_availabe: !pre.is_cod_availabe };
    });
  }
  return (
    <div>
      <label htmlFor="is_cod_availabe" className=" px-3">Check if yes</label>
      <input
        checked={form?.is_cod_availabe}
        onChange={() => onChangeHandler()}
        type="checkbox"
        name="is_cod_availabe"
        id="is_cod_availabe"
      />
    </div>
  );
};

export default COD;
