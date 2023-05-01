import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AdminOptionAction, OrderDeliveredAction, OrdersAction } from "../Redux/Actions/Action";
import AdminRequest from "../Requests/AdminRequests";
import "../Styles/order.css";
const OrderDetail = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state?.Admin);
  const [rate, setRate] = useState(0)
  const order = useSelector((state) => state?.Utils?.OrderDetails);

  const OrderStatus = (e) => {
    let status = e.target.value;
    if (status === "pending") {
    } else if (status === "delivered") {
      axios
        .patch(AdminRequest.ORDER_DELIVERED + order?.orderId)
        .then((res) => {
          toast.success(res?.data?.message);
          axios.get(AdminRequest.GET_ALL_ORDERS + "/" + admin?._id).then((response) => {
            let delivered = response.data.filter(
              (item) => item.orderDelivered == true
            );
            let pending = response.data.filter(
              (item) => item.orderDelivered == false
            );

            dispatch(OrderDeliveredAction(delivered));
            dispatch(OrdersAction(pending));
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };
  useEffect(() => {
    axios.get(AdminRequest.EDIT_DELIVERY).then(res => {
      console.log(res);
      setRate(res?.data?.rate)
    })
      .catch(err => {

      })
  }, [rate])
  return (
    <>
      <section className="order_detail">
        <button className="order-back-button" onClick={() => dispatch(AdminOptionAction("order"))}>Back</button>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{order?.user?.username}</td>
            </tr>
            <tr>
              <td>Order Id</td>
              <td>{order?.orderId}</td>
            </tr>
            <tr>
              <td>Order Date</td>
              <td>{order?.date} |<span> {order?.time}</span> </td>
            </tr>
            <tr>
              <td>Address</td>
              <td>
                {order?.block} {order?.room}
              </td>
            </tr>
            <tr>
              <td>Mobile</td>
              <td><a style={{ color: "white" }} href={`tel:${order?.user?.phoneNumber}`}>{order?.user?.phoneNumber}</a></td>
            </tr>
            <tr>
              <td>Ground Floor</td>
              <td>Selected </td>
            </tr >
            {order?.product.map((item, i) => {
              return <tr>
                <td>Product Name</td>
                <td>
                  {
                    item?.productName
                  }

                </td>
                <td style={{ minWidth: "3rem" }}>{order?.quantity[i]}</td>
                <td>{Math.round(order?.quantity[i] * order?.price[i])}</td>
              </tr>
            })}
            {/* <tr>
              <td>Product Name</td>
              <td>{order?.product.map((item, i) => {
                return <>

                  {
                    item?.productName
                  }
                  ({order?.quantity[i]})
                  <strong> | </strong>
                </>
              })}</td>
            </tr> */}

            <tr>
              <td>Total Price</td>
              <td>
                <strong> {Math.round(order.total)}</strong>
              </td>
            </tr>
            {!order?.orderDelivered && <tr>
              <td>Status</td>
              <td>
                <select onChange={OrderStatus} name="Order_status">
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                  <option value="pending">Pending</option>
                </select>
              </td>
            </tr>}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default OrderDetail;
