import CryptoJS from "crypto-js"
const encryptionKey = import.meta.env.VITE_SECRET_KEY

const encryptPassword = (password)=>{
    const encryptedPassword = CryptoJS.AES.encrypt(password, encryptionKey).toString()
    return encryptedPassword
}

export default encryptPassword