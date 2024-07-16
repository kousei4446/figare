import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Username from './components/newregester/Username';
import SerchPlace from './components/SerchPlace/SerchPlace';
import Home from './components/Home/Home';
import Serch from './components/Home/Serch';
import Profile from './components/Home/Profile';
import AddPost from './components/Home/AddPost/AddPost';
import Messeage from './components/Home/Message/Messeage';
import Chat from './components/Home/Message/Chat';
import Mono from './components/Home/AddPost/Mono';
import LostDetail from "./components/LostDetail/LostDeatail";
import SureMone from './components/Home/AddPost/SureMone';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import PastPost from './components/Home/PastPost/PastPost';
import Navigation from './Navigation';

function App() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchAllUserData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserData(usersList);
      } catch (e) {
        console.error("Error getting documents: ", e);
      }
    };
    fetchAllUserData();
  }, []);

  const [prof, setProf] = useState({ displayName: "", email: "", username: "", photoURL: "", place: "" });
  const [myInfo, setMyInfo] = useState({ userName: "", place: "", photoURL: "" });
  const [disInfo, setDisInfo] = useState({ kind: "", text: "", img: "", file: "", place: "", poster: "" });
  const [profile, setProfile] = useState({ name: "", furigana: "", gender: "", password: "", tel: "", auth: false, time: null });
  const [hitoInfo, setHitoInfo] = useState({ name: "", age: "", time: "", gender: "", place: "", tokutyou: "" });
  const [petInfo, setPetInfo] = useState({ name: "", time: "", place: "", tokutyou: "" });
  const [serch, setSerch] = useState('');

  return (
    <Router>
      <div className="container">
        <Navigation userData={userData} setProfile={setProfile} />
        <Routes>
          <Route path="/login/home" element={<Home myInfo={myInfo} setMyInfo={setMyInfo} setProf={setProf} serch={serch} setSerch={setSerch}/>} />
          <Route path="/login/username" element={<Username />} />
          <Route path="/login/serchplace" element={<SerchPlace setProf={setProf}/>} />
          <Route path="/login/home/search" element={<Serch prof={prof}/>} />
          <Route path="/login/home/profile" element={<Profile prof={prof} setProf={setProf} />} />
          <Route path="/login/home/addpost" element={<AddPost />} />
          <Route path="/login/home/addpost/mono" element={<Mono disInfo={disInfo} setDisInfo={setDisInfo} />} />
          <Route path="/login/home/addpost/mono/suremono" element={<SureMone disInfo={disInfo} setDisInfo={setDisInfo} myInfo={myInfo} />} />
          <Route path="/login/home/message" element={<Messeage />} />
          <Route path="/login/home/chat" element={<Chat />} />
          <Route path='/login/home/profile/pastpost' element={<PastPost/>}/>
          <Route path="/login/home/finder" element={<LostDetail /*activePost={activePost}*//>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
