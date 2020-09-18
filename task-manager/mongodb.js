const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const id = new ObjectID()
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true}, (error, client)=>{
    if(error){
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)

    /* db.collection('users').findOne({name: 'Brenda'},(error, user)=>{
        if(error){
            return console.log('Unable to fecth')
        }
        console.log(user)
    }) */
    db.collection('users').findOne({ _id: new ObjectID("5f63fcc0de46871e9402b8ba")},(error, user)=>{
        if(error){
            return console.log('Unable to fecth')
        }
        console.log(user)
    })

    db.collection('users').find({ age: 17 }).toArray((error, users)=>{ //find não recebe callback, ele devolve um cursor
        console.log(users)
    })
    

/* 
    db.collection('users').insertMany([
        {
            name: 'Mary',
            age: '26'
        },{
            name: 'Julia',
            age: 34
        }
    ],(error, result)=>{
        if(error){
            return console.log('Unable to insert documents')
        }
        console.log(result.ops)
    }) */



})

/* CHALLANGE 
1. use insert many to insert three documents
 -description: string, completed: boolean
2. setup the callback to handle error or print ops
3. run the script
4 refresh the database in the robo 3t and view data in tasks collection

*/