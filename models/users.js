const { MongoClient } = require('mongodb');
const dev_config = (process.env.store === undefined) ? require('../config/devConfig') : undefined;
const dev_db_Url = (dev_config) ? dev_config.dev_db_Url : undefined;
const client = new MongoClient(/*DBUrl*/); // todo replace names
const collection = client.db(/*db_name*/).collection(/*users*/); // todo replace names

async function readOne(userName = {}) {
    await client.connect();
    let user = await collection.findOne({ "user_name": userName });
    client.close();
    return user;
};

module.exports = { readOne };