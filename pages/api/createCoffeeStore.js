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
            console.log('Retrieved', findStore);
            res.json(findStore)
        
        } else {
            res.json({message: 'not found. creating store'});
            await table.create([
                {
                    "fields": {
                        "I.d.": query.id,
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
        res.json({errorMsg: err})
    }

    res.json({message: method})

}

export default createCoffeeStore