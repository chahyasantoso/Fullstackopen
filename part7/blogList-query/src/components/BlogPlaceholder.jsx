import Placeholder from 'react-bootstrap/Placeholder'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

const BlogPlaceholder = ({ children, placeholder, isSuccess, isError }) => {
  if (isSuccess) {
    return children
  }
  return isError ? null : placeholder
}

export const ListPlaceholder = () => {
  const placeholders = [5, 2, 4, 1, 3]
  return (
    <div>
      <Card>
        <ListGroup variant="flush">
          {placeholders.map((xs) => {
            return (
              <Placeholder as={ListGroup.Item} animation="glow" key={xs}>
                <Placeholder xs={xs} />
              </Placeholder>
            )
          })}
        </ListGroup>
      </Card>
    </div>
  )
}

export default BlogPlaceholder
