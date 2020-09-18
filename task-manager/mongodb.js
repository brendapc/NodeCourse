const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const id = new ObjectID()


MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true}, (error, client)=>{
    if(error){
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)

    /* db.collection('tasks').insertMany([{ 
        task: 'molhar plantas', 
        done: false
    },{
        task: 'passear o cachorro',
        done: true
    },{
        task: 'drink water',
        done: false
    }
    ],(error, result)=>{
        if(error){
            return console.log(error)
        }
        console.log(result.ops)
    }) */

    db.collection('users').updateOne({
        _id: new ObjectID("5f63f9b32313d20460718161")
    },{
        $set: {
            name: 'Marrie'
        }
    }).then((result)=>{
        console.log(result)
    }).catch((err)=>{
        console.log(err)
    })

    /* db.collection('tasks').findOne({ _id: new ObjectID("5f6499f757732122dc4b7472")},(error, user)=>{
        if(error){
            return console.log(error)
        }
        console.log(user)
    })
    db.collection('tasks').find({done: false}).toArray((error, users)=>{
        if(error){
            console.log(erros)
        }
        console.log(users)
    }) */
    /* db.collection('users').findOne({name: 'Brenda'},(error, user)=>{
        if(error){
            return console.log('Unable to fecth')
        }
        console.log(user)
    }) */
    /* db.collection('users').findOne({ _id: new ObjectID("5f63fcc0de46871e9402b8ba")},(error, user)=>{
        if(error){
            return console.log('Unable to fecth')
        }
        console.log(user)
    })

    db.collection('users').find({ age: 17 }).toArray((error, users)=>{ //find não recebe callback, ele devolve um cursor
        console.log(users)
    }) */


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