const passwordData = (()=>{
  const passwords = JSON.parse(localStorage.getItem('passArr'))
  return passwords ?? []
})()

export const platformsData =  passwordData.map((password)=>{
  return {
    platformName: password[0],
    userName: password[1],
    password: password[2],
    isFavourite: password[3]
  }
})