import CryptoJS from "crypto-js"

// Copy Password
export function handleCopyPassword(dataField){
    navigator.clipboard.writeText(dataField)
}

// Save Password
export function savePassword(passArr, applicationName, userName, password, isFavourite = false) {
    passArr.push([applicationName, userName, password, isFavourite]);
    localStorage.setItem("passArr", JSON.stringify(passArr));
    window.dispatchEvent(new Event("passwordUpdated"));
}

// Generate Password
export function generatePassword(len){
    let passwordString = '3z5SLrgP7128eApE~IQafMXiYsKxo$l!wnJ@Oq6GTmvuC*FNDVH%B^9Zkty5j#URh0d4c&bW'
    let generatedPasswordString = ''
    for(let i = 0; i<len; i++){
        generatedPasswordString += passwordString[Math.round(Math.random()*passwordString
        .length)]
    } return generatedPasswordString
}

// Delete Password
export function deleteIndividualPassword(){}

// Delete All Passwords 
export function deleteAllPasswords(){}

export const getBrandLogo = async (platformName) => {
    const response = await fetch(`https://api.brandfetch.io/v2/search/${platformName}?c=${import.meta.env.BRANDFETCH_CLIENT_ID}`, {
    method: "GET",
    headers: {
        "Accept": "application/json"
    }
})

const data = await response.json()
return data
}

const encryptionKey = import.meta.env.VITE_SECRET_KEY

export const encryptPassword = (password)=>{
    const encryptedPassword = CryptoJS.AES.encrypt(password, encryptionKey).toString()
    return encryptedPassword
}

export const decryptPassword = (password)=>{
    const decryptedPassword = CryptoJS.AES.decrypt(password, import.meta.env.VITE_SECRET_KEY).toString(CryptoJS.enc.Utf8)
    return decryptedPassword
}