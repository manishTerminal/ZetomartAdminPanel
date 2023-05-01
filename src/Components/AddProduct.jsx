import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AdminOptionAction, ProductsAction, SellerAction } from "../Redux/Actions/Action";
import AdminRequest from "../Requests/AdminRequests";
const AddProduct = () => {
  const [loader, setloader] = useState(false)
  const EditProduct = useSelector((state) => state?.Utils?.EditProduct);
  const { Seller, subCategory, Category } =
    useSelector((state) => state?.Utils) || [];
  const { admin } = useSelector((state) => state?.Admin);
  const [category, setCategory] = useState(EditProduct?.categoryId?.category);
  const [SubCategory, setSubCategory] = useState([EditProduct?.subCategoryId]);
  const [disabled, setDidabled] = useState(false);
  const [productImage, setProductImage] = useState();
  const [editProduct, setEditProduct] = useState(
    EditProduct
      ? {
        ...EditProduct,
        categoryId: EditProduct?.categoryId?._id,
        subCategoryId: EditProduct?.subCategoryId?._id,
        userId: admin?._id
      }
      : null
  );

  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    productName: null,
    mrp: null,
    price: null,
    discount: null,
    description: null,
    categoryId: null,
    subCategoryId: null,
    sellerID: null,
  });
  const imageChange = (e) => {
    let img = document.getElementById("img");

    let selectedImage = document.getElementById("selectImage");
    img.src = URL.createObjectURL(e.target.files[0]);
    setProductImage(e.target.files[0]);
    selectedImage.style.display = "none";
    img.style.display = "inline-block";
  };

  const onInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const onSellerChange = (e) => {
    const sellerId = e.target.value;
    const sellerCategory = Seller.find((item) => item?.seller?._id === sellerId)
      .seller?.categoryId.category;
    const category = Category.find((item) => item?.category === sellerCategory);
    setProduct({ ...product, categoryId: category?._id, sellerID: sellerId });
    setCategory(sellerCategory);
    const sellerSubCategory = subCategory.filter(
      (item) => item?.sellerId === sellerId
    );
    setSubCategory(sellerSubCategory);
  };
  const onEditSellerChange = (e) => {
    const sellerId = e.target.value;
    const sellerCategory = Seller.find((item) => item?.seller?._id === sellerId)
      .seller?.categoryId.category;
    const category = Category.find((item) => item?.category === sellerCategory);
    setEditProduct({
      ...editProduct,
      categoryId: category?._id,
      sellerID: sellerId,
    });
    const sellerSubCategory = subCategory.filter(
      (item) => item?.sellerId === sellerId
    );
    setCategory(sellerCategory);
    setSubCategory(sellerSubCategory);
  };
  const AddProducts = () => {
    if (!productImage) {
      toast.error("Choose Product Image");
    } else if (!product?.productName) {
      toast.error("Choose Product name");
    } else if (!product?.categoryId) {
      toast.error("Choose Product Main Category");
    } else if (!admin?._id) {
    }
    else if (!product?.subCategoryId) {
      toast.error("Choose Product Category");
    }
    else if (!product?.sellerID) {
      toast.error("Choose Product seller");
    }
    else if (!product?.description) {
      toast.error("Choose Product description");
    } else if (!product?.mrp) {
      toast.error("Choose Product MRP");
    } else if (!admin?._id) {
    } else if (!product?.discount) {
      toast.error("Choose Product Discount");
    } else if (!admin?._id) {
      toast.error("Choose seller Sorry Admin Cab add seller");
    }
    else {
      setloader(true)
      const Product = new FormData();
      product.price = product.mrp - (product.mrp * product.discount) / 100;
      Product.append("productImage", productImage);
      Product.append("productName", product.productName);
      Product.append("categoryId", product.categoryId);
      Product.append("subCategoryId", product.subCategoryId);
      Product.append("price", product.price);
      Product.append("sellerID", product.sellerID);
      Product.append("mrp", product.mrp);
      Product.append("discount", product.discount);
      Product.append("description", product.description);
      Product.append("disabled", disabled);
      Product.append("userId", admin?._id);
      for (let key of Product.entries()) {
        console.log(key);
      }
      axios
        .post(AdminRequest.ADD_PRODUCT, Product)
        .then((response) => {

          if (response.data?.message) {
            toast.success("Product Added successfully!!");
            axios
              .get(AdminRequest.GET_ALL_PRODUCTS)
              .then((response) => {
                dispatch(ProductsAction(response.data));
                setloader(false)
              })
              .catch((error) => {
                console.log(error);
                setloader(false)
              });
          } else {
            toast.error("Enter valid data");
            setloader(false)
          }
        })
        .catch((error) => {
          toast.success("Something Went Wrong");
          setloader(false)
        });
    }

  };

  const EditProducts = (id) => {
    const Product = new FormData();
    editProduct.price =
      parseInt(editProduct.mrp) -
      (parseInt(editProduct.mrp) * editProduct.discount) / 100;
    if (productImage) {
      Product.append("productImage", productImage);
      Product.append("userId", editProduct.userId);
      Product.append("productName", editProduct.productName);
      Product.append("categoryId", editProduct.categoryId);
      Product.append("subCategoryId", editProduct.subCategoryId);
      Product.append("price", editProduct.price);
      Product.append("sellerID", editProduct.sellerID);
      Product.append("mrp", editProduct.mrp);
      Product.append("discount", editProduct.discount);
      Product.append("description", editProduct.description);
      Product.append("disabled", disabled);
      Product.append("userId", admin?._id);

      axios.put(AdminRequest.EDIT_PRODUCT + editProduct?._id, Product)
        .then((response) => {
          toast.success(response.data?.message);
          axios
            .get(AdminRequest.GET_ALL_SELLER)
            .then((response) => {
              dispatch(SellerAction(response.data));
              dispatch(AdminOptionAction("product"))
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        })
      // Product for form data if user wanted to change image

    }
    else {
      // if user does Not change image
      const { productImage, disabled, ...rest } = editProduct;
      axios.put(AdminRequest.EDIT_PRODUCT + rest?._id, rest)
        .then((response) => {
          toast.success(response.data?.message);
          axios
            .get(AdminRequest.GET_ALL_SELLER)
            .then((response) => {
              dispatch(SellerAction(response.data));
              dispatch(AdminOptionAction("product"))
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        })
    }
  };
  const onEditInput = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };
  return (
    <>
      {(EditProduct !== null) | undefined ? (
        <>
          <>
            <section className="add-product">
              <section className="add-prod-detail">
                <div id="selectImage">
                  <label htmlFor="image">Browse Image</label> <br />
                  <input
                    onChange={imageChange}
                    type="file"
                    hidden
                    name="image"
                    id="image"
                  />
                </div>
                <img id="img" />
                <div>
                  <label htmlFor="title">Product Name</label> <br />
                  <input
                    name="productName"
                    type="text"
                    id="productName"
                    onChange={onEditInput}
                    defaultValue={EditProduct?.productName}
                  />
                </div>
                <div>
                  <label htmlFor="sellerName">Shop Keeper</label> <br />
                  <select
                    name="sellerID"
                    id="sellerName"
                    defaultValue={editProduct?.sellerID}
                    onChange={onEditSellerChange}
                  >
                    <option>Select Seller</option>

                    {Seller.map((item) => {
                      return (
                        <option
                          style={{ color: "black" }}
                          value={item?.seller?._id}
                        >
                          {item?.seller?.sellerName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label htmlFor="category">Main Category Name</label> <br />
                  <input name="category" type="text" value={category} />
                  <label htmlFor="category">Category Name</label> <br />
                  <select
                    name="subCategoryId"
                    id="category"
                    defaultValue={editProduct?.subCategoryId}
                    onChange={onEditInput}
                  >
                    <option style={{ color: "black" }}>
                      Select sub Category
                    </option>
                    {SubCategory.map((item) => {
                      return (
                        <option value={item?._id} style={{ color: "black" }}>
                          {item?.subCategory}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </section>
              <section className="add-prod-detail">
                <div></div>
                <div>
                  <label htmlFor="brand">Brand Name</label> <br />
                  <input
                    onChange={onInput}
                    type="text"
                    name="brand"
                    id="brand"
                  />
                </div>

                <div>
                  <label htmlFor="desc">Description</label> <br />
                  <textarea
                    defaultValue={EditProduct?.description}
                    name="description"
                    id=""
                    onChange={onEditInput}
                  ></textarea>
                </div>
                <div className="price">
                  <div>
                    <label htmlFor="mrp">MRP</label>
                    <input
                      onChange={onEditInput}
                      name="mrp"
                      type="number"
                      defaultValue={EditProduct?.mrp}
                      id="mrp"
                    />
                  </div>
                  <div>
                    <label htmlFor="discount">Discount</label>
                    <input
                      onChange={onEditInput}
                      name="discount"
                      defaultValue={EditProduct?.discount}
                      type="number"
                      id="discount"
                    />
                  </div>
                  <div>
                    <label htmlFor="price">Price</label>
                    <input
                      name="price"
                      type="number"
                      id="price"
                      value={Math.ceil(
                        editProduct.mrp -
                        (editProduct.mrp * editProduct.discount) / 100
                      )}
                    />
                  </div>
                </div>
                <div>
                  <input
                    style={loader ? { background: "yellow", color: "white", pointerEvents: "none", opacity: ".5" } : { background: "yellow", color: "white", cursor: "pointer" }}
                    type="submit"
                    value="Edit Product"
                    onClick={() => EditProducts()}
                  />
                </div>
              </section>
            </section>
          </>
        </>
      ) : (
        <>
          <>
            <section className="add-product">
              <section className="add-prod-detail">
                <div id="selectImage">
                  <label htmlFor="image">Browse Image</label> <br />
                  <input
                    onChange={imageChange}
                    type="file"
                    hidden
                    name="image"
                    id="image"
                  />
                </div>
                <img id="img" />
                <div>
                  <label htmlFor="title">Product Name</label> <br />
                  <input
                    name="productName"
                    type="text"
                    id="productName"
                    onChange={onInput}
                  />
                </div>
                <div>
                  <label htmlFor="xyz">Shop Keeper</label> <br />
                  <select
                    name="sellerID"
                    id="sellerName"
                    onChange={onSellerChange}
                  >
                    <option>Choose Seller</option>
                    {Seller.map((item) => {
                      return (
                        <option
                          style={{ color: "black" }}
                          value={item?.seller?._id}
                        >
                          {item?.seller?.sellerName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label htmlFor="category">Main Category Name</label> <br />
                  <input name="category" type="text" value={category} />
                  <label htmlFor="category">Category Name</label> <br />
                  <select name="subCategoryId" id="category" onChange={onInput}>
                    <option style={{ color: "black" }}>
                      Select sub Category
                    </option>
                    {SubCategory.map((item) => {
                      return (
                        <option value={item?._id} style={{ color: "black" }}>
                          {item?.subCategory}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </section>
              <section className="add-prod-detail">
                <div></div>
                <div>
                  <label htmlFor="brand">Brand Name</label> <br />
                  <input
                    onChange={onInput}
                    type="text"
                    name="brand"
                    id="brand"
                  />
                </div>

                <div>
                  <label htmlFor="desc">Description</label> <br />
                  <textarea
                    name="description"
                    id=""
                    onChange={onInput}
                  ></textarea>
                </div>
                <div className="price">
                  <div>
                    <label htmlFor="mrp">MRP</label>
                    <input
                      onChange={onInput}
                      name="mrp"
                      type="number"
                      id="mrp"
                    />
                  </div>
                  <div>
                    <label htmlFor="discount">Discount</label>
                    <input
                      onChange={onInput}
                      name="discount"
                      type="number"
                      id="discount"
                    />
                  </div>
                  <div>
                    <label htmlFor="price">Price</label>
                    <input
                      name="price"
                      type="number"
                      id="price"
                      value={Math.ceil(
                        product.mrp - (product.mrp * product.discount) / 100
                      )}
                    />
                  </div>
                </div>
                <div>
                  <input
                    style={loader ? { background: "red", color: "white", pointerEvents: "none", opacity: ".5" } : { background: "red", color: "white", cursor: "pointer" }}
                    type="submit"
                    value="Add Product"
                    onClick={() => AddProducts()}
                  />
                </div>
              </section>
            </section>
          </>
        </>
      )}
    </>
  );
};

export default AddProduct;
