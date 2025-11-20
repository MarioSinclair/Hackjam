import { use } from "react";
import { useState } from "react";
import axios from 'axios'

export default function Create() {

    const [task, setTask] = useState()

    const handleAdd = () => {
        axios.post("http://localhost:3001/todos", {task: task})
        .then(res => {console.log("Task added successfully")})
        .catch(err => {console.log(err)})
        location.reload()
    }

    return (
        <>
        <h1>Welcome to the todo list</h1>
        <input type="text" name="task" id="task" onChange={(e) => setTask(e.target.value)}/>
        <button onClick={handleAdd}>+</button>
        </>
    )
}