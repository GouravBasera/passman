import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';

function login() {
  return (
    <>
    <div className="primaryContainer w-[100%] flex">
        <div className="imageContainer w-[40%] h-[100vh] bg-[#39ADFF]"></div>
        <div className="loginContainer w-[60%] h-[100vh] flex flex-col justify-evenly items-center bg-amber-500 gap-[130px]">
            <div className="mainLogin w-[60%]">
            <div className="textContainer">
            <p className='text-[48px]'><strong>Create an Account</strong></p>
            <p className='text-[20px]'>Already have an account <span className='loginText'>Login</span></p>
            </div>

            <div className="logoContainer flex justify-evenly">
                <div className="phone rounded-[50%] w-[60px] h-[60px] flex justify-center items-center bg-[#000] text-center text-3xl text-white">
                    <FontAwesomeIcon icon={faPhone}/>
                </div>
                <div className="email rounded-[50%] w-[60px] h-[60px] flex justify-center items-center bg-[#000] text-center text-3xl text-white">
                    <FontAwesomeIcon icon={faEnvelope}/>
                </div>
                <div className="google rounded-[50%] w-[60px] h-[60px] flex justify-center items-center bg-[#000] text-center text-3xl text-white">
                    <FontAwesomeIcon icon={faGoogle}/>
                </div>
                <div className="facebook rounded-[50%] w-[60px] h-[60px] flex justify-center items-center bg-[#000] text-center text-3xl text-white">
                    <FontAwesomeIcon icon={faFacebookF}/>
                </div>
            </div>

            <div className="userDetails flex flex-col">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="text" placeholder='Enter Phone Number' id='phoneNumber' />
                <label htmlFor="phoneNumber">Username</label>
                <input type="text" placeholder='Choose a Username' id='username' />
            </div>
            <p>By signing up, you agree to our <strong>Terms and Conditions</strong> & <strong>Privacy Policy</strong></p>
            <button className='text-white'><strong>Get OTP</strong></button>
            </div>
        </div>
    </div>
    </>
  )
}

export default login