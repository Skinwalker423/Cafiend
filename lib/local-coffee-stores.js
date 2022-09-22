// import { getUrlForFourSquare } from "./coffee-stores";


// export const getLocalCoffeeStores = async() => {
//     const options = {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             Authorization: process.env.FOURSQUARE_API
//         }
//     };

//     const res = await fetch('https://api.foursquare.com/v3/places/search?query=coffee&ll=33.9017728%2C-118.1253632&limit=6', options)
//     .then(response => response.json())
//     .catch(err => console.error('error from foursquare', err));

//     return res.results;
// }