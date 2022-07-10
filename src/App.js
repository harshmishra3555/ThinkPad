import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Routes> 
            <Route exact path="/" element={
              <>
            <Navbar />
            <Alert message="This is best react course"/>
            <div className="container">
              <Outlet/>
            </div>
              </>
            }>
              <Route exact index element={<Home />} />
              <Route exact path="about" element={<About />} />
              <Route exact path="login" element={<Login />} />
              <Route exact path="signup" element={<Signup />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;

