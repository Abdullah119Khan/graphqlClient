import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import MenuBar from './component/MenuBar';
import { Container } from 'semantic-ui-react'
import { AuthProvider } from './context/authContext';


import 'semantic-ui-css/semantic.min.css'


function App() {
  return (
    <AuthProvider>
    <Container>
    <Router>
     <MenuBar />
     <Routes>
      <Route index path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
     </Routes>
    </Router>
    </Container>
    </AuthProvider>
  );
}

export default App;
