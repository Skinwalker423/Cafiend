import { findRecordByFilter } from "../../lib/airtable";

const getCoffeeStoreById = async(req, res) => {

    const {method, query } = req;
    const {id} = query;

    try{

        if(!id){
            return res.status(400).json({message: 'no store id was found'})
        }

        const fields = await findRecordByFilter(id);
        
        if(fields.length > 0){

            const votes = fields[0].votes + 1;
            const recId = fields[0].RecordID;

            return res.json(fields[0]);
        
        } else {
            return res.status(400).json({message: 'no record found'})
        }
    
    }catch(err){
        return res.status(500).json({errorMsg: "Error finding a store", err})
    }

}

export default getCoffeeStoreById;