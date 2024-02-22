import { useEffect, useState } from "react";
import "./addproduct.css";
import "react-quill/dist/quill.snow.css";
import { message } from "antd";
import { useDispatch } from "react-redux";
import axios from "axios";
import Title from "./miniComponents/Title";
import Price from "./miniComponents/Price";
import Description from "./miniComponents/Description";
import MetaData from "./miniComponents/MetaData";
import Category from "./miniComponents/Category";
import Size from "./miniComponents/Size";
import Colors from "./miniComponents/Colors";
import Quantity from "./miniComponents/Quantity";
import Tags from "./miniComponents/Tags";
import Policy from "./miniComponents/Policy";
import Term_Conditions from "./miniComponents/Term_Conditions";
import Validation_errors from "./miniComponents/Validation_errors";
import Images from "./miniComponents/Images";
import {
  addProduct,
  removeProduct,
  replaceOneProduct,
} from "../../../../features/product/productSlice";
import Featured_on from "./miniComponents/Featured_on";
import { base_url, config } from "../../../../utils/axiosConfig";
import Table from "./miniComponents/Table";
import COD from "./miniComponents/COD";
import { useAppDispatch } from "../../../../app/hooks";
import { product } from "../../../../utils/types";

const form_template: form_template = {
  title: "",
  price: "" as unknown as number,
  local_price: "" as unknown as number,
  description: {
    head_desc: "",
    sub_desc: [],
  },
  table: [],
  images: { primary: [], descriptive: [] },
  meta_data: [],
  category: { primary: "", secondry: [], other: false },
  sizes: [],
  colors: [],
  quantity: 0,
  tags: [],
  is_cod_availabe: false,
  policy: {
    exchange: { status: false, validity: 0 },
    return_or_refund: { status: false, validity: 0 },
    description: "",
    rules: [],
  },
  terms_and_conditions: [],
  featured_on: [],
  as_draft: false,
};

