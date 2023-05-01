import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import AdminRequest from "../Requests/AdminRequests";
import "../Styles/contact.css";
const ContactData = () => {
  const [contact, setContact] = useState([]);
  useEffect(() => {
    axios
      .get(AdminRequest.ALL_CONTACT)
      .then((res) => {
        setContact(res?.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <section className="contact-data">
      <div className="order_table">
        <table>
          <thead>
            <tr className="">
              <td>Name</td>
              <td>E-Mail</td>
              <td>Mobile</td>
              <td>Interest</td>
              <td>Message</td>
            </tr>
          </thead>
          <tbody>
            {contact.map((item, i) => {
              return (
                <tr key={i} className="cd-detail">
                  <td>{item?.username}</td>
                  <td>{item?.email}</td>
                  <td>{item?.phoneNumber}</td>
                  <td>{item?.interest}</td>
                  <td className="message">{item?.description?.slice(0, 50)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ContactData;
