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

    console.log('found the id and filtering store');
    const foundStore = getMinifiedRecords(findStore);
    console.log('filtered store:', foundStore);
    return foundStore;
}

export {table, findRecordByFilter, getMinifiedRecords};
