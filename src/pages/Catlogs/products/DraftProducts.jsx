import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getDraftProducts } from "../../../features/products/productsSlice";
import { useEffect, useState } from "react";
import Addproduct from "./addproduct/Addproduct";
// import { Link, useNavigate } from "react-router-dom";
const columns = [
  {
    title: "Sr No",
    dataIndex: "key",
  },
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
];

const DraftProducts = () => {
  const [updateState, setUpdateState] = useState(false);
  const [productId, setProductId] = useState(undefined);
  const [draft_product, setDraft_product] = useState();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const draftState = useSelector((state) => state.products.draftProducts);

  useEffect(() => {
    !draftState.length ? dispatch(getDraftProducts()) : null;
  }, [dispatch, draftState]);

  useEffect(() => {
    setData([]);

    draftState.forEach((draft, i) => {
      setData((pre) => [
        ...pre,
        {
          key: i + 1,
          id: draft._id,
          title: draft.title,
          price: draft.price,
          category: draft.category.primary,
        },
      ]);
    });
  }, [draftState]);

  useEffect(() => {
    const product = draftState.find((item) => item._id === productId);
    setDraft_product(product);
  }, [productId, draftState]);

  return (
    <div
      style={{
        overflow: "scroll",
        marginTop: "1rem",
      }}
    >
      {updateState && productId && draft_product ? (
        <>
          <button
            onClick={() => {
              setUpdateState(false);
              setProductId(undefined);
            }}
            type="button"
          >
            back
          </button>
          <Addproduct draft_product={draft_product} />
        </>
      ) : (
        <>
          <h3 className="mb-4 title">Products</h3>
          <div>
            {" "}
            <Table
              onRow={(record, rowIndex) => {
                return {
                  //   onClick: (event) => {console.log(event)},
                  onDoubleClick: () => {
                    // console.log()
                    setProductId(record.id);
                    setUpdateState(true);
                  },
                };
              }}
              // rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DraftProducts;
