const express = require('express');
const router = express.Router();

const auth = require('../Middleware/auth');
const Task = require('../Models/TaskSchema');

router.get('/', auth, (req, res) => {
    res.send({ message: 'Hey from Tasks route!', user: req.user })
});

// create a task
router.post('/createtask', auth, async (req, res) => {
    try {
        const { description } = req.body;

        if (!description) {
            return res.status(400).json({ message: 'Description is required for creating a task' });
        }

        const task = new Task({
            ...req.body,
            owner: req.user._id
        });

        await task.save();
        res.status(201).json({ message: 'Task saved successfully', task });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// fetch tasks
router.get('/gettasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id });

        if (tasks.length === 0) {
            return res.status(404).json({ error: 'No tasks available' });
        }

        res.status(200).json({ data: tasks });

    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// fetch task by ID
router.get('/gettasks/:id', auth, async (req, res) => {
    const taskid = req.params.id;       // gets task id from url
    try {
        const task = await Task.find({
            _id: taskid,            // compares Task.id with taskid
            owner: req.user._id
        });

        if (!task) {
            return res.status(404).json({ error: 'No tasks available' });
        }

        res.status(200).json({ task });

    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// update task
router.patch('/updatetask/:id', auth, async (req, res) => {
    const taskid = req.params.id;       // gets task id from url
    const updates = Object.keys(req.body);  // gets updates from body
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates' });
    }
    try {
        const task = await Task.findOne({
            _id: taskid,            // compares Task.id with taskid
            owner: req.user._id
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.status(200).json({ task, message: 'Task updated successfully' });

    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// delete task
router.delete('/deletetask/:id', auth, async (req, res) => {
    const taskid = req.params.id;       // gets task id from url
    try {
        const task = await Task.findOneAndDelete({
            _id: taskid,            // compares Task.id with taskid
            owner: req.user._id
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ task, message: 'Task deleted successfully' });

    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;