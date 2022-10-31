import React from 'react'
import { Button, Card, Image, Icon, Label } from 'semantic-ui-react'
import moment from 'moment'

import '../App.css'

const PostCard = ({ post: { username, body, createdAt, id, comments, }}) => {
  return (
    <Card fluid className='card-container'>
    <Card.Content className='card'>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
           {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Button as='div' labelPosition='right'>
      <Button color='teal' basic>
        <Icon name='heart' />
        Like
      </Button>
      <Label as='a' basic color='teal' pointing='left'>
        4
      </Label>
    </Button>
    <Button as='div' labelPosition='right'>
    <Button color='blue' basic>
      <Icon name='comment' />
      Like
    </Button>
    <Label as='a' basic color='blue' pointing='left'>
      4
    </Label>
  </Button>
      </Card.Content>
    </Card>
  )
}

export default PostCard