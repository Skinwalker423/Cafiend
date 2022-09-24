
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

    return res.results.map(({location, fsq_id, name}) => {
        return {
            fsq_id,
            address: location.address,
            neighborhood: location.neighborhood ? location.neighborhood[0] : 'nowhere',
            name,
            imageUrl: "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
        }
    })
}