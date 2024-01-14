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
  pushDraftProduct,
  removeOneDraftProduct,
  replaceOneDraftProduct,
} from "../../../../features/draft-product/draftSlice";
import {
  pushProduct,
  removeOneProduct,
  replaceOneProduct,
} from "../../../../features/product/productSlice";

const Addproduct = (props) => {
  const dispatch = useDispatch();
  const { productToEdit } = props;
  const [submitState, setSubmitState] = useState("ADD");
  const [validation_errors, setValidation_errors] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    local_price: "",
    description: {
      head_desc: "",
      sub_desc: [],
    },

    images: { primary: [], descriptive: [] },
    meta_data: [],
    category: { primary: "", secondry: [], other: false },
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
    as_draft: false,
  });

  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };

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
    function check_array(array, error) {
      if (array.some((arr) => !arr)) {
        setValidation_errors((pre) => [...pre, `${error}`]);
        totalInvalidity += 1;
      }
    }

    function check_arrayOf_Obj(array, error, ...key) {
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

  function dataMutation(data) {
    if (productToEdit.as_draft) {
      if (data.as_draft) {
        dispatch(replaceOneDraftProduct(data));
      } else {
        dispatch(removeOneDraftProduct(data));
        dispatch(pushProduct([data]));
      }
    } else {
      if (data.as_draft) {
        dispatch(pushDraftProduct([data]));
        dispatch(removeOneProduct(data));
      } else {
        dispatch(replaceOneProduct(data));
      }
    }
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    console.log("submitting");
    if (isFormValid() < 1) {
      if (submitState === "ADD") {
        try {
          const res = await axios.post(
            `http://localhost:5000/api/product`,
            form,
            {
              ...config,
            }
          );

          if (res.data._id) {
            if (res.data.as_draft) {
              dispatch(pushDraftProduct([res.data]));
              // dispatch(removeOneProduct(res.data))
            } else {
              dispatch(pushProduct([res.data]));
            }
            message.success(`${res.data._id} uploaded`);
          }
          console.log(res);
        } catch (error) {
          console.log(error);
          message.error(error.message);
        }
      } else if (submitState === "UPDATE") {
        try {
          const res = await axios.put(
            `http://localhost:5000/api/product/${productToEdit._id}`,
            form,
            {
              ...config,
            }
          );

          if (res.data._id) {
            dataMutation(res.data);
            // console.log()
            message.success(`${res.data._id} updated successfully`);
          }
        } catch (error) {
          console.log(error);
          message.error(error.message);
        }
      } else {
        message.error("something went wrong");
      }
    }
  }

  useEffect(() => {
    if (productToEdit?._id) {
      setSubmitState("UPDATE");
      setForm(productToEdit);
      // console.log(productToEdit);
    }
  }, [productToEdit]);
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
            <Images form={form} setForm={setForm} config={config} />
          </div>
          <div>
            <h5>Ongoing Events</h5>
            <div>
              <h6></h6>
            </div>
          </div>
          <div>
            <h5>Featured on</h5>
            <div>
              <h6>Special products</h6>
              <h6>Deal of the day</h6>
            </div>
          </div>
          {validation_errors.length ? (
            <Validation_errors errors={validation_errors} />
          ) : null}

          <div className="d-flex gap-5">
            <button
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
            </button>
            <button className="btn btn-success border-0  " type="submit">
              {submitState === "ADD" ? "Add Product" : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
