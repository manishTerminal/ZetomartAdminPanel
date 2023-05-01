import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddOrEditSellerAction, AdminOptionAction, EditSellerAction } from "../Redux/Actions/Action";
import AdminRequest from "../Requests/AdminRequests";

const Shopkeeper = () => {
  const seller = useSelector((state) => state?.Utils?.Seller) || [];
  const dispatch = useDispatch();
  const EditSellerhandler = (item) => {
    dispatch(EditSellerAction(item?.seller));
    dispatch(AddOrEditSellerAction(false))
    dispatch(AdminOptionAction("add-shopkeeper"));
  };
  return (
    <>
      <div
        style={{
          marginTop: "0rem",
          display: "flex",
          justifyContent: "end",
          marginRight: "3rem",
          marginBottom: "0rem",
        }}
      >
        <input
          style={{ background: "red", color: "white" }}
          type="submit"
          value="Add Seller"
          onClick={() => {
            dispatch(AdminOptionAction("add-shopkeeper"))
            dispatch(AddOrEditSellerAction(true))
          }}
        />
        <input
          style={{ background: "red", color: "white" }}
          type="submit"
          value="Add Category"
          onClick={() => dispatch(AdminOptionAction("add-category"))}
        />
        <input
          style={{ background: "red", color: "white" }}
          type="submit"
          value="Add SubCategory"
          onClick={() => dispatch(AdminOptionAction("add-category"))}
        />
      </div>
      <div className="order_table">
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Seller Name</td>
              <td>Seller Image</td>
              <td>Date</td>
              <td>Total Product</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {seller &&
              seller.map((item) => {
                return (
                  <tr>
                    <td>{item?._id}</td>
                    <td>{item?.seller?.sellerName}</td>
                    <td>
                      <img
                        style={{ height: "50px", width: "40px" }}
                        src={
                          AdminRequest.GET_SELLER_IMAGES +
                          item?.seller?.sellerImage
                        }
                        alt=""
                      />
                    </td>
                    <td>{item?.seller?.date}</td>
                    <td>{item?.product.length}</td>
                    <td>
                      <button style={{background:"yellow",padding:".2rem .4rem"}} onClick={() =>{
                         EditSellerhandler(item)

                      }}>
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Shopkeeper;
