import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../ComponentCSS/ProductArray.css";

const ProductArray = ({ productList })=>{

    const [itemCount, setItemCount] = useState(0)

    const navigate = useNavigate()
    const checkLogin = ()=>{
        if(localStorage.getItem("UserLogin")){
            navigate("/userdashboard")
        }
        else {
            navigate("/login")
        }
        
    }


    useEffect(()=>{
        setItemCount(0)
        localStorage.setItem("cartCount", JSON.stringify(itemCount))
    },[])
    return (
        <>
            <div className="card-container">
                {
                    productList.map((curElem)=>{
                        return (
                            <>
                                <div className="card" key={curElem.id}>
                                    <div className="card-left">
                                        <img src={curElem.productimage}/>
                                    </div>
                                    <div className="card-right">
                                        <h1>{curElem.productname}</h1>
                                        <div className="item-rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i><span>({Math.floor((Math.random()*10000)+1).toString()})</span>
                                        </div>
                                        <p>{curElem.productdescription}</p>
                                        <p name="price">${curElem.productprice}</p>
                                        <button type="button" onClick={()=>checkLogin()}>Add To Cart 👍</button>
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

export default ProductArray;
