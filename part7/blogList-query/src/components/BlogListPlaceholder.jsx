import Placeholder from 'react-bootstrap/Placeholder'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import useNotification from '../hooks/useNotification'
import { useEffect } from 'react'

const BlogListPlaceHolder = ({ children, isSuccess, error }) => {
  const { setNotificationTimeout } = useNotification()
  const placeholders = [5, 2, 4, 1, 3]

  useEffect(() => {
    if (error) {
      console.error(error)
      setNotificationTimeout({ text: error.message, type: 'danger' })
    }
  }, [error])

  if (isSuccess) {
    return children
  }

  if (error) {
    return null
  }

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

export default BlogListPlaceHolder
