import React, { useEffect } from "react";
import { form_template } from "../Addproduct";

const Featured_on: React.FC<{
  form: form_template;
  setForm: React.Dispatch<React.SetStateAction<form_template>>;
}> = ({ form, setForm }) => {
  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.toLowerCase();
    setForm((pre) => {
      const copy = { ...pre };
      if (copy.featured_on.includes(val)) {
        copy.featured_on = copy.featured_on.filter((str) => str !== val);
      } else {
        copy.featured_on = [...copy.featured_on, val];
      }
      return { ...copy };
    });
  }
  const sections = [
    "Manage Your Health Today",
    "Solutions for Everyday Ailments",
    "Limited-Time Treasures",
    "Fuel Your Fitness Journey",
  ];

  useEffect(() => {
    console.log(form);
  }, [form, setForm]);
  return (
    <div className=" d-flex gap-4 flex-wrap">
      {sections.map((section, i) => {
        return (
          <span key={i + section} className=" d-flex gap-2">
            <label htmlFor={section}>{section}</label>
            <input
              id={section}
              type="checkbox"
              value={section}
              onChange={(e) => onChangeHandler(e)}
              checked={form.featured_on.includes(section.toLocaleLowerCase())}
            />
          </span>
        );
      })}
      {/* <span className=" d-flex gap-2">
        <label>50% off</label>
        <input
          type="checkbox"
          value={"50%off"}
          onChange={(e) => onChangeHandler(e)}
          checked={form.featured_on.includes("50%off".toLocaleLowerCase())}
        />
      </span> */}
      {/* <span className=" d-flex gap-2">
        <label>Deal of the day</label>
        <input
          type="checkbox"
          value={"Deal of the day"}
          onChange={(e) => onChangeHandler(e)}
          checked={form.featured_on.includes(
            "Deal of the day".toLocaleLowerCase()
          )}
        />
      </span> */}
    </div>
  );
};

export default Featured_on;
