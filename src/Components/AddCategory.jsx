import React, { useEffect, useState } from "react";
import "../Styles/addCategory.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import AdminRequest from "../Requests/AdminRequests";
import { AdminOptionAction, CategoryAction, subCategoryAction } from "../Redux/Actions/Action";
const AddCategory = () => {
  const { admin } = useSelector((state) => state?.Admin);
  const [rate, setRate] = useState(0);
  const [currRate, setCurrRate] = useState(0);

  const { Seller, Category, EditCategory } =
    useSelector((state) => state?.Utils) || [];


  const [editCategory, setEditCategory] = useState(
    EditCategory ? EditCategory.category : null
  );
  const [editSubCategory, setSubEditCategory] = useState(
    EditCategory ? EditCategory.subCategory : null
  );
  const [addCategory, setAddcategory] = useState({
    userId: admin?._id,
    category: null,
  });
  const [addSubCategory, setAddSubcategory] = useState({
    userId: admin?._id,
    categoryId: null,
    sellerId: null,
    subCategory: null,
  });

  const [category, setCategory] = useState(editSubCategory?.categoryId?.category
  );
  const dispatch = useDispatch();
  const onCategoryInput = (e) => {
    setAddcategory({ ...addCategory, [e.target.name]: e.target.value });
  };
  const onSubCategoryInput = (e) => {
    setAddSubcategory({ ...addSubCategory, [e.target.name]: e.target.value });
  };
  const categorySubmit = (e) => {
    e.preventDefault();
    if (!addCategory.category) toast.error("Please Enter Category");
    else {
      axios
        .post(AdminRequest?.CATEGORY, addCategory)
        .then((res) => {
          if (res.data?.message) {
            toast.success(res?.data?.message);
            axios
              .get(AdminRequest.CATEGORY)
              .then((response) => {
                dispatch(CategoryAction(response.data));
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((err) => {
          toast.error("something went wrong");
        });
    }
  };
  const SubCategorySubmit = (e) => {

    e.preventDefault();
    if (!addSubCategory?.userId) {
      toast.error("Please Chosse User");
    } else if (!addSubCategory?.sellerId) {
      toast.error("Please Chosse seller");
    } else if (!addSubCategory?.categoryId) {
      toast.error("Please Chosse Category");
    } else {
      axios
        .post(AdminRequest?.SUBCATEGORY, addSubCategory)
        .then((res) => {
          toast.success(res?.data?.message);
          axios
            .get(AdminRequest.SUBCATEGORY)
            .then((response) => {
              dispatch(subCategoryAction(response.data));
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          toast.error("something went wrong");
        });
    }
  };
  const onEditSellerChange = (e) => {
    const sellerId = e.target.value;
    const seller = Seller.find((item) => item?.seller?._id === sellerId);
    const categoryId = Category.find(
      (item) => item?._id === seller?.seller?.categoryId?._id
    )?._id;
    setSubEditCategory({ ...editSubCategory, sellerId, categoryId });
    setCategory(seller?.seller?.categoryId.category);
  };
  const onSellerChange = (e) => {

    const sellerId = e.target.value;
    const seller = Seller.find((item) => item?.seller?._id === sellerId);
    const categoryId = Category.find(
      (item) => item?._id === seller?.seller?.categoryId?._id
    )?._id;
    setCategory(seller?.seller?.categoryId.category);
    setAddSubcategory({ ...addSubCategory, categoryId, sellerId });
  };
  const EditDeliveryRate = (e) => {
    let obj = {
      userId: admin?._id,
      rate: parseInt(rate),
    };

    axios
      .post(AdminRequest.EDIT_DELIVERY, obj)
      .then((res) => {
        if (res?.data?.message) {
          axios.get(AdminRequest.EDIT_DELIVERY)
            .then(response => {
              console.log(response);
              setCurrRate(response?.data?.rate)
            })
            .catch(err => console.log("something went wrong"))
        }
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onEditCategory = () => {
    const obj = {
      userId: admin?._id,
      category: editCategory?.category
    };
    if (!obj.userId) {
      toast.error("Admin Can only change category")
    }
    else if (!obj?.category) {
      toast.error("Please Enter Category")
    }
    else {
      axios.put(AdminRequest.EDIT_CATEGORY + editCategory?._id, obj)
        .then((response) => {
          toast.success(response.data?.message);
          axios.get(AdminRequest.CATEGORY)
            .then((response) => {
              dispatch(AdminOptionAction("all-category"));
              dispatch(CategoryAction(response.data));
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch((error) => {
          console.log(error);
        })
    }
  };
  const EditSubCategory = () => {

    const obj = {
      userId: admin?._id,
      sellerId: editSubCategory?.sellerId,
      categoryId: editSubCategory?.categoryId,
      subCategory: editSubCategory?.subCategory
    }
    if (!obj?.userId) {
      toast.error("Only Admin can change")
    }
    else if (!obj?.sellerId) {
      toast.error("Please Choose Seller")
    }
    else if (!obj?.categoryId) {
      toast.error("Please Choose Category")
    }
    else if (!obj?.subCategory) {
      toast.error("Please  SubCategory is needed")
    }
    else {
      axios.put(AdminRequest.EDIT_SUBCATEGORY + editSubCategory?._id, obj)
        .then((response) => {
          toast.success(response.data?.message);
          axios.get(AdminRequest.SUBCATEGORY)
            .then((response) => {
              dispatch(subCategoryAction(response.data));
              dispatch(AdminOptionAction("all-category"));
            })
        })
        .catch((error) => {
          console.log(error);
        })
    }

  };
  useEffect(() => {
    axios.get(AdminRequest.EDIT_DELIVERY).then(res => {
      setCurrRate(res?.data?.rate)
    })
  }, [])
  return (
    <>
      <section className="add-category">
        <input
          className="addBtn"
          type="button"
          value="All Category"
          onClick={(e) => dispatch(dispatch(AdminOptionAction("all-category")))}
        />
        {!editCategory ? (
          <div>
            <h2>Add Main Category</h2>
            <form>
              <input
                onChange={onCategoryInput}
                name="category"
                type="text"
                placeholder="Enter Category name"
              />
              <input
                className="addBtn"
                type="button"
                value="Add"
                onClick={categorySubmit}
              />
            </form>
          </div>
        ) : (
          <div>
            <h2>Edit Main Category</h2>
            <form>
              <input
                onChange={(e) =>
                  setEditCategory({ ...editCategory, category: e.target.value })
                }
                name="category"
                type="text"
                defaultValue={editCategory.category}
                placeholder="Enter Category name"
              />
              <input
                className="addBtn"
                type="button"
                value="Update"
                onClick={onEditCategory}
              />
            </form>
          </div>
        )}

        {!editSubCategory ? (
          <div>
            <h2>Add Sub Category</h2>
            <form>
              <div>
                {" "}
                <input
                  type="text"
                  name="subCategory"
                  placeholder="Enter Sub Category name"
                  onChange={onSubCategoryInput}
                />
                <select onChange={onSellerChange} name="sellerId" id="">
                  <option>Choose Seller</option>
                  {Seller.map((item) => {
                    return (
                      <option value={item?.seller?._id}>
                        {item?.seller?.sellerName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <input type="text" name="category" value={category} />
                <input
                  className="addBtn"
                  type="button"
                  value="Add"
                  onClick={SubCategorySubmit}
                />
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h2>Edit Sub Category</h2>
            <form>
              <div>
                <input
                  type="text"
                  name="subCategory"
                  placeholder="Enter Sub Category name"
                  defaultValue={editSubCategory.subCategory}
                  onChange={(e) =>
                    setSubEditCategory({
                      ...editSubCategory,
                      subCategory: e.target.value,
                    })
                  }
                />
                <select
                  onChange={onEditSellerChange}
                  defaultValue={editSubCategory.sellerId}
                  name="sellerId"
                  id=""
                >
                  {Seller.map((item) => {
                    return (
                      <option value={item?.seller?._id}>
                        {item?.seller?.sellerName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <input type="text" name="category" value={category} />
                <input
                  className="addBtn"
                  type="button"
                  value="Edit SubCategory"
                  onClick={EditSubCategory}
                />
              </div>
            </form>
          </div>
        )}
        <div>
          <h2>Edit Delivery Rate (Current : {currRate})</h2>
          <form>
            <div>
              <input
                type="number"
                name="rate"
                placeholder="Enter Delivery Rate"
                onChange={(e) => setRate(e.target.value)}
              />
              <input
                className="addBtn"
                type="button"
                value="Update Delivery"
                onClick={() => EditDeliveryRate()}
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddCategory;
