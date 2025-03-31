const getBrandLogo = async (platformName) => {
    const response = await fetch(`https://api.brandfetch.io/v2/search/${platformName}?c=${import.meta.env.BRANDFETCH_CLIENT_ID}`, {
    method: "GET",
    headers: {
        "Accept": "application/json"
    }
})

const data = await response.json()
return data
}

export default getBrandLogo