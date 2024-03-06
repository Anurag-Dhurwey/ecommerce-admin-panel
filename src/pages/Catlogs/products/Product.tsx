import React from "react";
import { categoryies, catlog } from "../../../utils/Constants";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <>
      <div className="my-2 py-2 border-bottom border-4 border-primary d-flex justify-content-center align-items-center flex-wrap gap-3 col-12 ">
        {catlog.map((log) => {
          const { icon: Icon } = log;
          return (
            <div  style={{minHeight:'100px'}} key={log.path}  className="text-center d-flex justify-content-center align-items-center col-4 col-md-3 col-lg-2 rounded-2 bg-secondary">
             <h4>
             <Link to={log.path}>
                <Icon /> {log.name}
              </Link>
             </h4>
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-center align-items-center flex-wrap gap-3 col-12 ">
        {categoryies.map((category) => {
          return (
            <div
              key={category}
              style={{minHeight:'150px'}}
              className="text-center d-flex justify-content-center align-items-center col-4 col-md-3 col-lg-2 rounded-2 bg-secondary"
            >
              <h4>{category}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Product;
