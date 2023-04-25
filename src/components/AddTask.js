import { useState } from "react"


const AddTask = ({ onAdd }) => {
    const [task, setTask] = useState("")
    const [day, setDay] = useState("")
    const [description, setDescription] = useState("")
    const [reminder, setReminder] = useState(false)
    const [points, setPoints] = useState("")
    const onSubmit = (e) => {
        e.preventDefault()

        if (!task) {
            alert("Please add a task")
            return
        }



        setTask("")
        setDay("")
        setDescription("")
        setPoints("")
        setReminder(false)

    }
    const handleAddTask = () => {
        onAdd({ task, date: day, description, points, reminder });
    }
    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text" placeholder="Add Task" value={task} onChange={(e) => setTask(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input type="text" placeholder="Add Day & Time" value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Description</label>
                <input type="text" placeholder="Add Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Points</label>
                <input type="text" placeholder="Add Points" value={points} onChange={(e) => setPoints(e.target.value)} />
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>

            <input onClick={handleAddTask} type="submit" value="Save Task" className="btn btn-block" />
        </form>
    )
}

export default AddTask