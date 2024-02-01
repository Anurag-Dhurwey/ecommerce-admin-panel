import React from "react";
import { form_template } from "../Addproduct";

const Size: React.FC<{
  form: form_template;
  setForm: React.Dispatch<React.SetStateAction<form_template>>;
}> = ({ form, setForm }) => {
  function onSize_Change(e:React.ChangeEvent<HTMLInputElement>, index:number) {
    const updated_size = form.sizes.map((item, i) => {
      if (i === index) {
        const val = e.target.value;
        return e.target.name.includes("qty")
          ? { ...item, qty: Math.abs(parseInt(val)) }
          : { ...item, size: val };
      } else {
        return item;
      }
    });
    setForm((pre) => ({ ...pre, sizes: [...updated_size] }));
  }

  function addSize() {
    setForm((pre) => ({
      ...pre,
      sizes: [...pre.sizes, { qty: 1, size: "" }],
    }));
  }
  function removeSize(i:number) {
    const copy = [...form.sizes];
    copy.splice(i, 1);
    setForm((pre) => ({
      ...pre,
      sizes: copy,
    }));
  }

  return (
    <>
      <div className="w-100">
        {form.sizes.length ? (
          <div className="w-100">
            {form.sizes?.map(({ qty, size }, i) => {
              return (
                <div key={i} className="d-flex align-items-end gap-2 w-100">
                  <span>
                    {i === 0 ? <h6>Quantity </h6> : null}
                    <input
                      name={`qty_${i}`}
                      onChange={(e) => onSize_Change(e, i)}
                      placeholder="Quantity"
                      type="number"
                      value={qty}
                      min={1}
                      id={`qty_${i}`}
                    />
                  </span>
                  <span>
                    {i === 0 ? <h6>Size </h6> : null}
                    <input
                      name={`size_${i}`}
                      id={`size_${i}`}
                      onChange={(e) => onSize_Change(e, i)}
                      placeholder="size"
                      type="text"
                      value={size}
                    />
                  </span>

                  <button type="button" onClick={() => removeSize(i)}>
                    delete
                  </button>
                </div>
              );
            })}
            <button type="button" onClick={() => addSize()}>
              more
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => addSize()}>
            would you like to add Sizes
          </button>
        )}
      </div>
    </>
  );
};

export default Size;
