import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate} from 'react-router-dom';
import Register from './components/newregester/Register';
import Login from './components/Login/Login';
import "./App.css"
import Username from './components/newregester/Username';
import SerchPlace from './components/SerchPlace/SerchPlace';
import Namefuri from './components/Login/Namefuri';
import Name from './components/Login/Name';
import Gender from './components/Login/Gender';
import TelNum from './components/Login/TelNum';
import Password from './components/Login/Password';
import LoginUsername from './components/Login/LoginUsername';
import Home from './components/Home/Home';
import Serch from './components/Home/Serch';
import Profile from './components/Home/Profile';
import AddPost from './components/Home/AddPost';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>

          <Route path="/login/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/register" element={<Register />} />
          <Route path="/login/username" element={<Username />} />
          <Route path="/login/serchplace" element={<SerchPlace />} />
          <Route path="/login/namekanji" element={<Name />} />
          <Route path="/login/namefurigana" element={<Namefuri />} />
          <Route path="/login/gender" element={<Gender />} />
          <Route path="/login/telephonenumber" element={<TelNum />} />
          <Route path="/login/password" element={<Password />} />
          <Route path="/login/usernamed" element={<LoginUsername />} />
          <Route path="/login/home/search" element={<Serch />} />
          <Route path="/login/home/profile" element={<Profile />} />
          <Route path="/login/home/addpost" element={<AddPost />} />
        </Routes>
      </div>
    </Router>
  );
}

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const login = () => {
    navigate('/login')
  }

  // /aboutパス以降の場合はナビゲーションを表示しない
  if (location.pathname.startsWith('/login')) {
    return null;
  }

  return (
    <div>
      <div className='head'>

        <h1 className="title">Figare</h1>
        <h2 className='subtitle'>ログイン</h2>
      </div>
      <nav className='mainlogin'>
        <div className='input'>
          電話番号
          <br/>
          <input></input>
          <br/>
          パスワード
          <br/>
          <input></input>
        </div>
        <div id="login">
          <button onClick={login} className='login/namekanji'>ログイン</button>
        </div>
          <br/>
        <div className='new'>
          <Link to="/login/register">新規登録の方はこちらへ</Link>
        </div>
      </nav>
    </div>
  );
}

export default App;
