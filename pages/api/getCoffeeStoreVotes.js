import { table, findRecordByFilter, getMinifiedRecords } from "../../lib/airtable";

const getCoffeeStoreVotes = async(req, res) => {

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

            console.log('mapping for recId:', recId);

            const updatedStore = await table.update(recId, {
                "votes": votes,
            
            })

            if(!updatedStore){
                return res.status(400).json({message: 'problem updating the record'})
            }
            
            console.log('updating record:', updatedStore.fields.votes);

            const updatedVotes = updatedStore.fields.votes;

            res.json(updatedVotes);
        
        } else {
            return res.status(400).json({message: 'no record found'})
        }
    
    }catch(err){
        console.log(err);
        return res.status(500).json({errorMsg: "Error finding a store", err})
    }

    return res.json({message: "couldn't find your request"})

}

export default getCoffeeStoreVotes;