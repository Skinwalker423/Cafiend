import { getUrlForFourSquare } from "./coffee-stores";


export const getLocalCoffeeStores = async({latlong}) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.FOURSQUARE_API
        }
    };

    const res = await fetch(getUrlForFourSquare(latlong, 'coffee', '6'), options)
    .then(response => response.json())
    .catch(err => console.error('error from foursquare', err));

    return res.results;
}