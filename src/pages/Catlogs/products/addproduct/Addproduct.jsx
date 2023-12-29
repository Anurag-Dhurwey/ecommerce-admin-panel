import { useEffect, useState } from "react";
import CustomInput from "../../../../components/custominput/CustomInput";
import "./addproduct.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// upload image section code
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

// drag and drop upload file code
const props = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
// upload image section code end here

const Addproduct = () => {
  // const [desc, setDesc] = useState("");
  // const handleDesc = (value) => {
  //   setDesc(value);
  // };

  const [form, setForm] = useState({
    title: "",
    price: "",
    local_price: "",
    head_desc: "",
    sub_desc: [{ key: "", value: "" }],
    meta_data: [],
    category: { primary: "", secondry: "", other: false },
    sizes: [],
    colors: [],
    tags: [],
    policy: {
      exchange: { status: false, expiry: 0 },
      return_or_refund: { status: false, expiry: 0 },
      description: "",
      rules: [],
    },
    terms_and_conditions: [],
  });

  function onSub_desc_Change(e, index) {
    const updated_sub_desc = form.sub_desc.map((item, i) => {
      if (i === index) {
        return e.target.name.includes("key")
          ? { ...item, key: e.target.value }
          : { ...item, value: e.target.value };
      } else {
        return item;
      }
    });
    setForm((pre) => ({ ...pre, sub_desc: [...updated_sub_desc] }));
  }

  function addSub_desc() {
    setForm((pre) => ({
      ...pre,
      sub_desc: [...pre.sub_desc, { key: "", value: "" }],
    }));
  }
  function removeSub_desc(i) {
    const copy = [...form.sub_desc];
    copy.splice(i, 1);
    setForm((pre) => ({
      ...pre,
      sub_desc: copy,
    }));
  }

  function onMeta_data_Change(e, index) {
    const updated_sub_desc = form.meta_data.map((item, i) => {
      if (i === index) {
        return e.target.name.includes("key")
          ? { ...item, key: e.target.value }
          : { ...item, value: e.target.value };
      } else {
        return item;
      }
    });
    setForm((pre) => ({ ...pre, meta_data: [...updated_sub_desc] }));
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

  function onSize_Change(e, index) {
    const updated_size = form.sizes.map((item, i) => {
      if (i === index) {
        const val = e.target.value;
        return e.target.name.includes("qty")
          ? { ...item, qty: Math.abs(val) }
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
  function removeSize(i) {
    const copy = [...form.sizes];
    copy.splice(i, 1);
    setForm((pre) => ({
      ...pre,
      sizes: copy,
    }));
  }

  function onColor_Change(e, index) {
    const updated_colors = form.colors.map((item, i) => {
      if (i === index) {
        const val = e.target.value;
        return e.target.name.includes("qty")
          ? { ...item, qty: Math.abs(val) }
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

  function onPolicy_Rule_Change(e, index) {
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
  function removePolicy_Rule(i) {
    const copy = [...form.policy.rules];
    copy.splice(i, 1);
    setForm((pre) => ({
      ...pre,
      policy: { ...pre.policy, rules: copy },
    }));
  }

  function onTerms_and_Conditions_Change(e, index) {
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
  function removeTerms_Conditions(i) {
    const copy = [...form.terms_and_conditions];
    copy.splice(i, 1);
    setForm((pre) => ({
      ...pre,
      terms_and_conditions: copy,
    }));
  }

  useEffect(() => {
    console.log(form.sub_desc);
  }, [form]);
  return (
    <div
      style={{
        overflow: "scroll",
        marginTop: "1rem",
      }}
    >
      {/* <h3 className="mb-4 title">Add Product</h3> */}
      <div className="px-2">
        <form onSubmit={(e) => e.preventDefault()} className="form">
          <div>
            <h5>Title</h5>
            <CustomInput
              name="title"
              value={form.value}
              setForm={setForm}
              type="text"
              id=""
              className=""
              label="Enter Product Title"
            />
          </div>
          <div>
            <h5>Price</h5>
            <span className="d-flex w-100 gap-5">
              <CustomInput
                name="price"
                value={form.price}
                setForm={setForm}
                id=""
                className=""
                type="number"
                label="Enter Product Price"
              />
              <CustomInput
                name="local_price"
                value={form.local_price}
                setForm={setForm}
                id=""
                className=""
                type="number"
                label="Enter Product Local Price"
              />
            </span>
          </div>
          {/* <div className="mb-3">
            {" "}
            <ReactQuill
              theme="snow"
              value={desc}
              onChange={(evt) => {
                handleDesc(evt);
              }}
            />
          </div> */}

          <div>
            <h5>Description</h5>
            <div className="d-flex w-100 justifu-content-center gap-5">
              <CustomInput
                name="head_desc"
                value={form.head_desc}
                setForm={setForm}
                type="textarea"
                id=""
                className=""
                label="Deascription"
              />
              <div className="w-50">
                {form.sub_desc?.map(({ key, value }, i) => {
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
                      <button onClick={() => removeSub_desc(i)}>delete</button>
                    </span>
                  );
                })}

                {form.sub_desc.length ? (
                  <button onClick={() => addSub_desc()}>more</button>
                ) : (
                  <button className="w-fit h-fit" onClick={() => addSub_desc()}>
                    would you like to describe using table
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="form_row">
            {/* metadata form  */}
            <div>
              <h5>Meta data</h5>
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
                          <button onClick={() => removeMeta_data(i)}>
                            delete
                          </button>
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <button onClick={() => addMeta_data()}>
                    would you like to add meta data
                  </button>
                )}
                {form.meta_data.length ? (
                  <button onClick={() => addMeta_data()}>more</button>
                ) : null}
              </div>
            </div>
            <div>
              <h5>Category</h5>
              <div>
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
                      placeholder="category-primary"
                      type="text"
                      className="form-control"
                    />
                    <button
                      onClick={() =>
                        setForm((pre) => ({
                          ...pre,
                          category: { ...pre.category, other: false },
                        }))
                      }
                    >
                      remove
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="form_row">
            {/* sizes form */}
            <div>
              <h5>Add size</h5>
              <div>
                {form.sizes.length ? (
                  <div className="table">
                    {form.sizes?.map(({ qty, size }, i) => {
                      return (
                        <span key={i} className="d-flex gap-2">
                          <input
                            name={`qty_${i}`}
                            onChange={(e) => onSize_Change(e, i)}
                            placeholder="key"
                            type="number"
                            value={qty}
                            min={1}
                          />
                          <input
                            name={`size_${i}`}
                            onChange={(e) => onSize_Change(e, i)}
                            placeholder="value"
                            type="text"
                            value={size}
                          />
                          <button onClick={() => removeSize(i)}>delete</button>
                        </span>
                      );
                    })}
                    <button onClick={() => addSize()}>more</button>
                  </div>
                ) : (
                  <button onClick={() => addSize()}>
                    would you like to add meta data
                  </button>
                )}
              </div>
            </div>

            {/* colors form */}
            <div>
              <h5>Add Colors</h5>
              <div>
                {form.colors.length ? (
                  <div className="table">
                    {form.colors?.map(({ qty, color }, i) => {
                      return (
                        <span key={i} className="d-flex gap-2">
                          <input
                            name={`qty_${i}`}
                            onChange={(e) => onColor_Change(e, i)}
                            placeholder="key"
                            type="number"
                            value={qty}
                            min={1}
                          />
                          <input
                            style={{ minWidth: "15px" }}
                            type="color"
                            name={`color_${i}`}
                            onChange={(e) => onColor_Change(e, i)}
                            value={color}
                          />
                          <input
                            name={`color_${i}`}
                            onChange={(e) => onColor_Change(e, i)}
                            placeholder="value"
                            type="text"
                            value={color}
                          />
                          <button onClick={() => removeColor(i)}>delete</button>
                        </span>
                      );
                    })}
                    <button onClick={() => addColor()}>more</button>
                  </div>
                ) : (
                  <button onClick={() => addColor()}>
                    would you like to add meta data
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="form_product_policy">
            <h5>Policy</h5>
            <div>
              <div style={{ alignItems: "center" }}>
                <label htmlFor="exchange">
                  {" "}
                  Exchange-available : check if yes{" "}
                </label>
                <input
                  onChange={() =>
                    setForm((pre) => ({
                      ...pre,
                      policy: {
                        ...pre.policy,
                        exchange: {
                          ...pre.policy.exchange,
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
                    <label htmlFor="exchange_expiry_days">Expiry : </label>
                    <input
                      onChange={(e) =>
                        setForm((pre) => ({
                          ...pre,
                          policy: {
                            ...pre.policy,
                            exchange: {
                              ...pre.policy.exchange,
                              expiry: e.target.value,
                            },
                          },
                        }))
                      }
                      min={0}
                      max={30}
                      value={form.policy.exchange.expiry}
                      type="number"
                      name="exchange_expiry_days"
                      id="exchange_expiry_days"
                    />
                  </>
                ) : null}
              </div>
              <div style={{ alignItems: "center" }}>
                <label htmlFor="return_or_refund">
                  {" "}
                  Return and Refund : check if yes{" "}
                </label>
                <input
                  onChange={() =>
                    setForm((pre) => ({
                      ...pre,
                      policy: {
                        ...pre.policy,
                        return_or_refund: {
                          ...pre.policy.return_or_refund,
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
                    <label htmlFor="return_or_refund_expiry_days">
                      Expiry :
                    </label>
                    <input
                      onChange={(e) =>
                        setForm((pre) => ({
                          ...pre,
                          policy: {
                            ...pre.policy,
                            return_or_refund: {
                              ...pre.policy.return_or_refund,
                              expiry: e.target.value,
                            },
                          },
                        }))
                      }
                      value={form.policy.return_or_refund.expiry}
                      min={0}
                      max={30}
                      type="number"
                      name="return_or_refund_expiry_days"
                      id="return_or_refund_expiry_days"
                    />
                  </>
                ) : null}
              </div>

              <div className="form_product_policy_rules">
                <label>Rules</label>
                {form.policy.rules.length ? (
                  <div className="gap-1">
                    {form.policy.rules?.map((rule, i) => {
                      return (
                        <span key={i} className="d-flex gap-2">
                          <input
                            name={`qty_${i}`}
                            onChange={(e) => onPolicy_Rule_Change(e, i)}
                            placeholder={`rule ${i + 1}`}
                            type="text"
                            value={rule}
                            min={1}
                          />
                          <button onClick={() => removePolicy_Rule(i)}>
                            delete
                          </button>
                        </span>
                      );
                    })}
                    <button className="" onClick={() => addPolicy_Rule()}>
                      more
                    </button>
                  </div>
                ) : (
                  <button onClick={() => addPolicy_Rule()}>
                    would you like to add policy of this product
                  </button>
                )}
              </div>
              <div>
                <label htmlFor="policy_desc"> Description : </label>
                <input
                  onChange={(e) =>
                    setForm((pre) => ({
                      ...pre,
                      policy: { ...pre.policy, description: e.target.value },
                    }))
                  }
                  type="text"
                  name="policy_desc"
                  id="policy_desc"
                  value={form.policy.description}
                />
              </div>
            </div>
            {/* <div>
       
            </div> */}
          </div>
          <div>
            <h5> Terms and Conditions</h5>
            <div>
              {form.terms_and_conditions.length ? (
                <div className="table">
                  {form.terms_and_conditions?.map((rule, i) => {
                    return (
                      <span key={i} className="d-flex gap-2">
                        <input
                          name={`qty_${i}`}
                          onChange={(e) => onTerms_and_Conditions_Change(e, i)}
                          placeholder={`T&C ${i + 1}`}
                          type="text"
                          value={rule}
                          min={1}
                        />
                        <button onClick={() => removeTerms_Conditions(i)}>
                          delete
                        </button>
                      </span>
                    );
                  })}
                  <button onClick={() => addTerms_Conditions()}>more</button>
                </div>
              ) : (
                <button onClick={() => addTerms_Conditions()}>
                  would you like to add terms and conditions
                </button>
              )}
            </div>
          </div>
          {/* <select name="" className="form-control py-3 mb-3 " id="">
            <option value="">Select Brand</option>
          </select>
          <select name="" className="form-control py-3 mb-3 " id="">
            <option value="">Select Color</option>
          </select>
          <select name="" className="form-control py-3 mb-3 " id="">
            <option value="">Select Category</option>
          </select> */}
          {/* <CustomInput type="number" label="Enter Product Quantity" /> */}
          {/* <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger> */}
          <button
            className="btn btn-success border-0  rounded-3 my-4"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
