import React, { useEffect, useState } from "react";
import search from "../Icons/search.png";
import "../Styles/adminProduct.css";
import { useDispatch, useSelector } from "react-redux";
import AdminRequest from "../Requests/AdminRequests";
import {
  AdminOptionAction,
  EditProductAction,
  SellerAction,
} from "../Redux/Actions/Action";
import axios from "axios";
import { toast } from "react-toastify";

const Products = () => {
  const [orderChage, SetOrderChange] = useState(false)
  const [query, setquery] = useState("");
  const [prodAction, setProdAction] = useState({
    state: false,
    key: 1,
  });
  const { admin } = useSelector((state) => state?.Admin);
  const Products = useSelector((state) => state?.Utils?.Products) || [];
  const dispatch = useDispatch();

  const filteredData = Products.filter((item) => {
    return (
      item?.description?.toLowerCase()?.includes(query?.toLowerCase()) ||
      item?.productName?.toLowerCase()?.includes(query?.toLowerCase())
    );
  });
  const EditProduct = (response) => {
    dispatch(EditProductAction(response));
    dispatch(AdminOptionAction("create_product"));
  };

  const disabledProduct = (productId, result) => {
    let res = null;
    if (result == "true") {
      res = "false";
    } else {
      res = "true";
    }
    axios
      .patch(AdminRequest.DISABLED_PRODUCT + productId + "/" + res + "/" + admin?._id)//admin key
      .then((response) => {
        if (result == "true") {
          toast.success("Product Enabled");
        } else {
          toast.warning("Product Disabled");
        }
        SetOrderChange(true)
        setProdAction({
          state: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const DeleteProduct = (id) => {
    axios
      .delete(AdminRequest.DELETE_PRODUCT + admin?._id + "/" + id)
      .then((res) => {
        SetOrderChange(true)
        toast.success(res?.data?.message)

      })
      .catch((err) => { });
  };

  useEffect(() => {
    axios
      .get(AdminRequest.GET_ALL_SELLER)
      .then((response) => {
        SetOrderChange(false)
        dispatch(SellerAction(response?.data))

      })
      .catch((error) => {
        console.log(error);
      });
  }, [orderChage])
  const HideProdAction = (i) => {
    setProdAction({
      state: !prodAction.state,
      key: i,
    });
  };

  return (
    <>
      <section className="dashboard_product">
        <section className="search_header">
          <h2>Products ({filteredData?.filter(item => !item?.deleteProduct)?.length})</h2>
          <form>
            <input
              onChange={(e) => setquery(e.target.value)}
              type="text"
              placeholder="Search Product..."
            />
            <img src={search} />
          </form>
        </section>
        <div className="order_table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Brand Name</th>
                <th>Shop Name</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Price</th>
                <th>Discount%</th>
                <th>MRP</th>
                <th>Disabled</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData?.filter(item => !item?.deleteProduct).map((item, i) => {
                  let result = item?.disabled ? "true" : "false";
                  return (
                    <tr key={i}>
                      <td>
                        <img
                          className="prod_img"
                          src={
                            AdminRequest.GET_PRODUCT_IMAGE + item?.productImage
                          }
                          alt=""
                        />
                      </td>
                      <td>{item.productName?.slice(0, 20)}</td>
                      <td>{item?.sellerName}</td>
                      <td>{item?.categoryId?.category}</td>
                      <td>{item?.subCategoryId?.subCategory}</td>
                      <td>{Math.round(item?.mrp - (item?.mrp * item?.discount) / 100)}</td>
                      <td>{item?.discount}%</td>
                      <td>{item?.mrp}</td>
                      <td>{result}</td>
                      <th className="prodRelative">
                        <span
                          style={{
                            fontSize: "30px !important",
                            cursor: "pointer",
                          }}
                          onClick={() => HideProdAction(i)}
                        >
                          ...
                        </span>
                        <div
                          className={
                            prodAction.key == i && prodAction.state
                              ? "prod_action prodHide"
                              : "prod_action"
                          }
                        >
                          <span onClick={() => DeleteProduct(item?._id)}>
                            Remove
                          </span>
                          <span
                            onClick={() => disabledProduct(item?._id, result)}
                          >
                            {result == "false" ? "Disable" : "Enable"}
                          </span>
                          <span onClick={() => EditProduct(item)}>Edit</span>
                        </div>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Products;
