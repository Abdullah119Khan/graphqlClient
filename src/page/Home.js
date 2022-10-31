import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Grid } from 'semantic-ui-react'
import PostCard from '../component/PostCard'

import '../App.css'

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)


  return (
    <Grid columns={3} >
    <Grid.Row className='page-title'>
      <h1>Recents Posts</h1>
    </Grid.Row>
    <Grid.Row>
    {loading ? (
      <h3>Loading...</h3>
    ) : (
      data.getPosts.map((post) => (
        <Grid.Column key={post._id} style={{ marginBottom: '17px'}}>
         <PostCard post={post}/>
        </Grid.Column>
      ))
    )}
    </Grid.Row>
  </Grid>
  )
}

const FETCH_POSTS_QUERY = gql`
{
  getPosts {
    id
    body
    username
    createdAt
    comments {
      id
      body
      username
    }
  }
}
`

export default Home