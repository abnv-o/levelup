import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import User_dash from './components/User_dash';


function App() {
  return (
    <div className="App  ">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/dash" element={<User_dash/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
      <script src="../node_modules/flowbite/dist/flowbite.min.js"></script>

    </div>
  );
}

export default App;
