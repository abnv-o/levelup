import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App dark:bg-gray-900 ">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/signup" element={<Signup/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
      <script src="../node_modules/flowbite/dist/flowbite.min.js"></script>

    </div>
  );
}

export default App;
