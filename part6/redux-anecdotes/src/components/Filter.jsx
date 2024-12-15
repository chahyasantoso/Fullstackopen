import { useDispatch, useSelector } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    dispatch(filterChange(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter