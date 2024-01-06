import React from "react";

const MetaData = ({ form, setForm }) => {
  function onMeta_data_Change(e, index) {
    const updated_meta = form.meta_data.map((item, i) => {
      if (i === index) {
        return e.target.name.includes("key")
          ? { ...item, key: e.target.value }
          : { ...item, value: e.target.value };
      } else {
        return item;
      }
    });
    setForm((pre) => ({ ...pre, meta_data: [...updated_meta] }));
  }

  function addMeta_data() {
    setForm((pre) => ({
      ...pre,
      meta_data: [...pre.meta_data, { key: "", value: "" }],
    }));
  }

  function removeMeta_data(i) {
    const copy = [...form.meta_data];
    copy.splice(i, 1);
    setForm((pre) => ({
      ...pre,
      meta_data: copy,
    }));
  }
  return (
    <>
      <div>
        {form.meta_data.length ? (
          <div className="table">
            {form.meta_data?.map(({ key, value }, i) => {
              return (
                <span key={i} className="d-flex gap-2">
                  <input
                    name={`key_${i}`}
                    onChange={(e) => onMeta_data_Change(e, i)}
                    placeholder="key"
                    type="text"
                    value={key}
                  />
                  <input
                    name={`value_${i}`}
                    onChange={(e) => onMeta_data_Change(e, i)}
                    placeholder="value"
                    type="text"
                    value={value}
                  />
                  <button type="button" onClick={() => removeMeta_data(i)}>
                    delete
                  </button>
                </span>
              );
            })}
          </div>
        ) : (
          <button type="button" onClick={() => addMeta_data()}>
            would you like to add meta data
          </button>
        )}
        {form.meta_data.length ? (
          <button type="button" onClick={() => addMeta_data()}>
            more
          </button>
        ) : null}
      </div>
    </>
  );
};

export default MetaData;
