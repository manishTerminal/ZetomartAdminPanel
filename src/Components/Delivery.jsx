import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AdminOptionAction, OrderDeliveredAction, OrderDetailsAction } from "../Redux/Actions/Action";
import AdminRequest from "../Requests/AdminRequests";
const Delivery = () => {

  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state?.Admin);
  const orderDelivered =
    useSelector((state) => state?.Utils?.OrderDelivered) || [];
  const DeleteOrder = (orderId) => {
    axios
      .delete(AdminRequest.DELETE_ORDER + orderId)
      .then((res) => {
        toast.success(res?.data?.message);
        axios
          .get(AdminRequest.GET_ALL_ORDERS + "/" + admin?._id)
          .then((response) => {
            let delivered = response.data.filter(
              (item) => item.orderDelivered == true
            );
            dispatch(OrderDeliveredAction(delivered));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const ShowOrderDetails = (response) => {
    dispatch(AdminOptionAction("orders-detail"));
    dispatch(OrderDetailsAction(response));
  };


  return (
    <>
      <div
        style={{
          maxHeight: "90vh",
        }}
        className="order_table delivered-order"
      >
        <table>
          <thead>
            <tr>
              <td>Order Id </td>
              <td>Order Date</td>
              <td>Product Name</td>
              <td>Product Price</td>
              <td>Address</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {[...orderDelivered]?.reverse()?.map((item) => {
              return (
                <>
                  <tr onClick={() => ShowOrderDetails(item)}>
                    <td>{item?.orderId}</td>
                    <td>{item?.date}</td>
                    <td>{item?.product[0]?.productName}
                      {
                        item?.product.length - 1 > 0 && <><span> + </span>{item?.product.length - 1}</>
                      }</td>
                    <td>{Math.round(item?.price.reduce((sum, i) => sum + i))}</td>
                    <td>
                      {item?.block} {item?.room}
                    </td>
                    <td>
                      {item?.orderDelivered ? (
                        <span className="delivered">Delivered</span>
                      ) : (
                        <span
                          className="processing"
                          style={{ cursor: "pointer" }}
                        >
                          Pending
                        </span>
                      )}
                    </td>
                    <th style={{ textAlign: "right" }}>
                      <button
                        onClick={() => DeleteOrder(item?.orderId)}
                        style={{
                          background: "red",
                          padding: ".3rem .8rem",
                          color: "white",
                        }}
                      >
                        delete
                      </button>
                    </th>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Delivery;
