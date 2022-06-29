const mongo = require('mongodb');

const {getDB} = require('../utils/database');

export const save = (obj) => {
    console.log("write", obj.rout);
    const {rout, ...objBody} = obj;
    const db = getDB();
    let dbOp;
    db.collection('routes').find({"rout": rout}).next()
    .then(data => {
        console.log("rout", rout);
        if(data===null){
            console.log('save')
            db.collection('routes').insertOne({"rout": rout, "obj": objBody})
            .then(data => console.log(data))
            .catch(err => console.log(err));
        }else{
            console.log('update')
            dbOp = db.collection('routes').updateOne({"rout": rout},{$set: {"obj": objBody}});
        }
        return data;
    })
    .catch(err => console.log(err));
}

export const findByRout = (rout_name) => {
    const db = getDB();
    return db.collection('routes').find({"rout": rout_name}).next()
    .then(data => {
        console.log(data);
        return data;
    })
    .catch(err => console.log(err)); 
}