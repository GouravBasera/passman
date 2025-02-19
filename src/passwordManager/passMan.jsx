import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { platformsData } from "./data/platformData";
import { useState, useEffect } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function PassMan() {

  const [passwords, setPasswords] = useState([])
  
  useEffect(() => {
    const fetchPasswords = () => {
      const storedPasswords = JSON.parse(localStorage.getItem("passArr")) || [];
      setPasswords(storedPasswords);
    };
    
    fetchPasswords();

    const intervalId = setInterval(fetchPasswords, 1000);
    console.log(passwords)
    return () => clearInterval(intervalId);
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
              <img
                src={data.imageUrl}
                alt={data[1]}
                className="h-10"
              />
            </div>
            <div className="savedPassDetails w-[60%]">
              <p>{data[1]}</p>
              <div className="relative w-full flex items-center">
                <p className="mr-2">{data[2]}</p>
                <span className="cursor-pointer text-gray-600">
                  <FontAwesomeIcon icon={faCopy} />
                </span>
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
