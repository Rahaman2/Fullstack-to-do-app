const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');


// Route to create a new task
router.post('/tasks', taskController.createTask);

// Route to get all tasks
router.get('/tasks', taskController.getAllTasks);

// Route to get a single task by ID
router.get('/tasks/:id', taskController.getTaskById);

// Route to update a task by ID
router.put('/tasks/:id', taskController.updateTask);

// Route to delete a task by ID
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
