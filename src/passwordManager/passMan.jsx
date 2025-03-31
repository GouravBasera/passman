import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faEye,
  faEyeSlash,
  faHeart as faHeartFilled,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { decryptPassword } from "../utils/utils";
import { handleCopyPassword } from "../utils/utils";

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

  const [visiblePasswords, setVisiblePasswords] = useState({});

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
              <img src={data[3]} alt={data[0]} className="h-10" />
            </div>
            <div className="savedPassDetails w-[60%]">
              <p>{data[1]}</p>
              <div className="relative w-full flex items-center">
                <p className="mr-2 w-[80%] passwordContainer">  {visiblePasswords[data[2]] ? decryptPassword(data[2]) : "********"}</p>
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
  icon={visiblePasswords[data[2]] ? faEyeSlash : faEye}
  onClick={() => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [data[2]]: !prev[data[2]],
    }));
  }}
/>
                </span>
              </div>
            </div>
            <div className="saveCopyShowButtons w-[20%]">
              <button onClick={()=>{
                const updatedPasswords = passwords.map((password)=>{
                  if(password[2] == data[2]){
                    data[4] = !data[4]
                  }
                  return password
                })
                localStorage.setItem('passArr', JSON.stringify(updatedPasswords))
                setPasswords(updatedPasswords)
              }}>
                <FontAwesomeIcon icon={data[4] ? faHeartFilled : faHeart} />
              </button>
              <br />
              <button onClick={()=>{
                  const getPasswords = JSON.parse(localStorage.getItem("passArr"))
                  const newUpdatedPassword = getPasswords.filter((password)=>{
                    if(password[2] != data[2]){
                      return password
                    }
                  })
                  localStorage.setItem("passArr", JSON.stringify(newUpdatedPassword))
                  setPasswords(newUpdatedPassword)
                }}>
                <FontAwesomeIcon icon={faTrash}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PassMan;