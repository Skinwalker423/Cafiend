import { table } from "../../lib/airtable";

const getCoffeeStoreVotes = async(req, res) => {

    const {method, query } = req;
    const {id} = query;
    console.log("checking Id:", id);

    try{

        if(!id){
            return res.status(400).json({message: 'no store id was found'})
        }

        const findStore = await table.select({
            filterByFormula: `id="${id}"`
        }).firstPage();

        console.log('found the id and generating votes from airtable');
        
        if(findStore.length > 0){
            const fields = findStore.map((record) => {
                    return record.fields;
            });

            const votes = fields[0].votes + 1;
            const recId = fields[0].RecordID;

            console.log('mapping for recId:', recId);

            const updatedStore = await table.update(recId, {
                "votes": votes,
            
            })

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