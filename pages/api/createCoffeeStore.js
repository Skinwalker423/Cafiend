const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

const table = base('Coffee Stores');


const createCoffeeStore = async(req, res) => {

    const {method, query} = req;

    try{

    if(method === 'POST'){
        const findStore = await table.select({
            filterByFormula: `id="542153fa498e32acecefc77a"`
        }).firstPage();
        
        if(findStore){
            const fields = findStore.map((field) => {
                if(field.fields){
                    return field.fields;
                }
            });
            
            res.json({id:fields[0].id, address: fields[0].address, neighborhood: fields[0].neighborhood, imageUrl: fields[0].imageUrl, votes: fields[0].votes });
        
        } else {
            res.json({message: 'not found. creating store'});
            await table.create([
                {
                    "fields": {
                        "id": query.id,
                        "name": query.name,
                        "address": query.address,
                        "neighborhood": query.neighborhood,
                        "votes": query.votes,
                        "imageUrl": query.imageUrl,
                    }
                }
            ]
            )
        }
    }
    }catch(err){
        console.log(err);
        res.status(500).res.json({errorMsg: err})
    }

    res.json({message: method})

}

export default createCoffeeStore