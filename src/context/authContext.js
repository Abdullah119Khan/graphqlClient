import React, { createContext, useReducer } from 'react'

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {}
})

const AuthReducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      }
    case "LOGOUT":
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, { user: null })

  function login(userData) {
    localStorage.setItem('jwtToken', userData.token)
    dispatch({
      type: 'LOGIN',
      payload: userData
    })
  }

  function logout() {
    localStorage.removeItem('jwtToken')
    dispatch({
      type: 'LOGOUT',
      user: null
    })
  }

  return(
    <AuthContext.Provider 
     value={{ user: state.user, login, logout}}
     {...props}
    />
  )
}

export { AuthContext, AuthProvider } 