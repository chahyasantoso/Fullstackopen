const Filter = ({name, onFilter}) => {
  return (
    <div>
      filter shown with a <input value={name} onChange={onFilter} />
    </div>
  )
}

export default Filter