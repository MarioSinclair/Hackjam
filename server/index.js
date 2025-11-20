const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("connect string")
.then(() => console.log("Connected to mongodb"))
.catch(() => console.log("Error connecting"))

const TodoSchema = new mongoose.Schema({
    task: {type: String}
})

const TodoModel = mongoose.model('Todo', TodoSchema);

app.post('/todos', async (req, res) => {
    const newTask = new TodoModel({ task: req.body.task});
    await newTask.save();
    res.json({message: "Added successfully"})
})

app.get('/todos', async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
  }
})

app.delete(`/todos/:id`, async (req, res) => {
    const todo = await TodoModel.findByIdAndDelete(req.params.id)
    res.json({message: `${todo}deleted successfully`})
})

app.listen(3001, () => {
  console.log(`Server running on port 3001`);
});