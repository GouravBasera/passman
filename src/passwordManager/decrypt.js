import CryptoJS from "crypto-js"

const decryptPassword = (password)=>{
    const decryptedPassword = CryptoJS.AES.decrypt(password, import.meta.env.VITE_SECRET_KEY).toString(CryptoJS.enc.Utf8)
    return decryptedPassword
}

export default decryptPassword