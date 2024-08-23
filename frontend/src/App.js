import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Myprofile from './components/Myprofile';
import UpdateProfile from './components/UpdateProfile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/myprofile' element={<Myprofile />}></Route>
        <Route path='/updateProfile' element={<UpdateProfile/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
