import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faEye, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import decryptPassword from './decrypt'
import {changePasswordVisibility, handleCopyPassword} from '../utils/utils'
import NetflixLogo from '../assets/NetflixLogo.webp'

function PassMan() {
  const [passwords, setPasswords] = useState([]);
  const fetchPasswords = () => {
    const storedPasswords = JSON.parse(localStorage.getItem("passArr")) || [];
    setPasswords(storedPasswords);
  };

  useEffect(() => {
    fetchPasswords();

    const handlePasswordUpdate = () => fetchPasswords();

    window.addEventListener("passwordUpdated", handlePasswordUpdate);
    return () => window.removeEventListener("passwordUpdated", handlePasswordUpdate);
  }, []);

  return (
    <div className="managerContainer w-[30vw]">
      <div className="buttonContainer flex">
        <input
          type="text"
          className="outline pl-2.5 h-[40px] rounded-2xl mb-[10px] w-full text-center"
          placeholder="Search Password"
        />
      </div>
      <div className="passContainer">
        {passwords.map((data, index) => (
          <div
            key={index}
            className="individualContainer border rounded-2xl mb-2.5 flex gap-2.5 p-2 items-center"
          >
            <div className="iconContainer w-[20%]">
              <img src={NetflixLogo} alt={data[0]} className="h-10" />
            </div>
            <div className="savedPassDetails w-[60%]">
              <p>{data[1]}</p>
              <div className="relative w-full flex items-center">
                <p className="mr-2 passwordContainer">{"********"}</p>
                <span className="cursor-pointer text-gray-600">
                  <FontAwesomeIcon icon={faCopy} onClick={()=>{handleCopyPassword(decryptPassword(data[2]))}}/>
                </span>
                <span className="pl-2"><FontAwesomeIcon icon={faEye} onClick={()=>{
                  console.log(`clicked ${data[1]}`)
                }}></FontAwesomeIcon></span>
              </div>
            </div>
            <div className="saveCopyShowButtons w-[20%]">
              <button>
                <FontAwesomeIcon icon={faHeart} />
              </button>
              <br />
              <button>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PassMan;