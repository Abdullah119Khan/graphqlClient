import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

import '../App.css'

const Register = () => {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const Navigate = useNavigate()

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData }}) {
      console.log(userData)
      context.login(userData)
      Navigate('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: values,

  })


  const handleSubmit = (e) => {
    e.preventDefault()
    addUser()
  }


  return (
    <div className='form-container'>
    <Form onSubmit={handleSubmit} noValidate className={ loading ? "loading": '' }>
     <Form.Input
     label='Username'
     placeholder='Enter your username'
     name='username'
     type='text'
     error={errors.username ? true: false}
     value={values.username}
     onChange={onChange}
     />
     <Form.Input
     label='Email'
     placeholder='Enter your email'
     name='email'
     type='email'
     error={errors.email ? true: false}
     value={values.email}
     onChange={onChange}
     />
     <Form.Input
     label='Password'
     placeholder='Enter your Password'
     name='password'
     type='password'
     error={errors.password ? true: false}
     value={values.password}
     onChange={onChange}
     />
     <Form.Input
     label='Confirm Password'
     placeholder='Enter your confirm password'
     name='confirmPassword'
     type='password'
     error={errors.confirmPassword ? true: false}
     value={values.confirmPassword}
     onChange={onChange}
     />
     <Button type='submit' primary>Register</Button>
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

const REGISTER_USER = gql`
  mutation register (
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register (
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id email username createdAt token
    }
  }
`


export default Register