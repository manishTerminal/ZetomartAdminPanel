import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/adminDashboard.css";
import home from "../Icons/home.png";
import add from "../Icons/add.png";
import analytics from "../Icons/analytics.png";
import bag from "../Icons/bag.png";
import rating from "../Icons/rating.png";
import tag from "../Icons/tag.png";
import delivery from "../Icons/delivery.png";

import { useDispatch, useSelector } from "react-redux";
import {
  AdminOptionAction,
  OrderDeliveredAction,
  OrdersAction,
  SellerAction,
} from "../Redux/Actions/Action";
import Dashboard from "../Components/Dashboard";
import AddProduct from "../Components/AddProduct";
import Delivery from "../Components/Delivery";
import Products from "../Components/Products";
import Analytics from "../Components/Analytics";
import Order from "../Components/Order";
import Rating from "../Components/Rating";
import OrderDetail from "../Components/OrderDetail";
import axios from "axios";
import AdminRequest from "../Requests/AdminRequests";
import Soapkeeper from "../Components/AddShopkeeper";
import Shopkeeper from "../Components/Shopkeeper";
import AddShopkeeper from "../Components/AddShopkeeper";
import Header from "../Components/Header";
import ContactData from "../Components/ContactData";
import AddCategory from "../Components/AddCategory";
import All_category from "../Components/All_category";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state?.Admin);
  const adminOption = useSelector((state) => state?.Admin?.adminOption);
  const leftBarToggle = useSelector((state) => state?.Admin?.leftbar_toggle);
  useEffect(() => {
    axios
      .get(AdminRequest.GET_ALL_ORDERS + "/" + admin?._id)
      .then((response) => {
        let delivered = response.data.filter(
          (item) => item.orderDelivered == true
        );
        let pending = response.data.filter(
          (item) => item.orderDelivered == false
        );
        dispatch(OrderDeliveredAction(delivered));
        dispatch(OrdersAction(pending));
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(AdminRequest.GET_ALL_SELLER)
      .then((response) => {
        dispatch(SellerAction(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Header />
      <section className="admin-dashboard">
        <section
          className={leftBarToggle ? "dashboard-left l-hide" : "dashboard-left"}
        >
          <div
            onClick={() => dispatch(AdminOptionAction("dashboard"))}
            className={
              adminOption === "dashboard"
                ? "admin_actions shadow"
                : "admin_actions"
            }
          >
            <img src={home} alt="" />
            <span>Dashboard</span>
          </div>
          <div
            onClick={() => dispatch(AdminOptionAction("create_product"))}
            className={
              adminOption === "create_product"
                ? "admin_actions shadow"
                : "admin_actions"
            }
          >
            <img src={add} alt="" />
            <span>Create Product</span>
          </div>
          <div
            onClick={() => dispatch(AdminOptionAction("product"))}
            className={
              adminOption === "product"
                ? "admin_actions shadow"
                : "admin_actions"
            }
          >
            <img src={tag} alt="" />
            <span>Product</span>
          </div>
          <div
            onClick={() => dispatch(AdminOptionAction("order"))}
            className={
              adminOption === "order" ? "admin_actions shadow" : "admin_actions"
            }
          >
            <img src={bag} alt="" />
            <span>Orders</span>
          </div>
          <div
            onClick={() => dispatch(AdminOptionAction("delivery"))}
            className={
              adminOption === "delivery"
                ? "admin_actions shadow"
                : "admin_actions"
            }
          >
            <img src={delivery} alt="" />
            <span>Delivered</span>
          </div>
          <div
            onClick={() => dispatch(AdminOptionAction("analytics"))}
            className={
              adminOption === "analytics"
                ? "admin_actions shadow"
                : "admin_actions"
            }
          >
            <img src={analytics} alt="" />
            <span>Analytics</span>
          </div>
          <div
            onClick={() => dispatch(AdminOptionAction("shopkeeper"))}
            className={
              adminOption === "shopkeeper"
                ? "admin_actions shadow"
                : "admin_actions"
            }
          >
            <img src={rating} alt="" />
            <span>Shopkeeper</span>
          </div>
          <div
            onClick={() => dispatch(AdminOptionAction("contact"))}
            className={
              adminOption === "contact"
                ? "admin_actions shadow"
                : "admin_actions"
            }
          >
            <img src={rating} alt="" />
            <span>Contact</span>
          </div>
          <div
            onClick={() => dispatch(AdminOptionAction("rating"))}
            className={
              adminOption === "rating"
                ? "admin_actions shadow"
                : "admin_actions"
            }
          >
            <img src={rating} alt="" />
            <span>Rating</span>
          </div>
          <div
            onClick={() => dispatch(AdminOptionAction("add-category"))}
            className={
              adminOption === "add-category"
                ? "admin_actions shadow"
                : "admin_actions"
            }
          >
            <img src={rating} alt="" />
            <span>Add Category</span>
          </div>
        </section>
        <section className="dashboard-right">
          {adminOption === "dashboard" && <Dashboard />}
          {adminOption === "create_product" && <AddProduct />}
          {adminOption === "product" && <Products />}
          {adminOption === "delivery" && <Delivery />}
          {adminOption === "order" && <Order />}
          {adminOption === "rating" && <Rating />}
          {adminOption === "orders-detail" && <OrderDetail />}
          {adminOption === "contact" && <ContactData />}
          {adminOption === "shopkeeper" && <Shopkeeper />}
          {adminOption === "add-shopkeeper" && <AddShopkeeper />}
          {adminOption === "add-category" && <AddCategory />}
          {adminOption === "all-category" && <All_category />}
        </section>
      </section>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};

export default AdminDashboard;
