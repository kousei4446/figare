import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Register from './components/newregester/Register';
import Login from './components/Login/Login';
import "./App.css";



function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login/register" element={<Register />} />
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
    <nav>
      <h1 className='title' id='title'>Figare</h1>
      <div>
          <Link to="/login">ログインさせません</Link>
          <br/>
          <Link to="/login/register">新規登録aaaaaaaa</Link>
      </div>
    </nav>
  );
}

export default App;
