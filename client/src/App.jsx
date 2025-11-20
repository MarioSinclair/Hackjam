import { useState, useEffect } from 'react'
import Create from './Create.jsx'
import axios from 'axios'

function App() {

  const [todo, setTodo] = useState([])

  useEffect (() => {
    fetchTodos();
  },[])

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:3001/todos")
    setTodo(response.data)
  }

  const handleDelete = async (id) => {
    const response = await axios.delete(`http://localhost:3001/todos/${id}`)
    console.log(response.data)
    location.reload()
  }
  
  return (
    <>
      <Create />
      {
        todo.map((todo) => (
          <div className="container" key={todo._id}>
            <div className="todo" key={todo._id}>
              {todo.task} <button onClick={() => handleDelete(todo._id)}>X</button>
            </div>
            
          </div>
        ))
      }
    </>
  )
}

export default App
