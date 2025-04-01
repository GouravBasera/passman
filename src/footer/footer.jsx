import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

function footer() {
  return (
    <>
    <div className="header w-full h-[10vh] flex">
        <div className="whiteLeftContainer h-full bg-[#fff] w-[40%] text-2xl flex justify-around items-center">
          <button><FontAwesomeIcon icon={faPhone}/></button>
          <button><FontAwesomeIcon icon={faEnvelope}/></button>
          <button><FontAwesomeIcon icon={faGithub}/></button>
          <button><FontAwesomeIcon icon={faLinkedin}/></button>
          <button><FontAwesomeIcon icon={faXTwitter}/></button>
          <button><FontAwesomeIcon icon={faInstagram}/></button>
        </div>
        <div className="blueRightContainer h-full w-[60%] bg-[#39ADFF] flex justify-center items-center text-white">
          All rights reserved by a bunch of Developers
        </div>
    </div>
    </>
  )
}

export default footer