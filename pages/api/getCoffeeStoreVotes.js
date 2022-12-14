import { table, findRecordByFilter } from "../../lib/airtable";

const getCoffeeStoreVotes = async(req, res) => {

    const {method} = req;
    const {id} = req.body;

    try{
        if(method === 'PUT'){
            if(!id){
                return res.status(400).json({message: 'no store id and recId were found'})
            }

            const fields = await findRecordByFilter(id);

            const votes = fields[0].votes + 1;
            const recId = fields[0].RecordID;

            const updatedStore = await table.update(recId, {
                "votes": votes,
            })

            if(!updatedStore){
                return res.status(400).json({message: 'problem updating the record'})
            }
        
            const updatedVotes = updatedStore.fields.votes;

            return res.json(updatedVotes);
        }
    }catch(err){
        return res.status(500).json({errorMsg: "Error finding a store", err})
    }



    return res.json({message: "couldn't find your request"})

}

export default getCoffeeStoreVotes;