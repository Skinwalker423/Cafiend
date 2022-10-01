import { table, findRecordByFilter, getMinifiedRecords } from "../../lib/airtable";


const createCoffeeStore = async(req, res) => {

    const {method, body } = req;
    const {id, name, address, neighborhood, votes, imageUrl} = body;

    try{

    if(method === 'POST'){
        if(!id){
            return res.status(400).json({message: 'no store id was found'})
        }
        
        const findStore = findRecordByFilter(id);
        
        if(findStore.length > 0){
            const fields = getMinifiedRecords(findStore);
            res.json(fields);

        } else {
            if(!name){
                return res.status(400).json({message: 'name is missing'})
            }

            try{
            const createdRecord = await table.create([
                {
                    "fields": {
                        id,
                        name,
                        address,
                        neighborhood,
                        votes,
                        imageUrl,
                    }
                }
            ]
            )

            if(createdRecord.length > 0){
                const newRecord = getMinifiedRecord(createdRecord);
                console.log('creating store for airtable');

                return res.json(newRecord);
            };


            }catch(e){
                return res.json({error: 'problem creating new record', e})
            }
        }
    }
    }catch(err){
        console.log(err);
        return res.status(500).json({errorMsg: "Error finding a store", err})
    }

    return res.json({message: "couldn't find your request"})

}

export default createCoffeeStore