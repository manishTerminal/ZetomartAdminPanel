import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { SellerAction } from '../Redux/Actions/Action';
import AdminRequest from '../Requests/AdminRequests';

const Rating = () => {
  const dispatch = useDispatch()
  const [rate, setRate] = useState([])
  const seller = useSelector((state) => state?.Utils?.Seller) || [];
  const { admin } = useSelector((state) => state?.Admin);
  useEffect(() => {
    const sellerRating = seller?.map(i => i?.review);
    const arr = [].concat.apply([], sellerRating);
    setRate(arr)
  }, [seller])

  const DeleteHandler = (id) => {
    // console.log(AdminRequest.DELETE_REVIEW + admin?._id + "/" + id);
    axios.delete(AdminRequest.DELETE_REVIEW + admin?._id + "/" + id)
      .then(res => {
        toast.success(res?.data?.message)
        axios
          .get(AdminRequest.GET_ALL_SELLER)
          .then((response) => {
            dispatch(SellerAction(response.data));
          })
          .catch((error) => {
            console.log(error);
          });

      })
      .catch(err => {
        toast.error("Something went wrong")
      })
  }

  return (
    <section className="contact-data">
      <div className="order_table">
        <table>
          <thead>
            <tr className="">
              <td>Username</td>
              <td>Rating</td>
              <td>Date</td>
              <td>Review</td>
              <td>Action</td>

            </tr>
          </thead>
          <tbody>
            {rate.map((item, i) => {
              return (
                <tr key={i} className="cd-detail">
                  <td>{item?.userId?.username}</td>
                  <td>{item?.rating}
                    <span style={{ color: "yellow", fontSize: "1.1rem" }}> &#9733;</span>
                  </td>
                  <td>{item?.date?.slice(0, 10)}

                  </td>
                  <td className="message"> {item?.review?.slice(0, 50)}</td>
                  <td > <span style={{background:"red",padding:"0.5rem 1rem"}} onClick={() => DeleteHandler(item?._id)} >Delete</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Rating