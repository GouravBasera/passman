import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { handleCopyPassword, generatePassword, savePassword } from "../utils/utils";

function PassGen() {
  const [copyPassword, setCopyPassword] = useState("No Selected Password");
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);

  // Ensure passArr is initialized properly
  const passArr = JSON.parse(localStorage.getItem("passArr")) || [];

  return (
    <div className="mainContainer w-[40vw]">
      <div className="userInputFields inline-flex flex-col">
        <label htmlFor="platformName">Enter the Application Name</label>
        <input type="text" id="platformName" className="p-2 rounded" />

        <label htmlFor="username">Username</label>
        <input type="text" id="username" className="p-2 rounded" />

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
          onClick={() => {
            const userVal = document.getElementById("username").value;
            const applicationVal = document.getElementById("platformName").value;
            savePassword(passArr, applicationVal, userVal, password);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default PassGen;