import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.name) {
      alert("Name is required.");
      return false;
    }
    if (!formData.email) {
      alert("Email is required.");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      alert("Phone number must be 10 digits.");
      return false;
    }
    if (!formData.message) {
      alert("Message is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Send form data to the backend
        const response = await axios.post("http://localhost:5001/api/contact", formData);

        alert("Form submitted successfully! Thank you for reaching out to us.");
        console.log(response.data);

        // Clear form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } catch (error) {
        console.error("Error submitting the form:", error);
        alert("Failed to submit the form. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="logo">
        <a href="code.html">
          <i className="ri-arrow-left-circle-fill"></i>
        </a>
      </div>

      <section className="banner">
        <img
          src="https://media.geeksforgeeks.org/wp-content/uploads/20230822131732/images.png"
          alt="Welcome to our Contact Us page"
        />
        <h1>Get in Touch With Us</h1>
        <p>We're here to answer any questions you may have.</p>
      </section>

      <div className="contact-form">
        <div className="form-container">
          <h2>Your Details</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Optional"
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>

      <footer className="footer">
        <div className="footer__addr">
          <h1 className="footer__logo">Alpine</h1>
          <h2>Contact</h2>
          <address>
            Chitkara University, Rajpura, Punjab, 140401
            <br />
            <a className="footer__btn" href="mailto:example@gmail.com">
              Email Us
            </a>
          </address>
        </div>
        <ul className="footer__nav">
          <li className="nav_item nav_item--extra">
            <h2 className="nav__title">My Account</h2>
            <ul>
              <li>
                <a href="#">Order History</a>
              </li>
              <li>
                <a href="#">Wish List</a>
              </li>
              <li>
                <a href="login.html">Login</a>
              </li>
            </ul>
          </li>
          <li className="nav__item">
            <h2 className="nav__title">Legal</h2>
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
            </ul>
          </li>
        </ul>
        <p>&copy; 2024 Alpine. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Contact;