import PropTypes from 'prop-types'

const PointTracker = ({color, text , onClick}) => {
  return (
    <button onClick={onClick} style= {{backgroundColor: color }}
    className="btn2">{text}
    </button>
  )
}


PointTracker.defaultProps = {
    color: "steelblue"
}

PointTracker.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}
export default PointTracker