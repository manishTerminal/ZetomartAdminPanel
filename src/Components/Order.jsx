import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AdminOptionAction,
  OrderDetailsAction,
  OrdersAction,
} from "../Redux/Actions/Action";
import "../Styles/order.css";
const Order = () => {
  const [wing, setWing] = useState([])
  const [sorted, setSorted] = useState([])
  const orders = useSelector((state) => state?.Utils?.Orders) || [];
  const orderDelivered =
    useSelector((state) => state?.Utils?.OrderDelivered) || [];
  const dispatch = useDispatch();
  const ShowOrderDetails = (response) => {
    dispatch(AdminOptionAction("orders-detail"));
    dispatch(OrderDetailsAction(response));
  };
  useEffect(() => {
    setSorted(orders)
  }, [])
  useEffect(() => {
    setWing(Array.from(new Set(orders.map(order => order.block))));
  }, [orders])
  const sortOrder = (e) => {
    let orderBy = e.target.value
    let sort1 = orders?.filter(or => or?.block == orderBy)
    let sort2 = orders?.filter(or => or?.block != orderBy)
    sort1.sort((a, b) => a?.room - b?.room)
    setSorted([...sort1, ...sort2])
  }
  return (
    <>
      <section className="prod_order">
        <div className="total_order_detail">
          <div className="order_card">
            <span>Total Order</span>
            <strong>{orders?.length + orderDelivered?.length}</strong>
          </div>
          <div className="order_card">
            <span>Delivered Orders</span>
            <strong>
              {orderDelivered?.length}
            </strong>
          </div>
          <div className="order_card">
            <span>Total Amount</span>
            <strong>
              {Math.round(orders?.reduce((a, b) => a+ b?.total,0))}
            </strong>
          </div>
        </div>
        <div className="order_table">
          <table>
            <thead>
              <tr>
                <td>Order Id </td>
                <td>Order Date Time</td>
                <td>Username</td>
                <td>Product Name</td>
                <td>Total Price</td>
                <td><select onChange={sortOrder} >
                  <option value="">Address</option>
                  {
                    wing.map(item => {
                      return <option value={item}>{item}</option>
                    })
                  }
                </select></td>
              </tr>
            </thead>
            <tbody>
              <h2>Today Delivery</h2>
              {sorted?.map((item) => {
                return (
                  <>
                    <tr onClick={() => ShowOrderDetails(item)}>
                      <td>{item?.orderId}</td>

                      <td>{item?.date} <span> {item?.time && item?.time}</span> </td>
                      <td>{item?.user?.username}</td>
                      <td>{item?.product[0]?.productName}
                        {
                          item?.product?.length - 1 > 0 && <><span> + </span>{item?.product.length - 1}</>
                        }
                      </td>
                      <td>{Math.round(item?.total)}</td>
                      <td>
                        {item?.block} {item?.room}
                      </td>


                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Order;
