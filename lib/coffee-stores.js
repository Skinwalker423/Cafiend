
export const getUrlForFourSquare = (latlong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`
}


export const getCoffeeStores = async(latlong = '43.650271,-79.388563') => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API
        }
    };

    const res = await fetch(getUrlForFourSquare(latlong, 'coffee', '6'), options)
    .then(response => response.json())
    .catch(err => console.error('error from foursquare', err));

    return res.results;
}