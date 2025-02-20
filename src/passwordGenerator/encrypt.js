import CryptoJS from "crypto-js"

const encryptPassword = (password)=>{
    const encryptedPassword = CryptoJS.AES.encrypt(password, import.meta.env.VITE_SECRET_KEY).toString()
    return encryptedPassword
}

export default encryptPassword