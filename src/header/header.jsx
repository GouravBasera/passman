import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useState } from 'react';

function header() {

  const [userLogin, setUserLogin] = useState("Logout")

  return (
    <>
    <div className="header w-full h-[10vh] flex">
        <div className="whiteLeftContainer h-full bg-[#fff] w-[40%] flex items-center pl-[40px]"><strong></strong></div>
        <div className="blueRightContainer h-full w-[60%] bg-[#39ADFF] flex items-center">
            <div className="projectContainer w-[70%]">
            </div>
            <div className="loginContainer w-[30%] flex justify-center items-center gap-5">
                <p className='text-white'>{userLogin}</p>
                <div className="userIcon w-[40px] h-[40px] bg-white flex justify-center items-center rounded-[50%]"><FontAwesomeIcon icon={faUser}/></div>
            </div>
        </div>
    </div>
    </>
  )
}

export default header