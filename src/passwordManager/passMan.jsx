import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faEye,
  faEyeSlash,
  faHeart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import decryptPassword from "./decrypt";
import { handleCopyPassword } from "../utils/utils";
import NetflixLogo from "../assets/NetflixLogo.webp";

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
    return () =>
      window.removeEventListener("passwordUpdated", handlePasswordUpdate);
  }, []);

  const [currPass, setCurrPass] = useState("********");
  const [iconVisibility, setIconVisibility] = useState(faEye);
  const [visibilityPass, setVisibilityPass] = useState(false);

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
                <p className="mr-2 w-[80%] passwordContainer">{currPass}</p>
                <span className="cursor-pointer text-gray-600">
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={() => {
                      handleCopyPassword(decryptPassword(data[2]));
                    }}
                  />
                </span>
                <span className="pl-2">
                  <FontAwesomeIcon
                    icon={iconVisibility}
                    onClick={() => {
                      setVisibilityPass((prev) => {
                        const newState = !prev;
                        if (newState) {
                          setCurrPass(decryptPassword(data[2]));
                          setIconVisibility(faEyeSlash);
                        } else {
                          setCurrPass("********");
                          setIconVisibility(faEye);
                        }
                        return newState;
                      });
                    }}
                  />
                </span>
              </div>
            </div>
            <div className="saveCopyShowButtons w-[20%]">
              <button>
                <FontAwesomeIcon icon={faHeart} />
              </button>
              <br />
              <button onClick={()=>{
                
              }}>
                <FontAwesomeIcon icon={faTrash} onClick={()=>{
                  const getPasswords = JSON.parse(localStorage.getItem("passArr"))
                  const newUpdatedPassword = getPasswords.filter((password)=>{
                    if(password[2] != data[2]){
                      return password
                    }
                  })
                  localStorage.setItem("passArr", JSON.stringify(newUpdatedPassword))
                  setPasswords(newUpdatedPassword)
                }}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PassMan;