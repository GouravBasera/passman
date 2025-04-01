import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faEye } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";

function login() {
  const [typeOfValidationInput, setTypeOfValidationInput] = useState({
    type: "number",
    text: "Phone Number",
  });

  const [isActive, setIsActive] = useState("phone")

  return (
    <>
      <div className="primaryContainer w-[100%] flex">
        <div className="imageContainer w-[40%] h-[80vh] bg-[#39ADFF]">
          {/* Add image to the left side */}
        </div>
        <div className="loginContainer w-[60%] h-[80vh] flex flex-col justify-evenly items-center">
          <div className="mainLogin w-[60%]">
            <div className="textContainer mb-[20px]">
              <p className="text-[40px]">
                <strong>Create an Account</strong>
              </p>
              <p className="text-[20px]">
                Already have an account <span className="loginText">Login</span>
              </p>
            </div>

            <div className="logoContainer flex justify-between w-[70%] my-[30px]">
              <div
                className={`phone rounded-[50%] w-[60px] h-[60px] text-2xl flex justify-center items-center border-2 border-dashed border-[#39ADFF] bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-[50%] hover:shadow-[4px_4px_0px_#39ADFF] active:translate-x-[0px] active:translate-y-[0px] active:rounded-[50%] active:shadow-none ${isActive === 'phone' ? "activeButton" : "" }`}
                onClick={() => {
                  setTypeOfValidationInput({
                    type: "number",
                    text: "Phone Number",
                  });
                  setIsActive('phone')
                }}
              >
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div
                className={`email rounded-[50%] w-[60px] h-[60px] text-2xl flex justify-center items-center border-2 border-dashed border-[#39ADFF] bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-[50%] hover:shadow-[4px_4px_0px_#39ADFF] active:translate-x-[0px] active:translate-y-[0px] active:rounded-[50%] active:shadow-none ${isActive === 'email' ? "activeButton" : "" }`}
                onClick={() => {
                  setTypeOfValidationInput({
                    type: "email",
                    text: "Enter Email",
                  });
                  setIsActive('email')
                }}
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className={`google rounded-[50%] w-[60px] h-[60px] text-2xl flex justify-center items-center border-2 border-dashed border-[#39ADFF] bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-[50%] hover:shadow-[4px_4px_0px_#39ADFF] active:translate-x-[0px] active:translate-y-[0px] active:rounded-[50%] active:shadow-none ${isActive === 'google' ? "activeButton" : "" }`} onClick={()=>{
                setIsActive('google')
              }}>
                <FontAwesomeIcon icon={faGoogle} />
              </div>
              <div className={`facebook rounded-[50%] w-[60px] h-[60px] text-2xl flex justify-center items-center border-2 border-dashed border-[#39ADFF] bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-[50%] hover:shadow-[4px_4px_0px_#39ADFF] active:translate-x-[0px] active:translate-y-[0px] active:rounded-[50%] active:shadow-none ${isActive === 'facebook' ? "activeButton" : "" }`} onClick={()=>{
                setIsActive('facebook')
              }}>
                <FontAwesomeIcon icon={faFacebookF} />
              </div>
            </div>

            <div className="userDetails flex flex-col gap-[4px]">
              <label htmlFor="phoneNumberOrEmail">
                {typeOfValidationInput.text}
              </label>
              <input
                type={typeOfValidationInput.type}
                id="phoneNumber"
                className="h-[40px] outline-1 rounded-xl pl-[10px] mb-[20px]"
              />
              <label htmlFor="loginUsername">Username</label>
              <input
                type="text"
                id="loginUsername"
                className="h-[40px] outline-1 rounded-xl pl-[10px]"
              />
            </div>
            <p className="text-center text-[14px] mt-[20px]">
              By signing up, you agree to our{" "}
              <strong>Terms and Conditions</strong> &{" "}
              <strong>Privacy Policy</strong>
            </p>
            <button className="text-white w-full h-[40px] rounded-xl bg-[#39ADFF] mt-[30px]">
              <strong>Get OTP</strong>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default login;
