import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Login from './components/Login';
import NoteState from './components/context/NoteState';
import Signup from './components/Signup';
import UserState from './components/context/UserState';

function App() {
  return (
    <>
    <UserState>
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
        <Routes>
          <Route exact path='/' element={<Home />} ></Route>
          <Route exact path='/about' element={<About />}></Route>
          <Route exact path='/login' element={<Login />} ></Route>
          <Route exact path='/signup' element={<Signup/>} ></Route>
        </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
      </UserState>

    </>
  );
}

export default App;
