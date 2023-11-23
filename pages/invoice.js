import React, { useState, useEffect } from 'react';
//import './billing.css'; 
// Import your CSS file
import axios from 'axios';
import { findAncestor } from 'typescript';

const invoice = () =>{

  const [inventoryData, setInventoryData] = useState([]);

  useEffect(()=>{
    getData()
  }, [])
  const getData = async()=>{
    await axios.post(`http://localhost:3000/api/queryHandler`, {query: "set foreign_key_checks=0;"});
    const query = `SELECT * FROM inventory;`
    const result = await axios.post(`http://localhost:3000/api/queryHandler`, {query: query});
    console.log(result.data.results)
    console.log(result.data.results)
    // result.data.results.toString()
    await axios.post(`http://localhost:3000/api/queryHandler`, {query: "set foreign_key_checks=1;"});
    try {
      setInventoryData(result.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  return(
    <div className="billing-container">
      <img src="inventory.svg" className='InvImg'></img>
    <h1 className="MainHeading" >INVENTORY</h1>
    <table className="invtable">
      <thead>
        <tr>
          <th>MED-ID</th>
          <th>EXPIRY DATE</th>
          <th>AMOUNT</th>
          {/* Add additional headers based on your table columns */}
        </tr>
      </thead>
      <tbody>
      {inventoryData.map((item) => (

        <tr key={item.med_id}>
          <td>{item.med_id}</td>
          <td>{(new Date(item.expiry_date)).toDateString()}</td>
          <td>{item.stock_quantity}</td>
          {/* Add additional cells based on your table columns */}
        </tr>
      ))}
      </tbody>
    </table>
  </div>
  );
}

export default invoice;