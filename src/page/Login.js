import React, { useContext, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Form } from 'semantic-ui-react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

import '../App.css'

const Login = () => {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({username: '', password: ''})

  const Navigate = useNavigate()

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value })
  }

  const [ loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData }}) {
      console.log(userData)
      context.login(userData)
      Navigate('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: values
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(values)
    loginUser()
  }

  return (
    <div className='form-container'>
    <Form onSubmit={handleSubmit} className={ loading ? "loading" : ''}>
     <Form.Input
     label='Username'
     placeholder='Enter your username'
     name='username'
     error={errors.username ? true: false}
     value={values.username}
     onChange={handleChange}
     />
     <Form.Input
     label='Password'
     placeholder='Enter your Password'
     name='password'
     type='password'
     error={errors.password ? true: false}
     value={values.password}
     onChange={handleChange}
     />
     <Button type='submit' primary>Login</Button>
     </Form>
     {Object.keys(errors).length > 0 && (
      <div className='ui error message'>
       <ul className='list'>
        {Object.values(errors).map(value => (
          <li key={value}>{value}</li>
        ))}
       </ul>
      </div>
     )}
    </div>
  )
}

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login (
      username: $username password: $password
    ) {
      id username email createdAt token
    }
  }
`


export default Login