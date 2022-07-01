const mongo = require('mongodb');

const {getDB} = require('./database');


async function saveUser(obj){
    const db = getDB();
    let dbOp;
    await db.collection('users').insertOne(obj)
    .catch(err =>  {throw new Error(err)});
}


async function findUserByEmail(email){
    const db = getDB();
    return await db.collection('users').find({"email": email}).next()
    .then(data => {
        return data;
    })
    .catch(err =>  {throw new Error(err)}); 
}


async function saveTokens(obj){
    const db = getDB();
    await db.collection('user_data').updateOne({"user": 'current'},{ $set: {"email": obj.email}, $set: {"refreshToken": obj.refreshToken}})
    .catch(err =>  {throw new Error(err)});
}


async function findTokens(){
    const db = getDB();
    return await db.collection('user_data').find({"user": "current"}).next()
    .then(data => {
        return data;
    })
    .catch(err => {throw new Error(err)}); 
}


exports.saveUser = saveUser;
exports.findUserByEmail = findUserByEmail;
exports.saveTokens = saveTokens;
exports.findTokens = findTokens;