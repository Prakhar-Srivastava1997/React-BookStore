import React, { useEffect, useState } from "react";
import "../ComponentCSS/ProductArray.css";

const ProductArrayFilter = ({ productList, valueSend })=>{

    const [filteredArray, setFilteredArray] = useState([]);
    
    useEffect(()=>{
        console.log(valueSend);
        const resultArr = productList.filter((res)=>{
            return res.productname.toLowerCase() === valueSend.toLowerCase() || res.productcategory.toLowerCase() === valueSend.toLowerCase()
        })

        setFilteredArray(resultArr);

    }, {valueSend})
    return (
        <>
            <div className="card-container">
                {
                    filteredArray.map((curElem)=>{
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
                                        <button type="button">Add To Cart 👍</button>
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

export default ProductArrayFilter;