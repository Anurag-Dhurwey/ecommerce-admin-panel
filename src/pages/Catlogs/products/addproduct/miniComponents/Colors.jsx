import React from "react";

const Colors = ({ form, setForm }) => {
  function onColor_Change(e, index) {
    const updated_colors = form.colors.map((item, i) => {
      if (i === index) {
        const val = e.target.value;
        return e.target.name.includes("qty")
          ? { ...item, qty: Math.abs(parseInt(val)) }
          : { ...item, color: val };
      } else {
        return item;
      }
    });
    setForm((pre) => ({ ...pre, colors: [...updated_colors] }));
  }

  function addColor() {
    setForm((pre) => ({
      ...pre,
      colors: [...pre.colors, { qty: 1, size: "" }],
    }));
  }
  function removeColor(i) {
    const copy = [...form.colors];
    copy.splice(i, 1);
    setForm((pre) => ({
      ...pre,
      colors: copy,
    }));
  }

  return (
    <>
      <div>
        {form.colors.length ? (
          <div>
            {form.colors?.map(({ qty, color }, i) => {
              return (
                <div key={i} className="d-flex align-items-end gap-2 w-100">
                  <span>
                    {i === 0 ? <h6>Quantity</h6> : null}
                    <input
                      style={{ height: "fit-content" }}
                      name={`qty_${i}`}
                      onChange={(e) => onColor_Change(e, i)}
                      placeholder="Quantity"
                      type="number"
                      value={qty}
                      min={1}
                      id={`qty_${i}`}
                    />
                  </span>
                  <span>
                    {i === 0 ? <h6>Color</h6> : null}
                    <input
                      style={{ height: "17px", width: "20px" }}
                      type="color"
                      name={`color_${i}`}
                      onChange={(e) => onColor_Change(e, i)}
                      value={color}
                    />
                  </span>
                  {/* <input
                          style={{height:"fit-content"}}
                            name={`color_${i}`}
                            onChange={(e) => onColor_Change(e, i)}
                            placeholder="Color"
                            type="text"
                            value={color}
                          /> */}
                  <button type="button" onClick={() => removeColor(i)}>
                    delete
                  </button>
                </div>
              );
            })}
            <button type="button" onClick={() => addColor()}>
              more
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => addColor()}>
            would you like to add colors
          </button>
        )}
      </div>
    </>
  );
};

export default Colors;
