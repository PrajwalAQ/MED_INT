export default function Navbar(){
   
    return(
        
        <div className="NavBar">
          <div className="logo">
            <img src="logo0.png" alt="Logo" />
          </div>
          <div className="title"><h1>MEDINV</h1></div>

          <div className="links">
            <button className="navbutton"><a  href="/">HOME</a></button>
            <button className="navbutton"><a  href="/customer1">CUSTOMER</a></button>
            <button className="navbutton"><a  href="/billing">BILLING</a></button>
            <button className="navbutton"><a  href="/invoice">INVENTORY</a></button>
            <button className="navbutton"><a  href="/supplier">SUPPLIER</a></button>
            <input className="nav-input"></input>
          </div>
        </div>
        
    )

}