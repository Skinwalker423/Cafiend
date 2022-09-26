const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

const table = base('Coffee Stores');


const createCoffeeStore = async(req, res) => {

    const {method, query} = req;

    try{

    if(method === 'POST'){
        const findStore = await table.select({
            filterByFormula: `id="423"`
        }).firstPage();
        
        if(findStore.length > 0){
            const fields = findStore.map((field) => {
                    return field.fields;
            });
            
            res.json(fields[0]);
        
        } else {
            try{
            const createdRecord = await table.create([
                {
                    "fields": {
                        id: query.id,
                        name: query.name,
                        address: query.address,
                        neighborhood: query.neighborhood,
                        votes: parseInt(query.votes),
                        imageUrl: query.imageUrl,
                    }
                }
            ]
            )

            if(createdRecord.length > 0){
            const newRecord = createdRecord.map((field) => {
                    return field.fields;
            });

            res.json(newRecord[0]);
            
            };


            }catch(e){
                res.json({error: 'problem creating new record', e})
            }
        }
    }
    }catch(err){
        console.log(err);
        res.status(500).json({errorMsg: err})
    }

    res.json({message: method})

}

export default createCoffeeStore