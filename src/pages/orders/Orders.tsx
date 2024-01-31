// import { Table } from "antd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../features/orders/orderSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { order, product } from "../../utils/types";

const makeStyle = (status: string) => {
  if (status === "Approved") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Pending") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};

interface row {
  products: {
    product: product | string;
    quantity: number;
  }[];
  date: string;
  status: string;
  id: string;
}

const Orders = ({ title = "Orders" }) => {
  const dispatch = useAppDispatch();
  const { isSuccess, orders } = useAppSelector((state) => state.orders);
  const [rows, setRows] = useState<row[]>([]);

  useEffect(() => {
    setRows([]);
    orders?.forEach((order) => {
      setRows((pre) => [
        ...pre,
        {
          products: order.products,
          date: order.createdAt,
          status: order.orderStatus,
          id: order._id,
        },
      ]);
    });
  }, [orders]);

  console.log(orders);

  useEffect(() => {
    function init() {
      if (!isSuccess) {
        dispatch(getOrders());
      }
    }
    init();
  }, [isSuccess, dispatch]);

  return (
    <div
      style={{
        overflow: "scroll",
        marginTop: "1rem",
      }}
    >
      {title && <h3 className="mb-4 title">{title}</h3>}
      <div>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table
            sx={{ minWidth: 650, overflowY: "auto" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                {/* <TableCell>Product</TableCell> */}
                <TableCell align="left">Product</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Order id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.map((row, i) => {
                const { id, status, products, date } = row;
                const DATE = new Date(date);
                return (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {/* <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell> */}
                    <TableCell align="left">
                      {products?.map((item, j) => {
                        const id =
                          typeof item.product === "string"
                            ? item.product
                            : item.product._id;
                        return (
                          <p key={j}>
                            {id} <span>: {item.quantity}</span>
                          </p>
                        );
                      })}
                    </TableCell>
                    <TableCell align="left">
                      {DATE.getDate()}/{DATE.getMonth()}/{DATE.getFullYear()}
                    </TableCell>
                    <TableCell align="left">
                      <span className="status" style={makeStyle(status)}>
                        {status}
                      </span>
                    </TableCell>
                    <TableCell align="left" className="Details">
                      {id}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Orders;
