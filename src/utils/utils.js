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