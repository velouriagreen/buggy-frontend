import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Register from './Resources/Register';
import Home from './Resources/Home';
import Login from './Resources/Login';
import axios from 'axios';

function App() {
  const [user, setUser] = useState({});
  
  const deleteUser = () => {
    axios.delete('http://localhost:3000/users/logoff', data)
    .then(res => {
      setUser({});
    })
    .catch((err) => {
      console.log(err);
    })
  };

  // useEffect(() => {
  //   axios.get('http://localhost:3000/user')
  //     .then((res) => {

  //       console.log('res from App', res);
  //       setUser(res.data.user)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }, []);

  return (
    <>
     <BrowserRouter>
     <header>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/register'>Register</Link></li>

          {!user.name ? <Link to='/logon'>Login</Link> : <Link to="/logon" onClick={() =>{deleteUser()}}>Log Off</Link> }
        </ul>
      </nav>
     </header>

   
      <Routes>
        <Route path='/register' element={<Register user={user} setUser={setUser} />} />
        <Route path='/' element={<Home user={user} setUser={setUser} />} />
        <Route path='/logon' element={<Login user={user} setUser={setUser}/>} />
      </Routes>
     </BrowserRouter>
    </>
  )
};

export default App
