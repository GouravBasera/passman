import React, { useState } from "react";
import getBrandLogo from "../utils/getBrandLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import {
  handleCopyPassword,
  generatePassword,
  savePassword,
} from "../utils/utils";
import encryptPassword from "./encrypt";

function PassGen() {
  const [copyPassword, setCopyPassword] = useState("No Selected Password");
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [username, setUsername] = useState("");
  const [platformName, setPlatformName] = useState("");

  const passArr = JSON.parse(localStorage.getItem("passArr")) || [];

  return (
    <div className="mainContainer w-[40vw]">
      <div className="userInputFields inline-flex flex-col">
        <label htmlFor="platformName">Enter the Application Name</label>
        <input
          id="platformName"
          type="text"
          placeholder="Enter platform name"
          value={platformName}
          onChange={(e) => setPlatformName(e.target.value)}
          className="inputField"
        />

        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="inputField"
        />

        <label htmlFor="passwordField">Get your Password Here</label>
        <div className="relative w-full">
          <input
            type="text"
            id="passwordField"
            readOnly
            value={password}
            className="p-2 rounded w-full pr-10"
          />
          <p
            className="copyPasswordInput absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => {
              const copyPassword =
                document.getElementById("passwordField").value;
              setCopyPassword(copyPassword);
              handleCopyPassword(copyPassword);
              alert("Password Copied");
            }}
          >
            <FontAwesomeIcon icon={faCopy} />
          </p>
        </div>
        <div className="passwordLengthContainer flex flex-col">
          <label htmlFor="passwordLength">
            Select Password Length: {passwordLength}
          </label>
          <input
            type="range"
            name="passwordLength"
            id="passwordLength"
            defaultValue={passwordLength}
            min="0"
            max="30"
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </div>
      </div>

      <div className="buttonField flex gap-4 mt-4">
        <button
          className="generatePassword px-6 py-2 bg-red-400 rounded-xl"
          onClick={() => setPassword(generatePassword(passwordLength))}
        >
          Generate
        </button>
        <button
          className="savePassword px-6 py-2 bg-red-400 rounded-xl"
          onClick={async () => {
            const encryptedPassword = encryptPassword(password);
            try {
              const logos = await getBrandLogo(platformName);
              const imageUrl = logos[0]?.icon || "";
              savePassword(
                passArr,
                platformName,
                username,
                encryptedPassword,
                imageUrl,
                false
              );
            } catch (error) {
              console.error("Error fetching brand logo:", error);
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default PassGen;
