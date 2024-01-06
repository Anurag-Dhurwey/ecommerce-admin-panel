

const Description = ({ form, setForm }) => {
  function onSub_desc_Change(e, index) {
    const updated_sub_desc = form.description.sub_desc.map((item, i) => {
      if (i === index) {
        return e.target.name.includes("key")
          ? { ...item, key: e.target.value }
          : { ...item, value: e.target.value };
      } else {
        return item;
      }
    });
    setForm((pre) => ({
      ...pre,
      description: { ...pre.description, sub_desc: [...updated_sub_desc] },
    }));
  }

  function addSub_desc() {
    setForm((pre) => ({
      ...pre,
      description: {
        ...pre.description,
        sub_desc: [...pre.description.sub_desc, { key: "", value: "" }],
      },
    }));
  }
  function removeSub_desc(i) {
    const copy = [...form.description.sub_desc];
    copy.splice(i, 1);
    setForm((pre) => ({
      ...pre,
      description: { ...pre.description, sub_desc: copy },
    }));
  }

  return (
    <>
      <div>
        <div>
          <textarea
            style={{ width: "95%" }}
            className={``}
            id=""
            placeholder={"Description"}
            name="head_desc"
            min={0}
            value={form.description.head_desc}
            onChange={(e) =>
              setForm((pre) => ({
                ...pre,
                description: {
                  ...pre.description,
                  [e.target.name]: e.target.value,
                },
              }))
            }
            rows="3"
          ></textarea>
        </div>
        <div className="">
          {form.description.sub_desc?.map(({ key, value }, i) => {
            return (
              <span key={i} className="d-flex gap-2">
                <input
                  name={`key_${i}`}
                  onChange={(e) => onSub_desc_Change(e, i)}
                  placeholder="key"
                  type="text"
                  value={key}
                />
                <input
                  name={`value_${i}`}
                  onChange={(e) => onSub_desc_Change(e, i)}
                  placeholder="value"
                  type="text"
                  value={value}
                />
                <button type="button" onClick={() => removeSub_desc(i)}>
                  delete
                </button>
              </span>
            );
          })}

          {form.description.sub_desc.length ? (
            <button type="button" onClick={() => addSub_desc()}>
              more
            </button>
          ) : (
            <button
              type="button"
              className="w-fit h-fit"
              onClick={() => addSub_desc()}
            >
              would you like to describe using table
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Description;
