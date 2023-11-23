import React, { useState } from 'react';
import axios from 'axios';

const generateSupplierId = (supplierName, phoneNo) => {
  const id = `${supplierName.substring(0, 3)}${phoneNo.substring(0, 3)}`;
  return id.toUpperCase();
};

const SupplierInfoForm = () => {
  const [supplierInfo, setSupplierInfo] = useState({
    supplierName: '',
    supplierId: '',
    phoneNo: '',
    orderId: '',
    medId: ''
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { supplierName, phoneNo, orderId, medId } = supplierInfo;

    // Validate phone number is numeric
    if (!/^\d+$/.test(phoneNo)) {
      alert('Phone Number should contain only numeric values.');
      return;
    }
    const generatedSupplierId = generateSupplierId(supplierName, phoneNo);
    setSupplierInfo({ ...supplierInfo, supplierId: generatedSupplierId });
    console.log('Form submitted:', supplierInfo);
    await axios.post(`http://localhost:3000/api/queryHandler`, { query: "set foreign_key_checks=0;" });
    const query = `INSERT INTO supplier (supplier_name, s_id, phone_no, order_id, med_id) VALUES("${supplierName}", "${generatedSupplierId}", "${phoneNo}", "${orderId}", "${medId}");`;
    console.log(query);
    const result = await axios.post(`http://localhost:3000/api/queryHandler`, { query: query });
    console.log(result);
    await axios.post(`http://localhost:3000/api/queryHandler`, { query: "set foreign_key_checks=1;" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierInfo({ ...supplierInfo, [name]: value });
  };

  return (
    <div className="billing-container">
      <img src="supplier.svg" className='SupplierImg'></img>
      <h1 className="MainHeading">SUPPLIER INFO</h1>
      <div className="supplier-info-form">
        <form onSubmit={handleFormSubmit}>
          <div className="F">
            <label>Supplier Name:</label>
            <input
              type="text"
              name="supplierName"
              value={supplierInfo.supplierName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="F">
            <label>Supplier ID:</label>
            <input
              type="text"
              name="supplierId"
              value={supplierInfo.supplierId}
              onChange={handleChange}
              readOnly // Make the supplier ID input read-only
            />
          </div>
          <div className="F">
            <label>Phone Number:</label>
            <input
              type="tel"
              pattern="[0-9]*"
              inputMode="numeric"
              name="phoneNo"
              value={supplierInfo.phoneNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="F">
            <label>Order ID:</label>
            <input
              type="text"
              name="orderId"
              value={supplierInfo.orderId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="F">
            <label>Medicine ID:</label>
            <input
              type="text"
              name="medId"
              value={supplierInfo.medId}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="SubmitButton">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SupplierInfoForm;
