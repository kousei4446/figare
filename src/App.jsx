import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Register from './components/newregester/Register';
import Login from './components/Login/Login';
import "./App.css"
import Username from './components/newregester/Username';
import Home from './components/Home/Home';
import SerchPlace from './components/SerchPlace/SerchPlace';


function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login/register" element={<Register />} />
          <Route path="/login/username" element={<Username />} />
          <Route path="/login/serchplace" element={<SerchPlace/>} />
        </Routes>
      </div>
    </Router>
  );
}

function Navigation() {
  const location = useLocation();

  // /aboutパス以降の場合はナビゲーションを表示しない
  if (location.pathname.startsWith('/login')) {
    return null;
  }

  return (
    <div>
      <div className='head'>
        <h1>Figare</h1>
      </div>
      <nav className='mainlogin'>

        <div className='login'>
          <Link to="/login">ログイン</Link>
          <br />
          <br />
          <Link to="/login/register">新規登録</Link>
        </div>
      </nav>
    </div>
  );
}

export default App;
