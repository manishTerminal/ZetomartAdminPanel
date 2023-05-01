import React from "react";
import "../Styles/addCategory.css"
import { useDispatch, useSelector } from "react-redux";
import { AdminOptionAction, CategoryEditAction } from "../Redux/Actions/Action";
const All_category = () => {
  const dispatch = useDispatch();
  const { subCategory, Category, EditCategory ,Seller} =
    useSelector((state) => state?.Utils) || [];
  return (
    <>
      <section>


        <div className="category">

          <div className="order_table">
            <h2>Category</h2>
            <table>
              <thead>
                <tr>
                  <td>Category</td>
                  <td>Date</td>
                  <td>Action</td>

                </tr>
              </thead>
              <tbody>
                {Category &&
                  Category.map((item) => {
                    return (
                      <tr>
                        <td>{item?.category}</td>
                        <td>{item?.date?.slice(0, 10)}</td>


                        <td>
                          <button style={{ background: "yellow", padding: ".2rem .4rem" }} onClick={() => {
                            dispatch(
                              CategoryEditAction({ ...EditCategory, category: item })
                            );
                            dispatch(AdminOptionAction("add-category"));
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
          <div className="order_table">
            <h2>Sub Category</h2>
            <table>
              <thead>
                <tr>
                  <td>Sub Category</td>
                  <td> Category</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>

                {
                  Seller?.map(i => {

                    return <>
                      <h3>{i?.seller?.sellerName}</h3>
                      {
                        subCategory.filter(j => j?.sellerId === i?.seller?._id).map((item) => {
                          return (
                            <tr>
                              <td> {item?.subCategory}</td>
                              <td> {i?.seller?.categoryId?.category}</td>


                              <td>
                                <button style={{ background: "yellow", padding: ".2rem .4rem" }} onClick={() => {
                                  dispatch(AdminOptionAction("add-category"));
                                  dispatch(
                                    CategoryEditAction({ ...EditCategory, subCategory: item })
                                  );
                                }}>
                                  Edit
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      }

                    </>
                  })

                }
              </tbody>
            </table>
          </div>
        </div>

      </section>
    </>
  );
};

export default All_category;
