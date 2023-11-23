import React, { useState } from 'react';
//import './design.css';
import axios from 'axios'

const generateCustomerId = (firstName, lastName, phoneNumber, dob) => {
  const id = `${firstName.substring(0, 3)}${lastName.substring(0, 3)}${phoneNumber.substring(0, 3)}${dob.replaceAll('-', '').substring(0, 4)}`;
  return id.toUpperCase();
};

const CustomerPage = () => {
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dob: '',
    customerId: ''
  });

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const { firstName, lastName, phoneNumber, dob} = customerInfo;
    const generatedCustomerId = generateCustomerId(firstName, lastName, phoneNumber, dob);
    setCustomerInfo({ ...customerInfo, customerId: generatedCustomerId });
    
    console.log('Submitted Customer Information:', customerInfo);

    await axios.post(`http://localhost:3000/api/queryHandler`, {query: "set foreign_key_checks=0;"});
    const query = `INSERT INTO customer (customer_name, dob, phone_no,c_id) VALUES("${customerInfo.firstName+' '+customerInfo.lastName}", "${customerInfo.dob}", "${customerInfo.phoneNumber}","${customerInfo.customerId}");`
    console.log(query)
    const result = await axios.post(`http://localhost:3000/api/queryHandler`, {query: query});
    console.log(result)
    await axios.post(`http://localhost:3000/api/queryHandler`, {query: "set foreign_key_checks=1;"});

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  return (
    <div className="MainCustomer">
      <img src="customer.svg" className='customerImg'></img>
      <div className="container mx-auto p-4">
        <h1 className="MainHeading">CUSTOMER INFORMATION</h1>

        <form className="CustomerForms" onSubmit={handleFormSubmit}>
          <div className="FormsDiv">
            <div className="F">
              <label className="first" htmlFor="firstName">First Name:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="F">
              <label className="last" htmlFor="lastName">Last Name:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="F">
              <label className="phone" htmlFor="phoneNumber">Phone Number:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                onChange={handleChange}
                required
              />
            </div>
            <div className="F">
              <label className="dob" htmlFor="dob">Date of Birth:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dob"
                name="dob"
                type="date"
                onChange={handleChange}
                required
              />
            </div>
      
      
          </div>

          <div className="buttondiv">
            <button
              className="SubmitButton"
              type="submit">
              Submit
            </button>
          </div>
        </form>

        <div className="mt-4">
          <p>Generated Customer ID: {customerInfo.customerId}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
