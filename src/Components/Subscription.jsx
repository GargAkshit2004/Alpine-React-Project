import React, { useState } from 'react';

const Subscription = () => {
  const [email, setEmail] = useState(''); // State to store the email input
  const [agreed, setAgreed] = useState(false); // State to track agreement to terms

  // Enhanced email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._!#$%&'*+/=?^`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate the email before proceeding
    if (!isValidEmail(email)) {
      alert('Error: Please enter a valid email address.'); // Show validation error in a prompt box
      return; // Stop further execution
    }

    // Ensure the user agrees to the terms
    if (!agreed) {
      alert('Error: You must agree to the terms before subscribing.'); // Show validation error in a prompt box
      return; // Stop further execution
    }

    try {
      const response = await fetch('http://localhost:5001/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, agreedToTerms: agreed }),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Backend Error:', errorData);
        alert(`Error ${response.status}: ${errorData.message || 'An error occurred.'}`);
        return;
      }
    
      const data = await response.json();
      alert('Success: Subscription saved successfully!');
      setEmail('');
      setAgreed(false);
    } catch (error) {
      console.error('Network Error:', error);
      alert('Error: An error occurred. Please try again later.');
    }
  };
    
  return (
    <div className="subscribe">
      <h2 className="subscribe__title">Let's keep in touch</h2>
      <p className="subscribe__copy">Subscribe to keep your garden fresh and updated. We promise not to spam you!</p>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          className="form__email"
          placeholder="Enter your email address"
          value={email} // Bind the email input to the state
          onChange={(e) => setEmail(e.target.value)} // Update state when input changes
          required // Ensure email input is not empty
        />
        <button type="submit" className="form__button">Send</button>
      </form>
      <div className="notice">
        <input
          type="checkbox"
          checked={agreed} // Bind the checkbox to the state
          onChange={() => setAgreed(!agreed)} // Toggle agreement state
        />
        <span className="notice__copy">I agree to my email being stored and used to receive monthly updates.</span>
      </div>
    </div>
  );
};

export default Subscription;