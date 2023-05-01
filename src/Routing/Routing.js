import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "../Pages/AdminDashboard";
import LoginAdmin from "../Pages/LoginAdmin";
import { CategoryAction, EditProductAction, ProductsAction, subCategoryAction, userAction } from "../Redux/Actions/Action";
import AdminRequest from "../Requests/AdminRequests";

const Routing = () => {
    const routes = useSelector((state) => state?.Admin?.adminOption);
    const seller = useSelector((state) => state?.Utils?.Seller) || [];
    const editProduct = useSelector((state) => state?.Utils?.EditProduct);
    const dispatch = useDispatch();
    useEffect(() => {
        if (routes !== "create_product" && editProduct !== null) {
            dispatch(EditProductAction(null))
        }
    }, [routes])
    useEffect(() => {
        axios.get(AdminRequest?.ALL_USER).then((res) => {
            dispatch(userAction(res?.data))
        })
            .catch(err => {
                console.log(err)
            })
    }, []);

    useEffect(() => {
        axios
            .get(AdminRequest.CATEGORY)
            .then((res) => {
               
               dispatch(CategoryAction(res?.data))
                axios
                    .get(AdminRequest.SUBCATEGORY)
                    .then((response) => {
                      
                        dispatch(subCategoryAction(response?.data))

                    })
                    .catch((err) => { });
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    useEffect(() => {
        const sellerAllProd = seller?.map(i => i?.product);        
        const arr = [].concat.apply([], sellerAllProd);
        dispatch(ProductsAction(arr));
    }, [seller])

    return <>
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<LoginAdmin />} /> */}
                <Route path="/" element={<AdminDashboard />} />
            </Routes>
        </BrowserRouter>
    </>
}

export default Routing;