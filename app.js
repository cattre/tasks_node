const app = require('express')()
const cors = require('cors')
const jsonParser = require('body-parser').json()
const TasksController = require('./controllers/TasksController.js')

app.use(cors({origin: '*'}))
app.options('*', cors({origin: '*'}))

// Get active tasks
app.get('/task', TasksController.getTasks)

// Get single task
app.get('/task/:id', TasksController.getSingleTask)

// Add task
app.post('/task', jsonParser, TasksController.addTask)

// Update task (mark as completed, edit etc.)
app.put('/task/:id', jsonParser, TasksController.updateTask)

// Delete task
app.delete('/task/:id', TasksController.deleteTask)

app.listen(3000);