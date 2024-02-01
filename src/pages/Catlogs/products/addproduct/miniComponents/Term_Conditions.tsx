import React from "react";
import { form_template } from "../Addproduct";

const Term_Conditions : React.FC<{
  form: form_template;
  setForm: React.Dispatch<React.SetStateAction<form_template>>;
}> = ({ form, setForm }) => {
  function onTerms_and_Conditions_Change(e:React.ChangeEvent<HTMLInputElement>, index:number) {
    const updated_t_c = form.terms_and_conditions.map((item, i) => {
      if (i === index) {
        return e.target.value;
      } else {
        return item;
      }
    });
    setForm((pre) => ({ ...pre, terms_and_conditions: updated_t_c }));
  }

  function addTerms_Conditions() {
    setForm((pre) => ({
      ...pre,
      terms_and_conditions: [...pre.terms_and_conditions, ""],
    }));
  }
  function removeTerms_Conditions(i:number) {
    const copy = [...form.terms_and_conditions];
    copy.splice(i, 1);
    setForm((pre) => ({
      ...pre,
      terms_and_conditions: copy,
    }));
  }

  return (
    <>
      <div>
        {form.terms_and_conditions.length ? (
          <div className="table">
            {form.terms_and_conditions?.map((rule, i) => {
              return (
                <span key={i} className="d-flex gap-2">
                  <input
                    className="w-100"
                    name={`qty_${i}`}
                    onChange={(e) => onTerms_and_Conditions_Change(e, i)}
                    placeholder={`T&C ${i + 1}`}
                    type="text"
                    value={rule}
                    min={1}
                  />
                  <button
                    type="button"
                    onClick={() => removeTerms_Conditions(i)}
                  >
                    delete
                  </button>
                </span>
              );
            })}
            <button type="button" onClick={() => addTerms_Conditions()}>
              more
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => addTerms_Conditions()}>
            would you like to add terms and conditions
          </button>
        )}
      </div>
    </>
  );
};

export default Term_Conditions;
