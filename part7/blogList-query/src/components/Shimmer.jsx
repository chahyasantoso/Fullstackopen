import Placeholder from 'react-bootstrap/Placeholder'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useEffect } from 'react'

const Shimmer = ({
  as = null,
  isSuccess,
  children,
  isError,
  errorElement = null,
  onError,
}) => {
  useEffect(() => {
    if (isError) {
      onError?.()
    }
  }, [isError])

  if (isSuccess) {
    return children
  }

  if (isError) {
    return errorElement
  }

  return (
    as ?? (
      <Placeholder as="div" animation="glow">
        <Placeholder xs="3" />
      </Placeholder>
    )
  )
}

export const ListShimmer = () => {
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

export default Shimmer
