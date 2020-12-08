const functions = require('../functions')
const data = {
    success: true,
    message: '',
    data: {}
}

async function getTasks(req, res) {
    try {
        data.data = await functions.getTasks()
        data.message = 'All active tasks retrieved'
    } catch {
        data.success = false
        data.message = 'DB error'
    }
    return res.json(data)
}

async function getSingleTask(req, res) {
    if ('id' in req.params) {
        try {
            let task = await functions.getSingleTask(req.params.id)
            if (task) {
                data.message = 'Task retrieved'
                data.data = task
            } else {
                data.success = false
                data.message = 'No task found'
            }
        } catch {
            data.success = false
            data.message = 'DB error'
        }
    } else {
        data.success = false
        data.message = 'No task ID provided'
    }
    return res.json(data)
}

async function addTask(req, res) {
    if (req.body.data) {
        try {
            data.message = 'Task added successfully'
            data.data = await functions.addTask(req.body.data)
        } catch (error) {
            data.success = false
            data.message = error.message
        }
    } else {
        data.success = false
        data.message = 'Input error'
    }
    return res.json(data)
}

async function updateTask(req, res) {
    if ('id' in req.params && req.body) {
        try {
            let data = {
                success: true,
                message: 'Task updated successfully',
                data: await functions.updateTask(req.params.id, req.body)
            }
            return res.json(data)
        } catch(error) {
            let data = {
                success: false,
                message: 'DB error',
            }
            return res.json(data)
        }
    } else {
        let data = {
            success: false,
            message: 'Input error',
        }
        return res.json(data)
    }
}

async function deleteTask(req, res) {
    if ('id' in req.params) {
        try {
            let data = {
                success: true,
                message: 'Task deleted successfully',
                data: await functions.deleteTask(req.params.id)
            }
            return res.json(data)
        } catch (error) {
            console.log(error)
            let data = {
                success: false,
                message: 'DB error',
            }
            return res.json(data)
        }
    } else {
        let data = {
            success: false,
            message: 'No task ID provided',
        }
        return res.json(data)
    }
}

module.exports.getTasks = getTasks
module.exports.getSingleTask = getSingleTask
module.exports.addTask = addTask
module.exports.updateTask = updateTask
module.exports.deleteTask = deleteTask