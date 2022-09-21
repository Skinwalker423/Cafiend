
export const getUrlForFourSquare = (latlong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`
}


export const getCoffeeStores = async() => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.FOURSQUARE_API
        }
    };

    const res = await fetch(getUrlForFourSquare('43.650271%2C-79.388563', 'coffee', '6'), options)
    .then(response => response.json())
    .catch(err => console.error('error from foursquare', err));

    return res.results;
}