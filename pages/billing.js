import React, { useState, useEffect } from 'react';
//import './billing.css'; // Import your CSS file
import axios from 'axios';

function Billing() {
  const medicineData = {
    '1': { medicineId: '1', price: 50 },
    '2': { medicineId: '2', price: 100 },
    '3': { medicineId: '3', price: 30 },
    '4': { medicineId: '4', price: 120 },
    '5': { medicineId: '5', price: 60 },
    '6': { medicineId: '6', price: 80 },
    '7': { medicineId: '7', price: 35 },
    '8': { medicineId: '8', price: 40 },
    '9': { medicineId: '9', price: 70 },
    '10': { medicineId: '10', price: 45 },
  };

const medicineOptions = [
  { label: 'Paracetamol', value: '1' },
  { label: 'Amoxicillin', value: '2' },
  { label: 'Aspirin', value: '3' },
  { label: 'Ciprofloxacin', value: '4' },
  { label: 'Omeprazole', value: '5' },
  { label: 'Atorvastatin', value: '6' },
  { label: 'Ibuprofen', value: '7' },
  { label: 'Ranitidine', value: '8' },
  { label: 'Diazepam', value: '9' },
  { label: 'Metformin', value: '10' }
];

  // { label: 'Paracetamol', value: '1' },
  // { label: 'Medicine B', value: '2' },
  // { label: 'Medicine C', value: '3' },
  
  useEffect(()=>{
    getData()
  }, [])
  const getData = async()=>{
    await axios.post(`http://localhost:3000/api/queryHandler`, {query: "set foreign_key_checks=0;"});
    const query = `SELECT med_id, med_name,price FROM medicine;`
    const result = await axios.post(`http://localhost:3000/api/queryHandler`, {query: query});
    console.log(result.data.results)
    var p 
    p=result.data.results
    await axios.post(`http://localhost:3000/api/queryHandler`, {query: "set foreign_key_checks=1;"});
    var i;
    console.log( "hello",p)
    // console.log(p[0])
    // for(i=1;i<result.data.results.length;i++)
    // {
    //   setMedicineOptions(prevOptions => [...prevOptions, result.data.results[i]]);
    // };
    // console.log(medicineOptions)
  }
  const [entries, setEntries] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [selectedMedicineId, setSelectedMedicineId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);



  

  const handleMedicineChange = (event) => {
    const selectedMedicineValue = event.target.value;
    print("----->", selectedMedicine)
    setSelectedMedicine(selectedMedicineValue);

    const { medicineId, price } = medicineData[selectedMedicineValue] || {
      medicineId: '',
      price: 0,
    };
    setSelectedMedicineId(medicineId);
    setSelectedPrice(price);
  };

  const handleQuantityChange = (event) => {
    const quantityValue = parseInt(event.target.value, 10);
    // Validate that quantity is not less than 0
    if (quantityValue >= 0) {
      setQuantity(quantityValue);
      // Calculate the price based on quantity and update it
      const { price } = medicineData[selectedMedicine] || { price: 0 };
      setSelectedPrice(price * quantityValue);
    }
  };

  const handleSaveOption = () => {
    if (selectedMedicine && selectedMedicineId && quantity && selectedPrice) {
      const newEntry = {
        medicine: selectedMedicine,
        medicineId: selectedMedicineId,
        quantity,
        price: selectedPrice,
      };
      setEntries([...entries, newEntry]);

      // Reset the form
      setSelectedMedicine('');
      setSelectedMedicineId('');
      setQuantity(0);
      setSelectedPrice(0);
    }
  };

  const calculateTotalAmount = () => {
    return entries.reduce((total, entry) => total + entry.price, 0);
  };

  return (
    <div className="billing-container">
      <img src="billing.svg" className='BillingImg'></img>
      <h1 className="MainHeading">BILLING</h1>
      <div className="F">
              <label className="CustBilling">Customer ID:</label>
              <input
                type="text"
                placeholder="Customer ID"
                required
              />
            </div>
      <div className="F">
        <label>Med_Name:</label>
        <select value={selectedMedicine} onChange={handleMedicineChange}>
          <option value="">Select a medicine</option>
          {medicineOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="F">
        <label>Med_ID:</label>
        <select value={selectedMedicineId} readOnly>
          <option value={selectedMedicineId}>{selectedMedicineId}</option>
        </select>
      </div>
      <div className="F">
        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={handleQuantityChange} />
      </div>
      <div className="F">
        <label>Price:</label>
        <input type="number" value={selectedPrice} readOnly />
      </div>
      <button className="billbutton" onClick={handleSaveOption}>ADD</button>

      <div className="selected-entries">
        <h1 className="MainHeading">BILLED ITEMS</h1>
        <div className='FinalBill'>
            <div className="FBI1">NAME</div>
              <div className="FBI1">ID</div>
              <div className="FBI1">QTY</div>
              <div className="FBI1">COST</div>
            </div>
        {entries.map((entry, index) => (
          <div key={index} className="selected-entry">
            <div className="FinalBill">
              <div className="FBI">{medicineOptions[entry.medicine].label}</div>
              <div className="FBI">{entry.medicineId}</div>
              <div className="FBI">{entry.quantity}</div>
              <div className="FBI">{entry.price}</div>
            </div>
          </div>
        ))}
        <p>Total Amount: {calculateTotalAmount()}</p>
      </div>
    </div>
  );
}

export default Billing;