
export const getUrlForFourSquare = (latlong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`
}


export const getCoffeeStores = async(latlong = '33.9017728%2C-118.1253632') => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API
        }
    };

    const res = await fetch(getUrlForFourSquare(latlong, 'coffee', '30'), options)
    .then(response => response.json())
    .catch(err => console.error('error from foursquare', err));

    return res.results;
}