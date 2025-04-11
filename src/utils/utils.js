import CryptoJS from "crypto-js"

// Copy Password
export function handleCopyPassword(dataField) {
    navigator.clipboard.writeText(dataField)
}

// Save Password
export function savePassword(passArr, applicationName, userName, password, isFavourite = false) {
    passArr.push([applicationName, userName, password, isFavourite]);
    localStorage.setItem("passArr", JSON.stringify(passArr));
    window.dispatchEvent(new Event("passwordUpdated"));
}

// Generate Password
export function generatePassword(len) {
    let passwordString = '3z5SLrgP7128eApE~IQafMXiYsKxo$l!wnJ@Oq6GTmvuC*FNDVH%B^9Zkty5j#URh0d4c&bW'
    let generatedPasswordString = ''
    for (let i = 0; i < len; i++) {
        generatedPasswordString += passwordString[Math.floor(Math.random() * passwordString
            .length)]
    } return generatedPasswordString
}

// Get brand logo using BrandFetch API
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


// Password Encryption using CryptoJs
const encryptionKey = prompt("Please Enter your Encryption Key")

export const encryptPassword = (password) => {
    const encryptedPassword = CryptoJS.AES.encrypt(password, encryptionKey).toString()
    return encryptedPassword
}

// Password Decryption using CryptoJs
export const decryptPassword = (password) => {
    const decryptedPassword = CryptoJS.AES.decrypt(password, encryptionKey).toString(CryptoJS.enc.Utf8)
    return decryptedPassword
}

// Search Password using Username 0 PlatName | 1 Username | 2 Password | 3 isSaved
export const searchPasswordUsername = (crieteria) => {
    const allPasswords = JSON.parse(localStorage.getItem('passArr'))
    const tempPassArr = allPasswords.filter((password) => {
        if (password[1].toLowerCase() == crieteria.toLowerCase()) {
            return password
        }
    })
    localStorage.setItem('tempPassArr', JSON.stringify(tempPassArr))

}

// Search Password using Website
export const searchPasswordWebsite = (crieteria) => {
    const allPasswords = JSON.parse(localStorage.getItem('passArr'))
    const tempPassArr = allPasswords.filter((password) => {
        if (password[0].toLowerCase() == crieteria.toLowerCase()) {
            return password
        }
    })
    localStorage.setItem('tempPassArr', JSON.stringify(tempPassArr))

}

// Sort Passwords alphabetically based on Username
export const sortByUsername = (crieteria)=>{
    const passwords = JSON.parse(localStorage.getItem('passArr'))
    if(crieteria == "ascUser"){
        const sortedPass = passwords.sort((a, b)=> a[1].localeCompare(b[1]))
        const tempPassArr = sortedPass.map((pass)=>pass)
        localStorage.setItem('tempPassArr', JSON.stringify(tempPassArr))
    } else if(crieteria == "descUser"){
        const sortedPass = passwords.sort((a, b)=> b[1].localeCompare(a[1]))
        const tempPassArr = sortedPass.map((pass)=>pass)
        localStorage.setItem('tempPassArr', JSON.stringify(tempPassArr))
    }
}

// Sort Passwords alphabetically based on Website
export const sortByWebsite = (crieteria)=>{
    const passwords = JSON.parse(localStorage.getItem('passArr'))
    if(crieteria == "ascWeb"){
        const sortedPass = passwords.sort((a, b)=> a[0].localeCompare(b[0]))
        const tempPassArr = sortedPass.map((pass)=>pass)
        localStorage.setItem('tempPassArr', JSON.stringify(tempPassArr))
    } else if(crieteria == "descWeb"){
        const sortedPass = passwords.sort((a, b)=> b[0].localeCompare(a[0]))
        const tempPassArr = sortedPass.map((pass)=>pass)
        localStorage.setItem('tempPassArr', JSON.stringify(tempPassArr))   
    }
}