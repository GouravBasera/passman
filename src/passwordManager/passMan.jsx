import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faFloppyDisk,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { platformsData } from "./data/platformData";

function PassMan() {

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
        {platformsData.map((data, index) => (
          <div
            key={index}
            className="individualContainer border rounded-2xl mb-2.5 flex gap-2.5 p-2 items-center"
          >
            <div className="iconContainer w-[20%]">
              <img
                src={data.imageUrl}
                alt={data.platformName}
                className="h-10"
              />
            </div>
            <div className="savedPassDetails w-[60%]">
              <p>{data.userName}</p>
              <div className="relative w-full flex items-center">
                <p className="mr-2">{data.password}</p>
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
                <FontAwesomeIcon icon={faFloppyDisk} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PassMan;
