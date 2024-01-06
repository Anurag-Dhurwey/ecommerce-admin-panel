import React from "react";

const Category = ({ form, setForm }) => {
  function onCategoryChange(e) {
    const val = e.target.value;
    // if (val === "select") return;
    setForm((pre) => ({
      ...pre,
      category:
        val === "select"
          ? { ...pre.category, primary: "", other: false }
          : val === "other"
          ? { ...pre.category, primary: "", other: true }
          : { ...pre.category, primary: val },
    }));
  }
  return (
    <>
      <div>
        <label className="px-3 " htmlFor="">
          {form.category.primary}
        </label>
        {!form.category.other ? (
          <select
            name="category_primary"
            id="category_primary"
            onChange={(e) => onCategoryChange(e)}
          >
            {[
              "select",
              "ctr_1",
              "ctr_2",
              "ctr_3",
              "ctr_1",
              "ctr_2",
              "ctr_3",
              "other",
            ].map((ctr, i) => {
              return (
                <option key={i} value={ctr}>
                  {ctr}
                </option>
              );
            })}
          </select>
        ) : (
          <span>
            <input
              onChange={(e) =>
                setForm((pre) => ({
                  ...pre,
                  category: {
                    ...pre.category,
                    primary: e.target.value,
                  },
                }))
              }
              placeholder="category-primary"
              type="text"
            />
            <button
              type="button"
              onClick={() =>
                setForm((pre) => ({
                  ...pre,
                  category: {
                    ...pre.category,
                    primary: "",
                    other: false,
                  },
                }))
              }
            >
              remove
            </button>
          </span>
        )}
      </div>
    </>
  );
};

export default Category;
