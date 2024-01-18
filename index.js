const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./Routes/UserRoutes');
const taskRoutes = require('./Routes/TaskRoutes');


require('dotenv').config();
const port = 3000;
const hostname = '127.0.0.1';

require('./db/conn');

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Task Manager API' })
})

app.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`)
})