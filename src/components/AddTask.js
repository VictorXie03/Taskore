import { useState } from "react"


const AddTask = ({ onAdd }) => {
    const [text, setText] = useState("")
    const [day, setDay] = useState("")
    const [description, setDescription] = useState("")
    const [reminder, setReminder] = useState(false)
    const [points, setPoints] = useState("")
    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert("Please add a task")
            return
        }

        onAdd({ text, day, description, points, reminder, isComplete: false })

        setText("")
        setDay("")
        setDescription("")
        setPoints("")
        setReminder(false)

    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text" placeholder="Add Task" value={text} onChange={(e) => setText(e.target.value)} />
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

            <input type="submit" value="Save Task" className="btn btn-block" />
        </form>
    )
}

export default AddTask