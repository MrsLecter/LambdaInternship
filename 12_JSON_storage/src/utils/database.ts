require('dotenv').config();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
let _db;

export const mongoConnect = (callback) => {
    MongoClient.connect(process.env.CLIENT_STR)
.then(client => {
    _db = client.db();
    callback(client);
}).catch(err => {
    console.log(err);
    throw err;
})
};

export const getDB = () => {
    if (_db){
        return _db;
    }
    throw 'No database found!';
}
