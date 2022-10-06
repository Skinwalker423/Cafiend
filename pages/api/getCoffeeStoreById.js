import { findRecordByFilter } from "../../lib/airtable";

const getCoffeeStoreById = async(req, res) => {

    const {method, query } = req;
    const {id} = query;
    console.log(id);

    try{

        if(!id){
            return res.status(400).json({message: 'id missing'})
        }

        const fields = await findRecordByFilter(id);
        
        if(fields.length !== 0){
            return res.json(fields[0]);
        } else {
            return res.json({message: 'no record in findRecordByFilter'})
        }
    
    }catch(err){
        return res.status(500).json({errorMsg: "Error finding a store", err})
    }

}

export default getCoffeeStoreById;