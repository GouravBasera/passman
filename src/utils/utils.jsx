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
    const charGroups = [
        "qwertyuioplkjhgfdsazxcvbnm",
        "ASDFGHJKLPOIUYTREWQZXCVBNM",
        "0192834765",
        "!@~#$%&^*(){}"
    ];

    let guaranteedChars = charGroups.map(group => {
        return group[Math.floor(Math.random() * group.length)];
    });

    let remainingChars = [];
    for (let i = 4; i < len; i++) {
        const group = charGroups[Math.floor(Math.random() * 4)];
        const char = group[Math.floor(Math.random() * group.length)];
        remainingChars.push(char);
    }

    const allChars = guaranteedChars.concat(remainingChars);

    for (let i = allChars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allChars[i], allChars[j]] = [allChars[j], allChars[i]];
    }

    return allChars.join('');
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
const encryptionKey = "EncryptedVeryStrongly"

export const encryptPassword = (password, key) => {
    const encryptedPassword = CryptoJS.AES.encrypt(password, key).toString()
    return encryptedPassword
}

// Password Decryption using CryptoJs
export const decryptPassword = (password, key) => {
    const decryptedPassword = CryptoJS.AES.decrypt(password, key).toString(CryptoJS.enc.Utf8)
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

// Validate Encryption Key
export const isValidKey = (tempKey)=>{
    if(!JSON.parse(localStorage.getItem("passArr")) || JSON.parse(localStorage.getItem("passArr")).length == 0){
        return false
    } else {
        const allPasswords = JSON.parse(localStorage.getItem("passArr"))
        const firstPass = allPasswords[0][2]
        const decrypted = CryptoJS.AES.decrypt(firstPass, tempKey).toString(CryptoJS.enc.Utf8)
        if(decrypted == ""){
            return true
        } else {
            return false
        }
    }
}


export const passwordStrengthCalculator = (password) => {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber    = /[0-9]/.test(password);
    const hasSpecial   = /[!@#$%^&*()_+{}]/.test(password);

    let score = 0;

    if (hasLowercase) score += 0.25;
    if (hasUppercase) score += 0.25;
    if (hasNumber)    score += 0.25;
    if (hasSpecial)   score += 0.25;

    return score;
};
