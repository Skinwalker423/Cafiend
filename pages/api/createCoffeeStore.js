const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

const table = base('Coffee Stores');


const createCoffeeStore = async(req, res) => {

    const {method, body } = req;
    const {id, name, address, neighborhood, votes, imageUrl} = body;

    try{

    if(method === 'POST'){
        if(!id){
            return res.status(400).json({message: 'no store id was found'})
        }
        const findStore = await table.select({
            filterByFormula: `id=${id}`
        }).firstPage();
        
        if(findStore.length > 0){
            const fields = findStore.map((field) => {
                    return field.fields;
            });
            
            res.json(fields[0]);
        
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
            const newRecord = createdRecord.map((record) => {
                    return record.fields;
            });

            return res.json(newRecord[0]);
            
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