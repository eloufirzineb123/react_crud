//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from './components/Home';
import Products from './components/Products';
import NewProduct from'./components/NewProduct';
import "bootstrap/dist/css/bootstrap.min.css";
import {  useEffect, useState } from 'react';
import EditProduct from './components/EditProduct';
import { AppContext, useAppState } from './app/app';
import State from './components/State';

function App() {
  const [currentRoute, setCurrentRoute] = useState();
  useEffect(()=>{
    const path=window.location.pathname.toLocaleLowerCase();
    setCurrentRoute(path.slice(1,path.length));
  },[]);
  return (
<AppContext.Provider value={useAppState()}  >

    <BrowserRouter>
      <nav className='m-1 p-1 border border-info navbar navbar-expand-lg navbar-light by-light'>
        <ul className="nav na-pills">
          <li >
            <Link onClick={() => setCurrentRoute("home")}
              className={currentRoute === "home" ? "btn btn-info ms-1" : "btn btn-outline-info ms-1"} to={"/home"}>Home </Link>
          </li>
          <li>
            <Link onClick={() => setCurrentRoute("products")}
              className={currentRoute === "products" ? "btn btn-info ms-1" : "btn btn-outline-info ms-1"} to={"/products"} >Products</Link>
          </li>
          <li>
            <Link onClick={() => setCurrentRoute("newProduct")}
              className={currentRoute === "newproduct" ? "btn btn-info ms-1" : "btn btn-outline-info ms-1"} to={"/newproduct"} >New Product</Link>
          </li>

        </ul>
        <ul className= "nav navbar-nav" >
          <li> 
            <State></State>
          </li>
        </ul>
      </nav>



      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/newproduct" element={<NewProduct />}></Route>
        <Route path="/editproduct/:id" element={<EditProduct />}></Route>
      </Routes>

    </BrowserRouter>
      
</AppContext.Provider>
  );
}






export default App;
