import React from "react";
import "../ComponentCSS/AboutCSS.css";

const AboutUs = ()=>{
    return (
        <>
            <div className="container">
                <div className="page-heading">
                    <h1>ABOUT US</h1>
                </div>
                <div className="main-sec">
                    <div className="sub-heading">
                        <h1>Who We Are ?</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <div className="aboutus-image">
                        <div className="image">
                            <img src="./Images/Girl-Reading-Book.jpg" alt="image"/>
                        </div>
                        <div className="blank-div"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs;