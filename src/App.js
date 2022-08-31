import { useState, useEffect } from "react"
import { BrowserRouter as Route, Routes, Router } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import Footer from "./components/Footer"
import About from "./components/About"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  const [error, setError] = useState("");

  const Login = async details => {
    console.log(details);

    const res = await fetch(`http://localhost:5000/users/${details.email}`)
    // if user exists
    if (res.ok) {
      const data = await res.json()
      if (details.password == data.password) {
        setIsLoggedIn(true)
        setUsername(details.email)
      }
    }
    // if user does not exist
    else {
      console.log("Username doesn't exist");
      setError("Username doesn't exist")
    }
  }

  const Register = async details => {
    console.log(details)

    // need to check if username already exists
    // to check if username exists, make a fetch call to db await fetch("http://localhost:5000/users/${username}")
    // if username already exists, prompt user that this is the case

    // if username does not exist, execute password validation
    // check if password is atleast 5 letters

    const res = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ id: details.email, ...details })
    })

    // if password is good, make a post request to database to add the new user
    setError("Account Successfully Created")


  }

  const Logout = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [username])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks")
    const data = await res.json()

    const tasks = data.filter(e => {
      console.log(e.username)
      console.log(username)
      return e.username == username
    })

    return tasks
  }
  // Fetch Tasks
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ ...task, username })
    })


    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Add UserDetails
  const loginForm = async (details) => {
    const res = await fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(details)
    })
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )

  }
  // Toggle Complete
  const toggleComplete = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, isComplete: !taskToToggle.isComplete }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()




  }
  return (
    <>
      {isLoggedIn ? <div className="container">

        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} onToggleComplete={toggleComplete} />) : ("No Tasks To Show")}


        <Footer />
        <button onClick={Logout}>Logout</button>

      </div> : <div className="App"><LoginForm Login={Login} Register={Register} error={error} /></div>}
    </>
  );
}

export default App;
