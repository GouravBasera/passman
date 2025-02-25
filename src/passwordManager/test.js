import CryptoJS from "crypto-js";

const decryptPassword = ()=>{
    const decryptedPassword = CryptoJS.AES.decrypt("U2FsdGVkX1/ehfOL1XIW8XI0sCiMlajM+2cB5MhzCTo="
, "THISSECRETPHRASEISSOSECRETTHATITISASECRETINITESELF").toString(CryptoJS.enc.Utf8)
    return decryptedPassword
}

console.log(decryptPassword())