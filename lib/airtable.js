const Airtable = require('airtable');
export const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

const table = base('Coffee Stores');



const getMinifiedRecords = (records) => {
    return records.map((record) => record.fields)
}

const findRecordByFilter = async(id) => {
    const findStore = await table.select({
            filterByFormula: `id="${id}"`
        }).firstPage();

    console.log('found the id and generating votes from airtable', findStore);

    return getMinifiedRecords(findStore);
}

export {table, findRecordByFilter, getMinifiedRecords};
