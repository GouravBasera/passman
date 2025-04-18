import React, { useContext, useState, useEffect } from "react";
import { getBrandLogo } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import {
  handleCopyPassword,
  generatePassword,
  savePassword,
  passwordStrengthCalculator,
} from "../utils/utils";
import { encryptPassword } from "../utils/utils";
import KeyContext from "../context/KeyContext";

function PassGen() {
  const { key } = useContext(KeyContext);

  const [copyPassword, setCopyPassword] = useState("No Selected Password");
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [username, setUsername] = useState("");
  const [platformName, setPlatformName] = useState("");
  const [passwordStrengthScore, setPasswordStrengthScore] = useState(0);

  const passArr = JSON.parse(localStorage.getItem("passArr")) || [];

  useEffect(() => {
    setPasswordStrengthScore(passwordStrengthCalculator(password));
  }, [password]);

  return (
    <div className="mainContainer w-[60vw] h-full">
      <div className="holderContainer h-full flex flex-col items-center justify-center">
        <div className="userInputFields w-[60%] flex flex-col gap-[4px]">
          <p className="text-[48px] font-bold">Generate Password</p>
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
            className="inputField h-10"
          />

          <label htmlFor="passwordField">Get your Password Here</label>
          <div className="relative w-full">
            <input
              type="text"
              id="passwordField"
              value={password}
              onChange={(e) => {
                setPasswordStrengthScore(passwordStrengthCalculator(password));
                if (e.target.value == "") {
                  setPasswordStrengthScore(0);
                }
                setPassword(e.target.value);
              }}
              className="p-2 rounded w-full pr-10"
            />
            <p
              className="copyPasswordInput absolute right-[3%] top-[40%] transform -translate-y-1/2 cursor-pointer text-gray-600"
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

        <div className="passwordStrength w-[60%] flex flex-col mb-[20px] gap-2">
          <progress
            value={passwordStrengthScore}
            id="passwordStrengthBar"
            max={1}
            className="w-full h-[10px] bg-amber-600"
          />
          <label htmlFor="passwordStrengthBar">
            Password Strength:{" "}
            {passwordStrengthCalculator(password) > 0.75
              ? "Strong"
              : passwordStrengthCalculator(password) > 0.5
              ? "Medium"
              : "Weak"}
          </label>
        </div>

        <div className="buttonField flex gap-4 w-[60%]">
          <button
            className="generatePassword w-[50%] h-[50px] rounded-xl text-[16px] flex justify-center items-center border-2 border-[#39ADFF] bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-xl hover:shadow-[4px_4px_0px_#39ADFF] active:translate-x-[0px] active:translate-y-[0px] active:rounded-xl active:shadow-none"
            onClick={() => setPassword(generatePassword(passwordLength))}
          >
            Generate
          </button>
          <button
            className="savePassword w-[50%] h-[50px] text-[16px] rounded-xl flex justify-center items-center border-2 border-[#39ADFF] bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-xl hover:shadow-[4px_4px_0px_#39ADFF] active:translate-x-[0px] active:translate-y-[0px] active:rounded-xl active:shadow-none"
            onClick={async () => {
              const encryptedPassword = encryptPassword(password, key);
              if (!platformName || !username || !encryptedPassword) {
                alert("All Fields are Required");
              } else {
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
                setPassword("");
                setUsername("");
                setPlatformName("");
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default PassGen;
