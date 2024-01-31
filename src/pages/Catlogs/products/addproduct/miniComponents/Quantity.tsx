import React from "react";
import { form_template } from "../Addproduct";

const Quantity: React.FC<{
  form: form_template;
  setForm: React.Dispatch<React.SetStateAction<form_template>>;
}> = ({ form, setForm }) => {
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
