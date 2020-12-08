const MongoClient = require("mongodb").MongoClient
const ObjectId = require('mongodb').ObjectId

async function getConnection() {
    const connection = await MongoClient.connect('mongodb://dbUser:H&HwiK2^kAdtrMsvF#Op@localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true})
    return connection.db('tasks')
}

async function getTasks() {
    const db = await getConnection()
    return db.collection('tasks').find().toArray()
}

async function getSingleTask(id) {
    const db = await getConnection()
    return db.collection('tasks').find({_id: ObjectId(id)}).toArray()
}

async function addTask(task) {
    const db = await getConnection()
    return db.collection('tasks').insertOne(task)
}

async function updateTask(id, update) {
    const db = await getConnection()
    return db.collection('tasks').updateOne({_id: ObjectId(id)}, {$set: update})
}

async function deleteTask(id) {
    const db = await getConnection()
    return db.collection('tasks').deleteOne({_id: ObjectId(id)})
}

module.exports.getTasks = getTasks
module.exports.getSingleTask = getSingleTask
module.exports.addTask = addTask
module.exports.updateTask = updateTask
module.exports.deleteTask = deleteTask