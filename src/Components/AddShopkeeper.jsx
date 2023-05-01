import axios from "axios";
import React, { Children, useEffect, useState } from "react";
import "../Styles/addShoapKeeper.css";
import { useDispatch, useSelector } from "react-redux";
import { AdminOptionAction, SellerAction } from "../Redux/Actions/Action";
import AdminRequest from "../Requests/AdminRequests";
import { toast } from "react-toastify";

const AddShopkeeper = () => {
  const [isFoodSeller, setIsFoodSeller] = useState(false);
  const [sellerImage, setSellerImage] = useState();
  const [sellerCoverImage, setSellerCoverImage] = useState();
  const addOrEdit = useSelector(state => state?.Utils?.editOrAdd)
  const Category = useSelector((state) => state?.Utils?.Category) || [];
  const { admin } = useSelector((state) => state?.Admin);
  const today = new Date();
  const dispatch = useDispatch();
  const editSeller = useSelector((state) => state?.Utils?.EditSeller) || [];

  const [EditSeller, setEditSeller] = useState(
    editSeller
      ? { ...editSeller, categoryId: editSeller?.categoryId?._id }
      : null
  );
  const [Seller, setSeller] = useState({
    sellerName: null,
    disabled: false,
    categoryId: null,
    date:
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear(),
  });
  useEffect(() => {
    let cat = Category.find(c => c._id == Seller.categoryId)
    let categ = cat?.category?.toLowerCase()
    setIsFoodSeller(false)
    if (categ?.includes("food")) {
      setIsFoodSeller(true)
    }
  }, [Seller.categoryId])
  useEffect(() => {
    let cat = Category.find(c => c._id == EditSeller.categoryId)
    let categ = cat?.category?.toLowerCase()
    setIsFoodSeller(false)
    if (categ?.includes("food")) {
      setIsFoodSeller(true)
    }
  }, [EditSeller.categoryId])
  const imageChange = (e) => {
    let img = document.getElementById("img");
    let selectedImage = document.getElementById("selectImage");
    img.src = URL.createObjectURL(e.target.files[0]);
    setSellerImage(e.target.files[0]);
    selectedImage.style.display = "none";
    img.style.display = "inline-block";
  };
  const CoverImageChange = (e) => {
    let img = document.getElementById("coverimg");
    let selectedImage = document.getElementById("CoverSelectImage");
    img.src = URL.createObjectURL(e.target.files[0]);
    setSellerCoverImage(e.target.files[0]);
    selectedImage.style.display = "none";
    img.style.display = "inline-block";
  };
  const imageSellerChange = (e) => {
    let img = document.getElementById("img");
    let selectedImage = document.getElementById("selectImage");
    img.src = URL.createObjectURL(e.target.files[0]);
    setSellerImage(e.target.files[0]);
    selectedImage.style.display = "none";
    img.style.display = "inline-block";
  };
  const onInput = (e) => {
    setSeller({ ...Seller, [e.target.name]: e.target.value });
  };
  const onEditInput = (e) => {
    setEditSeller({ ...EditSeller, [e.target.name]: e.target.value });
  };
  const AddSeller = () => {
    if (!sellerImage) {
      toast.error("Choose seller Image");
    } else if (!Seller?.sellerName) {
      toast.error("Choose seller name");
    } else if (!Seller?.categoryId) {
      toast.error("Choose seller Category");
    } else if (!admin?._id) {
      toast.error("Choose seller Sorry Admin Cab add seller");
    } else if (!Seller.date) {
      toast.error("choose date !");
    } else {
      let seller = new FormData();
      seller.append("sellerImage", sellerImage);
      seller.append("sellerName", Seller.sellerName);
      seller.append("date", Seller.date);
      seller.append("categoryId", Seller.categoryId);
      seller.append("disabled", Seller.disabled);
      seller.append("userId", admin?._id);
      if (sellerCoverImage) {
        seller.append("sellerCoverImage", sellerCoverImage);
      }
      axios
        .post(AdminRequest.ADD_SELLER, seller)
        .then((response) => {
          console.log(response);
          axios
            .get(AdminRequest.GET_ALL_SELLER)
            .then((response) => {
              dispatch(SellerAction(response.data));
              dispatch(AdminOptionAction("shopkeeper"));
              toast.success("Shopkeeper Added Successfully");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  };
  const EditSellerHandler = () => {
    if (sellerImage) {
      const seller = new FormData();
      seller.append("sellerImage", sellerImage);
      seller.append("sellerName", EditSeller.sellerName);
      seller.append("categoryId", EditSeller.categoryId);
      seller.append("userId", admin?._id);
      if (sellerCoverImage) {
        seller.append("sellerCoverImage", sellerCoverImage);
      }
      axios.put(AdminRequest.EDIT_SELLER + EditSeller?._id, seller)
        .then((response) => {
          toast.success(response.data?.message);
          axios
            .get(AdminRequest.GET_ALL_SELLER)
            .then((response) => {
              dispatch(SellerAction(response.data));
              dispatch(AdminOptionAction("shopkeeper"));
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        })
    }
    else {
      const obj = {
        categoryId: EditSeller?.categoryId,
        sellerName: EditSeller?.sellerName,
        userId: admin?._id
      }
      axios.put(AdminRequest.EDIT_SELLER + EditSeller?._id, obj)
        .then((res) => {
          toast.success(res.data?.message);
          axios
            .get(AdminRequest.GET_ALL_SELLER)
            .then((response) => {
              dispatch(SellerAction(response.data));
              dispatch(AdminOptionAction("shopkeeper"));
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(err => {
          console.log(err);
        })
    }
  };
  return (
    <>
      {!addOrEdit ? (
        <>
          <section className="add-product">
            <section className="add-prod-detail">
              <div id="selectImage">
                <label htmlFor="image">Browse Image</label> <br />
                <input
                  onChange={imageSellerChange}
                  type="file"
                  hidden
                  // value={
                  //   AdminRequest.GET_SELLER_IMAGES + EditSeller?.sellerImage
                  // }
                  name="image"
                  id="image"
                />
              </div>
              <img id="img" />
              <div>
                <label htmlFor="title">Seller Name</label> <br />
                <input
                  name="sellerName"
                  type="text"
                  id="sellerName"
                  defaultValue={EditSeller?.sellerName}
                  onChange={onEditInput}
                />
              </div>
              <div>
                <select
                  onChange={onEditInput}
                  defaultValue={EditSeller?.categoryId}
                  name="categoryId"
                >
                  <option>Choose Category</option>
                  {Category.map((item) => {
                    return <option value={item?._id}>{item?.category}</option>;
                  })}
                </select>
              </div>
              <div>
                <label htmlFor="title">Date</label> <br />
                <input
                  name="date"
                  type="text"
                  id="date"
                  value={
                    today.getDate() +
                    "-" +
                    (today.getMonth() + 1) +
                    "-" +
                    today.getFullYear()
                  }
                />
              </div>
              <div>
                <input
                  style={{
                    background: "yellow",
                    color: "white",
                    cursor: "pointer",
                  }}
                  type="submit"
                  value="Edit Seller"
                  onClick={() => EditSellerHandler()}
                />
              </div>
            </section>
            {isFoodSeller && <section className="add-prod-detail">
              <div id="CoverSelectImage">
                <label htmlFor="coverimage">Cover Image</label> <br />
                <input
                  onChange={CoverImageChange}
                  type="file"
                  hidden
                  name="coverimage"
                  id="coverimage"
                />
              </div>
              <img id="coverimg" />
            </section>}
          </section>
        </>
      ) : (
        <>
          <section className="add-product">
            <section className="add-prod-detail">
              <div id="selectImage">
                <label htmlFor="image">Seller Image</label> <br />
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
                <label htmlFor="title">Seller Name</label> <br />
                <input
                  name="sellerName"
                  type="text"
                  id="sellerName"
                  onChange={onInput}
                />
              </div>
              <div>
                <select onChange={onInput} name="categoryId">
                  <option>Choose Category</option>
                  {Category.map((item) => {
                    return (
                      <option value={item?._id}>{item?.category}</option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label htmlFor="title">Date</label> <br />
                <input
                  name="date"
                  type="text"
                  id="date"
                  value={
                    today.getDate() +
                    "-" +
                    (today.getMonth() + 1) +
                    "-" +
                    today.getFullYear()
                  }
                />
              </div>
              <div>
                <input
                  style={{
                    background: "red",
                    color: "white",
                    cursor: "pointer",
                  }}
                  type="submit"
                  value="Add Seller"
                  onClick={() => AddSeller()}
                />
              </div>
            </section>
            {isFoodSeller && <section className="add-prod-detail">
              <div id="CoverSelectImage">
                <label htmlFor="coverimage">Cover Image</label> <br />
                <input
                  onChange={CoverImageChange}
                  type="file"
                  hidden
                  name="coverimage"
                  id="coverimage"
                />
              </div>
              <img id="coverimg" />
            </section>}
          </section>
        </>
      )}
    </>
  );
};

export default AddShopkeeper;
