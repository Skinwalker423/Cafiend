import { findRecordByFilter } from "../../lib/airtable";

const getCoffeeStoreById = async(req, res) => {

    const {method, query } = req;
    const {id} = query;
    console.log("checking Id:", id);

    try{

        if(!id){
            return res.status(400).json({message: 'no store id was found'})
        }

        const fields = await findRecordByFilter(id);
        console.log('this is find store', fields);
        
        if(fields.length > 0){

            console.log('fields check', fields);
            console.log('recid check',fields[0].RecordID);

            const votes = fields[0].votes + 1;
            const recId = fields[0].RecordID;

            return res.json(fields[0]);
        
        } else {
            return res.status(400).json({message: 'no record found'})
        }
    
    }catch(err){
        console.log(err);
        return res.status(500).json({errorMsg: "Error finding a store", err})
    }

}

export default getCoffeeStoreById;