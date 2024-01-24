import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getproduts } from "../../../features/product/productSlice";
import Addproduct from "./addproduct/Addproduct"
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

const Productlist = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(false);
  const [productId, setProductId] = useState(undefined);
  const [selected_product, setSelected_product] = useState();
  const [data, setData] = useState([]);

  const [modal, setModal] = useState(false);
  const { isSuccess, products } = useSelector((state) => state.products);

  function handleContextMenu(e, record) {
    e.preventDefault();
    !modal ? setModal({ x: e.pageX, y: e.pageY }) : setModal(false);
    setProductId(record.id);
  }

  function onEdit() {
    setFormState(true);
    setModal(false);
  }

  function onPublish() {}

  useEffect(() => {
    setData([]);
    products.forEach((draft, i) => {
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
  }, [products]);

  useEffect(() => {
    if (!isSuccess) dispatch(getproduts());
  }, [isSuccess, dispatch]);

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    setSelected_product(product);
  }, [productId, products]);

  useEffect(() => {
    function clickHandler() {
      setModal(false);
    }

    addEventListener("click", clickHandler);
    return () => {
      removeEventListener("click", clickHandler);
    };
  });

  return (
    <div
      style={{
        overflow: "scroll",
        marginTop: "1rem",
      }}
    >
      {formState && productId && selected_product ? (
        <>
          <button
            onClick={() => {
              setFormState(false);
              setProductId(undefined);
            }}
            type="button"
          >
            back
          </button>
          <Addproduct data={JSON.parse(JSON.stringify(selected_product))} action="UPDATE" />
        </>
      ) : (
        <>
          {" "}
          <h3 className="mb-4 title">Products</h3>
          <div>
            {modal.x && modal.y && (
              <div
                className="rounded-2 border border-3 border-primary d-flex flex-column row-gap-2 px-4 py-2 bg-secondary"
                style={{
                  zIndex: "10",
                  position: "absolute",
                  top: `${modal.y}px`,
                  left: `${modal.x}px`,
                }}
              >
                <button
                  type="button"
                  className="rounded-2"
                  onClick={() => onEdit()}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="rounded-2"
                  onClick={() => onPublish()}
                >
                  Publish
                </button>
              </div>
            )}
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => {
                    setModal(false);
                  },
                  onContextMenu: (e) => {
                    handleContextMenu(e, record);
                  },
                  onDoubleClick: () => {
                    setProductId(record.id);
                    setFormState(true);
                  },
                };
              }}
              columns={columns}
              dataSource={data}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Productlist;
