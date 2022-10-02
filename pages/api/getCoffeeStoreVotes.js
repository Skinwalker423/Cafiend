import { table, findRecordByFilter, getMinifiedRecords } from "../../lib/airtable";

const getCoffeeStoreVotes = async(req, res) => {

    const {method, query } = req;
    const {id, recId, votes} = query;
    console.log("checking Id:", id);

    try{

        if(!id && !recId){
            return res.status(400).json({message: 'no store id and recId were found'})
        }

        // const fields = await findRecordByFilter(id);
        // console.log('this is find store', fields);
        
        // if(fields.length > 0){

        //     console.log('fields check', fields);
        //     console.log('recid check',fields[0].RecordID);

        //     const votes = fields[0].votes + 1;
        //     const recId = fields[0].RecordID;

        console.log('recId:', recId);

        const updatedStore = await table.update(recId, {
            "votes": parseInt(votes) + 1,
        
        })

        if(!updatedStore){
            return res.status(400).json({message: 'problem updating the record'})
        }
        
        console.log('updating record:', updatedStore.fields.votes);

        const updatedVotes = updatedStore.fields.votes;

        res.json(updatedVotes);
    
    }catch(err){
        console.log(err);
        return res.status(500).json({errorMsg: "Error finding a store", err})
    }

    return res.json({message: "couldn't find your request"})

}

export default getCoffeeStoreVotes;