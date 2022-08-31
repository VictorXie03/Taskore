import Task from "./Task"

const Tasks = ({ tasks, onDelete, onToggle, onToggleComplete }) => {
  const completed = tasks.filter(task => task.isComplete == true)
  const pointsArray = completed.map(task => Number(task.points))
  const result = pointsArray.reduce((total, points) => total + points,0);
  return (
    <>
    <p>{result}</p>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onToggleComplete={onToggleComplete} />
      ))}
    </>
  )
}

export default Tasks