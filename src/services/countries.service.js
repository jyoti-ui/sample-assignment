export const fetchCountries = async() => {
    let countries = await fetch('http://worldtimeapi.org/api/timezone')
    countries = await countries.json()
    return countries
}

export const fetchCountryTime = async({area, location, region}) => {
    let countries = await fetch(`http://worldtimeapi.org/api/timezone/${area}/${location}/${region}`)
    countries = await countries.json()
    return countries
}