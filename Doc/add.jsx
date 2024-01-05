import { useEffect, useState } from "react";
import FormInput from "../../../../components/custominput/FormInput";
import "./addproduct.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// upload image section code
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

const Addproduct = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    local_price: "",
    head_desc: "",
    sub_desc: [{ key: "", value: "" }],
    images: { primary: [], descriptive: [] },
    meta_data: [],
    category: { primary: "", secondry: "", other: false },
    sizes: [],
    colors: [],
    quantity: 0,
    tags: [],
    policy: {
      exchange: { status: false, validity: 0 },
      return_or_refund: { status: false, validity: 0 },
      description: "",
      rules: [],
    },
    terms_and_conditions: [],
  });
  const [tag, setTag] = useState("");
  const config = {
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjcyMjZiODU0ZTc2Y2VhODhmNTE0NyIsImlhdCI6MTcwMzk0NzE1OSwiZXhwIjoxNzA0MDMzNTU5fQ.aIowvau_7DS-Ku8IT8-vpEAEOX8TQcV8Qvh5WTUWvVY",
    },
  };

  const props = {
    name: "images",
    multiple: true,
    async customRequest(info) {
      const { file, onSuccess, onError } = info;
      const formData = new FormData();
      formData.append("images", file);

      fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
        ...config,
      })
        .then((response) => {
          if (response.ok) {
            onSuccess(response.json()); // Handle server response
          } else {
            onError({ message: "Upload failed" });
          }
        })
        .catch(onError);
    },
    async onRemove(file) {
      const res = await file.response;
      const { asset_id } = res[0];
      if (asset_id) {
        console.log(asset_id);
        return fetch(
          `http://localhost:5000/api/upload/delete-img/${asset_id}`,
          {
            method: "DELETE",
            ...config,
          }
        ).then((res) => res.json());
      } else {
        return true;
      }
    },
    async onChange(info) {
      const { status } = info.file;
      const res = await info.file.response;
      if (status !== "uploading") {
        //  any opration
      }
      if (status === "done") {
        const { url, asset_id, public_id } = res[0];
        setForm((pre) => ({
          ...pre,
          images: {
            ...pre.images,
            primary: [...pre.images.primary, { url, asset_id, public_id }],
          },
        }));
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "removed") {
        setForm((pre) => {
          const updated = pre.images.primary.filter((item) => {
            return item.asset_id != res[0].asset_id;
          });
          return {
            ...pre,
            images: {
              ...pre.images,
              primary: updated,
            },
          };
        });
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

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
    console.log(form.images);
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
            <FormInput
              name="title"
              value={form.value}
              min={0}
              setForm={setForm}
              type="text"
              id=""
              className=""
              label="Title"
            />
          </div>
          <div>
            <h5>Price</h5>
            <span className="d-flex w-50 gap-5">
              <FormInput
                name="price"
                value={form.price}
                min={0}
                setForm={setForm}
                id=""
                className=""
                type="number"
                label="Price"
              />
              <FormInput
                name="local_price"
                min={0}
                value={form.local_price}
                setForm={setForm}
                id=""
                className=""
                type="number"
                label=" Local Price"
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
              <FormInput
                name="head_desc"
                min={0}
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
              <div className="w-100">
                {form.sizes.length ? (
                  <div className="w-100">
                    {form.sizes?.map(({ qty, size }, i) => {
                      return (
                        <div
                          key={i}
                          className="d-flex align-items-end gap-2 w-100"
                        >
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

                          {/* <span> */}
                          <button onClick={() => removeSize(i)}>delete</button>
                          {/* </span> */}
                        </div>
                      );
                    })}
                    <button onClick={() => addSize()}>more</button>
                  </div>
                ) : (
                  <button onClick={() => addSize()}>
                    would you like to add Sizes
                  </button>
                )}
              </div>
            </div>

            {/* colors form */}
            <div>
              <h5>Add Colors</h5>
              <div>
                {form.colors.length ? (
                  <div>
                    {form.colors?.map(({ qty, color }, i) => {
                      return (
                        <div
                          key={i}
                          className="d-flex align-items-end gap-2 w-100"
                        >
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
                          <button onClick={() => removeColor(i)}>delete</button>
                        </div>
                      );
                    })}
                    <button onClick={() => addColor()}>more</button>
                  </div>
                ) : (
                  <button onClick={() => addColor()}>
                    would you like to add colors
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="form_row">
            <div>
              <h5>Total Quantity : </h5>
              <div>
                <FormInput
                  value={form.quantity}
                  type="number"
                  id="quantity"
                  name="quantity"
                  min={0}
                  setForm={setForm}
                />
              </div>
            </div>
            <div>
              <h5>Tags : </h5>
              <div className="tags_list">
                {form.tags.map((tag, i) => {
                  return (
                    <p key={i}>
                      {tag}{" "}
                      <button
                        onClick={() => {
                          setForm((pre) => {
                            const copy_tags = [...pre.tags];
                            copy_tags.splice(i, 1);
                            return { ...pre, tags: copy_tags };
                          });
                        }}
                      >
                        X
                      </button>
                    </p>
                  );
                })}
              </div>
              <div>
                <input
                  type="text"
                  name="tag"
                  id="tag"
                  placeholder="tag"
                  value={tag}
                  onChange={(e)=>setTag(e.target.value)}
                />
                <button
                  onClick={() => {
                    if (!tag) return;
                    setForm((pre) => ({ ...pre, tags: [tag, ...pre.tags] }));
                    setTag("");
                  }}
                >
                  add
                </button>
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
                    <label htmlFor="exchange_validity_days">
                      validity :(days){" "}
                    </label>
                    <input
                      style={{ width: "50px" }}
                      onChange={(e) =>
                        setForm((pre) => ({
                          ...pre,
                          policy: {
                            ...pre.policy,
                            exchange: {
                              ...pre.policy.exchange,
                              validity: e.target.value,
                            },
                          },
                        }))
                      }
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
                      onChange={(e) =>
                        setForm((pre) => ({
                          ...pre,
                          policy: {
                            ...pre.policy,
                            return_or_refund: {
                              ...pre.policy.return_or_refund,
                              validity: e.target.value,
                            },
                          },
                        }))
                      }
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
              <div className="gap-1">
                <h6> Description : </h6>
                <textarea
                  onChange={(e) =>
                    setForm((pre) => ({
                      ...pre,
                      policy: { ...pre.policy, description: e.target.value },
                    }))
                  }
                  name="policy_desc"
                  id="policy_desc"
                  value={form.policy.description}
                  className="w-100"
                  rows="2"
                ></textarea>
              </div>
            </div>
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
                          className="w-100"
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
          {/* <FormInput type="number" label="Enter Product Quantity" /> */}
          <div>
            <Dragger {...props}>
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
            </Dragger>
          </div>
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
