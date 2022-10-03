import { getCoffeeStores } from "../../lib/coffee-stores"

const getCoffeeStoresByLocation = async(req, res) => {

    try{
        const {latLong, limit} = req.query;

        const localCoffeeStores = await getCoffeeStores(latLong, limit);
        res.status(200);
        res.json(localCoffeeStores);

    }catch(err){
        res.status(500);
        res.json({error: 'something went wrong', err})
    }
    
    
}

export default getCoffeeStoresByLocation