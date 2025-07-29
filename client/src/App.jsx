import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './pages/RegisterForm';
import LoginForm from './pages/LoginForm';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
// import Card from './components/Card'; 
import SharedPost from './pages/SharedPost'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/posts/:postId" element={<SharedPost />} />
      </Routes>
    </Router>
  );
}

export default App;

