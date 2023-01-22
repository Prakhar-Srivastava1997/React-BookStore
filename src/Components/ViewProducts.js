import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ComponentCSS/ProductArray.css";
import { useNavigate } from "react-router-dom";

const ViewProducts = ()=>{

    const [prodArray, setProdArray] = useState([]);
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get("http://localhost:8000/products").then((res)=>{
            setProdArray(res.data);
        }).catch((error)=>{
            alert(error.message);
        })

        if(!localStorage.getItem("AdminLogin")){
            navigate("/error")
        }
    }, [])
    return (
        <>
            <div className="card-container">
                {
                    prodArray.map((curElem)=>{
                        return (
                            <>
                                <div className="card" key={curElem.id}>
                                    <div className="card-left">
                                        <img src={curElem.productimage}/>
                                    </div>
                                    <div className="card-right">
                                        <h1>{curElem.productname}</h1>
                                        <div className="item-rating">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i><span>({Math.floor((Math.random()*10000)+1).toString()})</span>
                                        </div>
                                        <p>{curElem.productdescription}</p>
                                        <p name="price">${curElem.productprice}</p>
                                        <p style={{"color":"green", "font-style":"sans-serif", "font-weight":"600"}}>In Stock</p>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ViewProducts;