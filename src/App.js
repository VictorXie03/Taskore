import { useState, useEffect } from "react"
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import Footer from "./components/Footer"
import LoginForm from "./components/LoginForm"

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [tasklist, setTasklist] = useState("")
  const [error, setError] = useState("");

  useEffect(() => {
    loginDetails()
  }, []);

  useEffect(() => {

    getTasks()
  }, [isLoggedIn])
  const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    setTasklist(tasksFromServer)
    console.log(tasksFromServer)
  }

  const loginDetails = async (user) => {
    const res = await fetch('http://localhost:5000/user/login', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const data = await res.json()
    if (res.status == 200) {
      setIsLoggedIn(true)
    }
  }
  const registerDetails = async (user) => {
    const res = await fetch('http://localhost:5000/user/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    const data = await res.json()
  }

  const Logout = () => {
    setIsLoggedIn(!isLoggedIn)
  }


  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks", {
      credentials: 'include'
    })
    const data = await res.json()


    return data
  }
  console.log(tasklist)
  // Fetch Tasks
  const fetchTask = async (_id) => {
    const res = await fetch(`http://localhost:5000/tasks/${_id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })


    const body = await res.json()
    getTasks()


  }


  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      credentials: 'include',
      method: "DELETE",
    })
    const body = await res.json()
    if (!res.ok) {
      alert(body)
    }
    getTasks()
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const body = await res.json()
    if (!res.ok) {
      alert(body)
    }
    getTasks()

  }
  // Toggle Complete
  const toggleComplete = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, isComplete: !taskToToggle.isComplete }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      credentials: 'include',
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

      </div> : <div className="App"><LoginForm Login={loginDetails} Register={registerDetails} error={error} /></div>}
    </>
  );
}

export default App;
