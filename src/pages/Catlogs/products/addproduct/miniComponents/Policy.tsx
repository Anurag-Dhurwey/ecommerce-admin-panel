import React from "react";
import { form_template } from "../Addproduct";

const Policy: React.FC<{
  form: form_template;
  setForm: React.Dispatch<React.SetStateAction<form_template>>;
}> = ({ form, setForm }) => {
  function onPolicy_Rule_Change(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const updated_rules = form.policy.rules.map((item, i) => {
      if (i === index) {
        return e.target.value;
      } else {
        return item;
      }
    });
    setForm((pre) => ({
      ...pre,
      policy: { ...pre.policy, rules: updated_rules },
    }));
  }

  function addPolicy_Rule() {
    setForm((pre) => ({
      ...pre,
      policy: { ...pre.policy, rules: [...pre.policy.rules, ""] },
    }));
  }
  function removePolicy_Rule(i: number) {
    const copy = [...form.policy.rules];
    copy.splice(i, 1);
    setForm((pre) => ({
      ...pre,
      policy: { ...pre.policy, rules: copy },
    }));
  }

  return (
    <>
      <div>
        <div style={{ alignItems: "center" }}>
          <label htmlFor="exchange"> Exchange-available : check if yes </label>
          <input
            onChange={() =>
              setForm((pre) => ({
                ...pre,
                policy: {
                  ...pre.policy,
                  exchange: {
                    validity: 0,
                    status: !pre.policy.exchange.status,
                  },
                },
              }))
            }
            type="checkbox"
            name="exchange"
            id="exchange"
            checked={form.policy.exchange.status}
          />

          {form.policy.exchange.status ? (
            <>
              <label htmlFor="exchange_validity_days">validity :(days) </label>
              <input
                style={{ width: "50px" }}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setForm((pre) => ({
                    ...pre,
                    policy: {
                      ...pre.policy,
                      exchange: {
                        ...pre.policy.exchange,
                        validity: !isNaN(val) ? val : 0,
                      },
                    },
                  }));
                }}
                min={0}
                max={30}
                value={form.policy.exchange.validity}
                type="number"
                name="exchange_validity_days"
                id="exchange_validity_days"
              />
            </>
          ) : null}
        </div>
        <div style={{ alignItems: "center" }}>
          <label htmlFor="return_or_refund">
            Return and Refund : check if yes{" "}
          </label>
          <input
            onChange={() =>
              setForm((pre) => ({
                ...pre,
                policy: {
                  ...pre.policy,
                  return_or_refund: {
                    validity: 0,
                    status: !pre.policy.return_or_refund.status,
                  },
                },
              }))
            }
            type="checkbox"
            name="return_or_refund"
            id="return_or_refund"
            checked={form.policy.return_or_refund.status}
          />

          {form.policy.return_or_refund.status ? (
            <>
              <label htmlFor="return_or_refund_validity_days">
                validity : (days)
              </label>
              <input
                style={{ width: "50px" }}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setForm((pre) => ({
                    ...pre,
                    policy: {
                      ...pre.policy,
                      return_or_refund: {
                        ...pre.policy.return_or_refund,
                        validity: !isNaN(val) ? val : 0,
                      },
                    },
                  }));
                }}
                value={form.policy.return_or_refund.validity}
                min={0}
                max={30}
                type="number"
                name="return_or_refund_validity_days"
                id="return_or_refund_validity_days"
              />
            </>
          ) : null}
        </div>

        <div className="gap-1">
          <h6>Rules</h6>
          {form.policy.rules.length ? (
            <div className="gap-1 w-100">
              {form.policy.rules?.map((rule, i) => {
                return (
                  <span key={i} className="d-flex gap-2 w-100">
                    <input
                      className="w-100"
                      name={`qty_${i}`}
                      onChange={(e) => onPolicy_Rule_Change(e, i)}
                      placeholder={`rule ${i + 1}`}
                      type="text"
                      value={rule}
                      min={1}
                    />
                    <button type="button" onClick={() => removePolicy_Rule(i)}>
                      delete
                    </button>
                  </span>
                );
              })}
              <button
                type="button"
                className=""
                onClick={() => addPolicy_Rule()}
              >
                more
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => addPolicy_Rule()}>
              would you like to add policy of this product
            </button>
          )}
        </div>
        <div className="gap-1">
          <h6> Description : </h6>
          <textarea
            style={{ width: "95%" }}
            onChange={(e) =>
              setForm((pre) => ({
                ...pre,
                policy: { ...pre.policy, description: e.target.value },
              }))
            }
            name="policy_desc"
            id="policy_desc"
            value={form.policy.description}
            rows={2}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default Policy;
