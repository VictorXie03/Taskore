import { FaTimes } from "react-icons/fa"
import PropTypes from 'prop-types'
import Button from "./Button"
import PointTracker from "./PointTrackerButton"
import { useState } from "react"



const Task = ({ task, onDelete, onToggle, onToggleComplete }) => {
  return (
    <div className={`task ${task.reminder ? "reminder" : ""}`} onDoubleClick={() => onToggle(task.id)}>
      <h3>
        {task.text} <FaTimes style={{ color: "red", cursor: "pointer" }} onClick={() => onDelete(task.id)} />
      </h3>
      <p>{task.day}</p>
      <p>{task.description}</p>
      <p>{task.points}</p>
      <PointTracker color="green"
        text={task.isComplete ? "Uncomplete" : "Complete"}
        onClick={() => onToggleComplete(task.id)} />


    </div>
  )
}

export default Task