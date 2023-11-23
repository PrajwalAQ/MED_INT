//import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link'; // Import Link component for navigation
import Image from 'next/image';
//import medicine1 from '../public/medicine1.png'


const App = () => {
  return (
    <div className="App">
      <header>
        <nav>
          <ul className="nav-links">
            <li><a href="#inventory">Inventory</a></li>
            <li><a href="#orders">Orders</a></li>
            <li><a href="#suppliers">Suppliers</a></li>
          </ul>
        </nav>
      </header>

      <img src="background1.png" className='backgroundImg'></img>
      <div className='main'>
        <div className='About'>
          <h6>ABOUT US</h6>
          <p className='para'>Welcome to MedTech Solutions, where we lead the way in creating advanced medical inventory management systems. Our dedicated team is committed to revolutionizing supply chains, ensuring healthcare providers have seamless access to essential medical resources. Join us on our mission to elevate inventory management standards and enhance patient care globally.</p>
        </div>
        <div  id='inventory' className="About">
          {/* Inventory content goes here */}
          <h6>INVENTORY</h6>
          <p className='para'>Explore and manage medical supplies through this platform, gaining insights and control over inventory. Stay informed and ensure efficient handling of medical resources for optimal operations.</p>
        </div>

        <div id='orders' className="About">
          {/* Orders content goes here */}
          <h6>ORDERS</h6>
          <p className='para'>
Efficiently manage and track orders using this system, providing a streamlined process for order fulfillment. Keep a close eye on order statuses and enhance overall order tracking capabilities for improved operational control</p>
        </div>

        <div  id='suppliers'className="About">
          {/* Suppliers content goes here */}
          <h6>SUPPLIERS</h6>
          <p className='para'>Effectively oversee and organize supplier data through a comprehensive management system. Streamline the management of suppliers and their information for enhanced efficiency in procurement and relationship management</p>
        </div>
      </div>
    </div>
  );
};

export default App;