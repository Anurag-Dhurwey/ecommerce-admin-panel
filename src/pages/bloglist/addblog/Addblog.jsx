import { useState } from "react";
import "./addblog.css";
import CustomInput from "../../../components/custominput/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Addblog = () => {
  const [desc, setDesc] = useState("");

  return (
    <div>
      <h3 className="mb-4">Add Blog</h3>
      <div className="">
        <form action="">
          <CustomInput type="text" label="Enter blog Title" />
          <select name="" id="">
            <option value="">Select Blog Category</option>
          </select>
          <ReactQuill theme="snow" value={desc} onChange={setDesc} />
        </form>
      </div>
    </div>
  );
};

export default Addblog;
