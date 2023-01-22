import React, { useEffect, useState } from "react";
import "../ComponentCSS/NavCSS.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductArray from "./ProductArray";
import ProductArrayFilter from "./ProductArrayFilter";



const Home = ()=>{

    const [productList, setProductList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [btnClick, setBtnClick] = useState(false);
    const [valueSend, setValueSend] = useState("")

    useEffect(()=>{
        axios.get("http://localhost:8000/products").then((res)=>{
            setProductList(res.data);
        }).catch((error)=>{
            alert(error.message);
        })
    }, [])

    useEffect(()=>{
        setValueSend(searchInput);
    }, [searchInput])

    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setSearchInput([name]=value);
        setBtnClick(false);
    }

    const handleSubmit = ()=>{
        if(valueSend.length!=0 && !btnClick){
            setBtnClick(true);
            setSearchInput("");
        }
        else{
            alert("Please provide value in search field...");
        }
    }

    const iconClick = ()=>{
        const elem = document.querySelector('.nav-elements')
        elem.classList.toggle("active")
    }


    return (
    <>
    <div className="home-container">
    <nav className="nav-bar">
        <div className="nav-elements">
            <div className="book-logo">📚BKStore</div>
            <div className="link-buttons">
                <Link to="/aboutus" className="nav-link">About Us</Link>
                <Link to="/contactus" className="nav-link">Contact Us</Link>
                <Link to="/login" className="nav-link">Login</Link>       
            </div>
            <div className="extra-icons" onClick={()=>iconClick()}>
                <span name="hamburger" className="nav-icon"><i className="fa fa-bars" aria-hidden="true" ></i></span>
                <span name="cancel" className="nav-icon"><i className="fa fa-times" aria-hidden="true" ></i></span>
            </div>
        </div>
        <main className="mainText">
            <h1>Welcome To Online Book Store</h1>
            <div className="input-field">
                <input type="text" placeholder="Search Book by Name or Category"
                id="searchvalue" name="searchvalue" value={valueSend} onChange={handleInput}></input>
                <div className="search-icon">
                <i className="fa fa-search" aria-hidden="true" onClick={handleSubmit}></i>
                </div>
            </div>
        </main>
    </nav>
    <section className="product-list-section">
        <div className="product-heading">
            <h1>Our Products</h1>
        </div>
        <div className="product-list">
            {btnClick ? <ProductArrayFilter productList={productList} valueSend={valueSend}/>:<ProductArray productList = {productList}/>}
        </div>
    </section>
    </div>
    </>
    )
}

export default Home;