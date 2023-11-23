// pages/_app.js
import Head from 'next/head';
//import '../styles/globals.css';
import Navbar from '../components/Navbar';
import './design.css';
import './billing.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Navbar/>
    <Component {...pageProps} />
    </>
  );
}

export default MyApp;