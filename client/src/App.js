
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Register from './Components/Register/Register';
import Login from './Components/Login/Login'
import Home from './Components/Home/Home';
import Chat from './Components/Chat/Chat';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import OtpContainer from './Components/OtpContainer/OtpContainer';
import GroupForm from './Components/group/group';
import { useState } from 'react';
import { ThemeContext } from './Context/ThemeContext';


function App() {
  const [color, setColor]=useState(true);
  return (
    <div className="App">
       <BrowserRouter>
       <ThemeContext.Provider value={{color, setColor}}>
       <Routes>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/chat" element={<Chat/>}></Route>
        <Route path="/otp-container" element={<OtpContainer/>}></Route>
       <Route path ="/groupform" element={<GroupForm></GroupForm>}></Route>
        </Routes>
       </ThemeContext.Provider>
      
        </BrowserRouter>
    </div>
  );
}

export default App;
