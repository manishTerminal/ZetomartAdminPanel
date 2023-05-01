// const url = "http://localhost:5000/";
const url = "https://api.zetomart.com/";
const AdminRequest = {
    ADD_PRODUCT: url + "Admin/",
    GET_PRODUCT_IMAGE: url + "Images/",
    GET_ALL_ORDERS: url + "Admin/",
    DELETE_ORDER: url + "Orders/",
    EDIT_PRODUCT: url + "Admin/EditProduct/",
    ORDER_DELIVERED: url + "Orders/Delivered/",
    ADD_SELLER: url + "Seller/",
    EDIT_SELLER: url + "Seller/",
    GET_ALL_SELLER: url + "Seller/",
    GET_SELLER_IMAGES: url + "SellerImages/",
    DISABLED_PRODUCT: url + "Admin/DisabledProduct/",
    DELETE_PRODUCT: url + "Admin/DeleteProduct/",
    ALL_CONTACT: url + "Contact/",
    CATEGORY: url + "category/",
    SUBCATEGORY: url + "Subcategory/",
    ALL_USER: url + "User/",
    EDIT_DELIVERY: url + "Deliveryrate/",
    EDIT_CATEGORY: url + "Category/",
    EDIT_SUBCATEGORY: url + "SubCategory/",
    DELETE_REVIEW: url + "SellerReview/"
}

export default AdminRequest;