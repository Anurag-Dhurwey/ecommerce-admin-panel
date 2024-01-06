import { Table } from "antd";
// import { BiEdit } from "react-icons/bi";
// import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getDraftProducts } from "../../../features/draft-product/draftSlice";
import { useEffect, useState } from "react";
import Addproduct from "./addproduct/Addproduct";
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
  const [formState, setFormState] = useState(false);
  const [productId, setProductId] = useState(undefined);
  const [draft_product, setDraft_product] = useState();
  const [data, setData] = useState([]);

  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const { draftProducts, isSuccess } = useSelector(
    (state) => state.draftProducts
  );

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
    !isSuccess ? dispatch(getDraftProducts()) : null;
  }, [dispatch, isSuccess]);

  useEffect(() => {
    setData([]);

    draftProducts.forEach((draft, i) => {
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
  }, [draftProducts]);

  useEffect(() => {
    const product = draftProducts.find((item) => item._id === productId);
    setDraft_product(product);
  }, [productId, draftProducts]);

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
      {formState && productId && draft_product ? (
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
          <Addproduct productToEdit={draft_product} />
        </>
      ) : (
        <>
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