const Addproduct: React.FC<{
  data?: form_template;
  action?: "CREATE" | "UPDATE";
}> = ({ data = form_template, action = "CREATE" }) => {
  const dispatch = useAppDispatch();
  const [validation_errors, setValidation_errors] = useState<string[]>([]);
  const [form, setForm] = useState<form_template>({ ...data });

  function isFormValid() {
    let totalInvalidity = 0;
    setValidation_errors([]);
    if (form.as_draft) {
      if (form.title) {
        return totalInvalidity;
      } else {
        setValidation_errors(["title is requred to save as draft"]);
        totalInvalidity += 1;
        return totalInvalidity;
      }
    }
    function check_array(array: string[], error: string) {
      if (array.some((arr) => !arr)) {
        setValidation_errors((pre) => [...pre, `${error}`]);
        totalInvalidity += 1;
      }
    }

    function check_arrayOf_Obj(
      array: check_arrayOf_Obj,
      error: string,
      ...key: string[]
    ) {
      if (
        array.some((i_arr) => {
          return key.some((i_key) => {
            return !i_arr[i_key];
          });
        })
      ) {
        setValidation_errors((pre) => [...pre, `${error}`]);
        totalInvalidity += 1;
      }
    }

    const {
      title,
      price,
      local_price,
      description,
      images,
      meta_data,
      category,
      sizes,
      colors,
      tags,
      policy,
      terms_and_conditions,
    } = form;
    const { head_desc, sub_desc } = description;
    if (!title) {
      setValidation_errors((pre) => [...pre, "Title is required"]);
      totalInvalidity += 1;
    }
    if (!price) {
      setValidation_errors((pre) => [...pre, "Price is not valid"]);
      totalInvalidity += 1;
    }
    if (local_price < price || !local_price) {
      setValidation_errors((pre) => [
        ...pre,
        "local_price is not valid (original price should be less than local_price )",
      ]);
      totalInvalidity += 1;
    }
    if (!head_desc) {
      setValidation_errors((pre) => [...pre, "description is not valid"]);
      totalInvalidity += 1;
    }
    check_arrayOf_Obj(
      sub_desc,
      "Table description is empty (fill it or remove)",
      "key",
      "value"
    );
    check_arrayOf_Obj(
      meta_data,
      "Meta-Data is empty (fill it or remove)",
      "key",
      "value"
    );
    if (!images.primary.length) {
      setValidation_errors((pre) => [...pre, "Images are required"]);
      totalInvalidity += 1;
    }
    if (!category.primary) {
      setValidation_errors((pre) => [...pre, "Category is required"]);
      totalInvalidity += 1;
    }
    check_array(category.secondry, "Optional category is empty");
    check_arrayOf_Obj(
      sizes,
      "Sizes are empty (fill it or remove)",
      "size",
      "qty"
    );
    check_arrayOf_Obj(
      colors,
      "Colors are empty (fill it or remove)",
      "color",
      "qty"
    );
    check_array(tags, "Tag is empty");
    check_array(terms_and_conditions, "terms_and_conditions is empty");
    if (
      (policy.exchange.status && !policy.exchange.validity) ||
      (policy.return_or_refund.status && !policy.return_or_refund.validity)
    ) {
      setValidation_errors((pre) => [...pre, "Validity is required"]);
      totalInvalidity += 1;
    }
    check_array(policy.rules, "policy rules are empty (fill them or remove)");
    return totalInvalidity;
  }

  function dataMutation(updatedItem: product) {
    if (data.as_draft) {
      if (updatedItem.as_draft) {
        dispatch(replaceOneProduct({ product: updatedItem, section: "draft" }));
      } else {
        dispatch(removeProduct({ ids: updatedItem._id, section: "draft" }));
        dispatch(addProduct({ products: updatedItem, section: "published" }));
      }
    } else {
      if (updatedItem.as_draft) {
        dispatch(addProduct({ products: updatedItem, section: "draft" }));
        dispatch(removeProduct({ ids: updatedItem._id, section: "published" }));
      } else {
        dispatch(
          replaceOneProduct({ product: updatedItem, section: "published" })
        );
      }
    }
  }

  async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isFormValid() > 0) {
      return;
    }
    if (action === "CREATE") {
      try {
        const res = await axios.post(`${base_url}product`, form, config);

        if (res.data._id) {
          if (res.data.as_draft) {
            dispatch(addProduct({ products: res.data, section: "draft" }));
          } else {
            dispatch(addProduct({ products: res.data, section: "published" }));
          }
          message.success(`${res.data._id} uploaded`);
          setForm({ ...form_template });
        }
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      }
    } else if (action === "UPDATE" && form._id) {
      try {
        const res = await axios.put(`${base_url}product/${form._id}`, form, {
          ...config,
        });

        if (res.data._id) {
          dataMutation(res.data);
          message.success(`${res.data._id} updated successfully`);
        }
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      }
    } else {
      message.error("something went wrong");
    }
  }

  return (
    <div
      style={{
        padding: "5px",
        overflow: "scroll",
        marginTop: "1rem",
      }}
    >
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form onSubmit={(e) => onSubmitHandler(e)} className="form">
          <div>
            <h5>Title</h5>
            <Title form={form} setForm={setForm} />
          </div>
          <div>
            <h5>Price</h5>
            <Price form={form} setForm={setForm} />
          </div>

          <div className="Deascription">
            <h5>Description</h5>
            <Description form={form} setForm={setForm} />
          </div>
          <div>
            <Table form={form} setForm={setForm} />
          </div>
          <div className="form_row">
            {/* metadata form  */}
            <div>
              <h5>Meta data</h5>
              <MetaData form={form} setForm={setForm} />
            </div>
            <div>
              <h5>Category</h5>
              <Category form={form} setForm={setForm} />
            </div>
          </div>

          <div className="form_row">
            {/* sizes form */}
            <div>
              <h5>Add size</h5>
              <Size form={form} setForm={setForm} />
            </div>

            {/* colors form */}
            <div>
              <h5>Add Colors</h5>
              <Colors form={form} setForm={setForm} />
            </div>
          </div>
          <div className="form_row">
            <div>
              <h5>Total Quantity : </h5>
              <Quantity form={form} setForm={setForm} />
            </div>
            <div>
              <h5>Tags : </h5>
              <Tags form={form} setForm={setForm} />
            </div>
          </div>
          <div className="form_row">
            <div>
              <h5>Cash on delevery : </h5>
              <COD form={form} setForm={setForm} />
            </div>
          </div>
          <div className="form_product_policy">
            <h5>Policy</h5>
            <Policy form={form} setForm={setForm} />
          </div>
          <div>
            <h5> Terms and Conditions</h5>
            <Term_Conditions form={form} setForm={setForm} />
          </div>
          <div style={{}}>
            <h5>Images</h5>
            <Images form={form} setForm={setForm} />
          </div>
          <div>
            <h5>Ongoing Events</h5>
            <div>
              <h6></h6>
            </div>
          </div>
          <div>
            <h5>Featured on</h5>
            <Featured_on form={form} setForm={setForm} />
          </div>
          {validation_errors.length ? (
            <Validation_errors errors={validation_errors} />
          ) : null}

          <div className="d-flex gap-5">
           {(form._id&&form.as_draft)||(!form._id)&& <button
              type="button"
              className="d-flex gap-2 justify-content-center align-items-center"
            >
              <label htmlFor="draft">add as Draft</label>
              <input
                onChange={() =>
                  setForm((pre) => ({ ...pre, as_draft: !pre.as_draft }))
                }
                checked={form.as_draft}
                className=" "
                type="checkbox"
                id="draft"
              ></input>
            </button>}
            <button className="btn btn-success border-0  " type="submit">
              {action === "CREATE" ? "Publish" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;

type addKey = { [key: string]: string | number };

interface size extends addKey {
  qty: number;
  size: string;
}

interface desc extends addKey {
  key: string;
  value: string;
}

interface color extends addKey {
  qty: number;
  color: string;
}

type check_arrayOf_Obj = size[] | desc[] | color[];

export interface form_template {
  _id?: string;
  title: string;
  price: number;
  local_price: number;
  description: {
    head_desc: string;
    sub_desc: {
      key: string;
      value: string;
    }[];
  };
  table: { head: string; rows: [string] }[];
  meta_data: {
    key: string;
    value: string;
  }[];

  category: {
    primary: string;
    secondry: string[];
    other: boolean;
  };
  sizes: {
    qty: number;
    size: string;
  }[];
  quantity: number;
  images: {
    primary: {
      public_id: string;
      asset_id: string;
      url: string;
    }[];
    descriptive: {
      public_id: string;
      asset_id: string;
      url: string;
    }[];
  };
  colors: {
    qty: number;
    color: string;
  }[];
  tags: string[];
  is_cod_availabe: boolean;
  policy: {
    exchange: { status: boolean; validity: number };
    return_or_refund: { status: boolean; validity: number };
    description: string;
    rules: string[];
  };
  terms_and_conditions: string[];
  featured_on: string[];
  as_draft: boolean;
}
