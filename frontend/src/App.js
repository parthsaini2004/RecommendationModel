import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import UserList from './components/UserList';
import FetchUser from './components/FetchUser';
import AddUser from "./components/addUser"
import ProcessInputComponent from './components/ProcessInputComponent';

import SignIn from './components/signIn';
import UserDetails from './components/userDetail';
import Homepage from './components/Homepage';

function App() {
  return (

    
    <div className="App">
       {/* <AddUser /> */}
<Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
      {/* <h1 className="text-2xl">Hello, Tailwind CSS!</h1> */}
{/*       
     
      <FetchUser /> 

      <ProcessInputComponent />

     */}
    </div>
  );
}

export default App;
