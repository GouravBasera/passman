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
import {
  handleCopyPassword,
  decryptPassword,
  searchPasswordUsername,
  searchPasswordWebsite,
  sortByUsername,
  sortByWebsite,
} from "../utils/utils";

function PassMan() {
  // State definition
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [searchCrieteria, setSearchCrieteria] = useState("Search by Username");
  const [passwords, setPasswords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isUsernameEnabled, setIsUsernameEnabled] = useState(true);

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

  return (
    <div className="managerContainer w-[40%] flex flex-col bg-[#39ADFF] justify-center items-center">
      <div className="buttonContainer w-[80%] mb-[20px] flex gap-5 focus:outline-none">
        <input
          type="text"
          className="h-[40px] shadow-xl bg-[#EFEFEF] rounded-2xl mb-[10px] w-[80%] py-[25px] focus:outline-none text-left pl-[30px]"
          placeholder={searchCrieteria}
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
        />
        <button
          className="w-[20%] h-[40px] py-[25px] text-[16px] rounded-2xl flex justify-center items-center border-2 border-[#fff] bg-[#39ADFF] px-6 font-semibold uppercase text-white transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-2xl hover:shadow-[4px_4px_0px_#fff] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
          onClick={() => {
            if (!searchValue) {
              alert("Abe Laude kuch daal to search box me");
            } else {
              if (isUsernameEnabled == true) {
                searchPasswordUsername(searchValue);
              } else {
                searchPasswordWebsite(searchValue);
              }
            }
            setPasswords(JSON.parse(localStorage.getItem("tempPassArr")));
          }}
        >
          Search
        </button>
      </div>
      <div className="filtersContainer flex gap-2.5 mb-[20px] w-[80%] justify-end">
        <select
          name="searchPasswords"
          id="searchPasswords"
          className=" text-white rounded-2xl focus:outline-none flex justify-center pl-[10px]"
          onChange={() => {
            setIsUsernameEnabled((prevState) => !prevState);
            if (isUsernameEnabled) {
              setSearchCrieteria("Search by Website");
            } else {
              setSearchCrieteria("Search by Username");
            }
          }}
        >
          <option value="byUser" className="text-[#000]">
            Username
          </option>
          <option value="byWeb" className="text-[#000]">
            Website
          </option>
        </select>
        <select
          name="filters"
          id="filterPasswords"
          className="rounded-2xl text-white focus:outline-none flex justify-center pl-[10px]"
          onChange={(e) => {
            const targetVal = e.target.value;
            if (targetVal == "ascUser") {
              sortByUsername(targetVal);
            } else if (targetVal == "descUser") {
              sortByUsername(targetVal);
            } else if (targetVal == "ascWeb") {
              sortByWebsite(targetVal);
            } else if (targetVal == "descWeb") {
              sortByWebsite(targetVal);
            }

            setPasswords(JSON.parse(localStorage.getItem("tempPassArr")));
          }}
        >
          <option value="ascUser" className="text-[#000]">
            Ascending Username
          </option>
          <option value="descUser" className="text-[#000]">
            Descending Username
          </option>
          <option value="ascWeb" className="text-[#000]">
            Ascending Website
          </option>
          <option value="descWeb" className="text-[#000]">
            Descending Website
          </option>
        </select>
        <button
          className="rounded-2xl flex justify-center items-center border-2 border-[#fff] bg-[#39ADFF] px-6 font-semibold uppercase text-white transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-2xl hover:shadow-[4px_4px_0px_#fff] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
          onClick={() => {
            setPasswords(JSON.parse(localStorage.getItem("passArr")));
          }}
        >
          Clear
        </button>
      </div>
      <div className="passContainer w-[80%] p-[30px] rounded-2xl shadow-xl h-[60%] bg-[#EFEFEF] overflow-scroll">
        {passwords.map((data, index) => {
          const [alt, username, encryptedPass, imgSrc, isFavorite] = data;

          return (
            <div
              key={index}
              className="individualContainer bg-[#fff] rounded-2xl shadow-xl h-[64px] mb-[30px] flex items-center"
            >
              <div className="iconContainer w-[20%] pl-[20px]">
                <img src={imgSrc} alt={alt} className="h-10" />
              </div>
              <div className="savedPassDetails pl-[5%] w-[60%]">
                <p>{username}</p>
                <div className="relative w-full flex items-center">
                  <p className="w-[70%] passwordContainer">
                    {visiblePasswords[encryptedPass]
                      ? decryptPassword(encryptedPass)
                      : "********"}
                  </p>
                  <span className="cursor-pointer text-gray-600">
                    <FontAwesomeIcon
                      icon={faCopy}
                      onClick={() => {
                        handleCopyPassword(decryptPassword(encryptedPass));
                      }}
                    />
                  </span>
                  <span className="pl-2">
                    <FontAwesomeIcon
                      icon={
                        visiblePasswords[encryptedPass] ? faEyeSlash : faEye
                      }
                      onClick={() => {
                        setVisiblePasswords((prev) => ({
                          ...prev,
                          [encryptedPass]: !prev[encryptedPass],
                        }));
                      }}
                    />
                  </span>
                </div>
              </div>
              <div className="saveCopyShowButtons">
                <button
                  onClick={() => {
                    const updatedPasswords = passwords.map((password) => {
                      if (password[2] == encryptedPass) {
                        password[4] = !password[4];
                      }
                      return password;
                    });
                    localStorage.setItem(
                      "passArr",
                      JSON.stringify(updatedPasswords)
                    );
                    setPasswords(updatedPasswords);
                  }}
                >
                  <FontAwesomeIcon
                    icon={isFavorite ? faHeartFilled : faHeart}
                  />
                </button>
                <br />
                <button
                  onClick={() => {
                    const getPasswords = JSON.parse(
                      localStorage.getItem("passArr")
                    );
                    const newUpdatedPassword = getPasswords.filter(
                      (password) => {
                        if (password[2] != encryptedPass) {
                          return password;
                        }
                      }
                    );
                    localStorage.setItem(
                      "passArr",
                      JSON.stringify(newUpdatedPassword)
                    );
                    setPasswords(newUpdatedPassword);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PassMan;
