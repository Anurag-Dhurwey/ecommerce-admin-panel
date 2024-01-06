import React from "react";

const Quantity = ({ form, setForm }) => {
  return (
    <>
      <div>
        <input
          value={form.quantity}
          type="number"
          id="quantity"
          name="quantity"
          min={0}
          onChange={(e) =>
            setForm((pre) => ({
              ...pre,
              [e.target.name]: e.target.value,
            }))
          }
          placeholder="total quantity"
        />
      </div>
    </>
  );
};

export default Quantity;
