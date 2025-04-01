import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

function header() {
  return (
    <>
    <div className="header w-full h-[10vh] flex">
        <div className="whiteLeftContainer h-full bg-[#fff] w-[40%] flex items-center justify-center"><strong>Logo - Our Motto</strong></div>
        <div className="blueRightContainer h-full w-[60%] bg-[#39ADFF] flex items-center">
            <div className="projectContainer w-[70%]">
            </div>
            <div className="loginContainer w-[30%] flex justify-center items-center gap-5">
                <p className='text-white'>Login / Signup</p>
                <div className="userIcon w-[40px] h-[40px] bg-white flex justify-center items-center rounded-[50%]"><FontAwesomeIcon icon={faUser}/></div>
            </div>
        </div>
    </div>
    </>
  )
}

export default header