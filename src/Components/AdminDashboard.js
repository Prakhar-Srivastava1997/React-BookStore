import React, { useEffect, useState } from "react";
import "../ComponentCSS/AdminCSS.css";
import AddProduct from "../Components/AddProduct.js";
import ViewProducts from "./ViewProducts";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () =>{

    const [addProductBtnClick, setAddProductBtnClick] = useState(false);
    const [viewProductBtnClick, setViewProductBtnClick] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        setAddProductBtnClick(false);
        setViewProductBtnClick(false);

        if(!localStorage.getItem("AdminLogin")){
            navigate("/error")
        }
    }, [])
 
    const addProduct = ()=>{
        setAddProductBtnClick(true);
        setViewProductBtnClick(false);
    }

    const viewProduct = ()=>{
        setAddProductBtnClick(false);
        setViewProductBtnClick(true);
    }

    const logout = ()=>{
        localStorage.removeItem("AdminLogin");
        navigate("/login")
    }

    return (
        <>
            <div className="admin-container">
                <div className="sec-heading">
                    <div className="top-div">
                        <h1>HELLO ADMIN ! WELCOME TO THE DASHBOARD</h1>
                    </div>
                    <div className="below-div">
                        <span><i className="fa fa-sign-out logout" aria-hidden="true" onClick={()=>logout()}></i></span>
                    </div>
                </div>
                <div className="sec-operations">
                    <h1>OPERATIONS</h1>
                    <div className="operation-array">
                        <div className="addproduct">
                            <h1>ADD PRODUCT</h1>
                            <p>By clicking on ADD PRODUCT button, admin can add a new product in the store.</p>
                            <div className="addprod-btn">
                                <button type="button" onClick={addProduct}>ADD PRODUCT <i className="fa fa-plus"></i></button>
                            </div>
                        </div>
                        <div className="viewproducts">
                            <h1>VIEW PRODUCTS</h1>
                            <p>By clicking on VIEW PRODUCTS button, admin can view all product in the store.</p>
                            <div className="viewprod-btn">
                                <button type="button" onClick={viewProduct}>VIEW PRODUCT <i className="fa fa-eye"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="sec-component">
                        {addProductBtnClick && <div><AddProduct/></div>}
                        {viewProductBtnClick && <div>
                            <h1>Available Books</h1><br/>
                            <div><ViewProducts/></div></div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;