import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// import Register from './components/newregester/Register';
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
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { signInWithPopup } from "firebase/auth";
import { db, auth, provider } from './firebase';
import anime from 'animejs/lib/anime.es.js';
import PastPost from './components/Home/PastPost/PastPost';

function App() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchAllUserData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserData(usersList);

        // console.log("All users data:", usersList);
      } catch (e) {
        console.error("Error getting documents: ", e);
      }
    };
    fetchAllUserData();

    const container = document.querySelector('.rogContainer');
    if (container) {
      for (let i = 0; i <= 50; i++) {
        const blocks = document.createElement('div');
        blocks.classList.add('block');
        container.appendChild(blocks);
      }
    }

    const animateBlocks = () => {
      anime({
        targets: '.block',
        translateX: () => anime.random(-400, 400),
        translateY: () => anime.random(-700, 700),
        scale: () => anime.random(1, 7),
        duration: 5000,
        delay: anime.stagger(10, { start: 1000 }),
        direction: 'alternate',
        easing: 'easeInOutQuad',
        complete: () => {
          setTimeout(animateBlocks, 2000);
        },
      });
    };

    animateBlocks();
  }, []);

  /*const [activePost,setActivePost]=useState({})*/
  const [prof,setProf]=useState({displayName:"",email:"",username:"", photoURL:"",place:""});
  const [myInfo,setMyInfo]=useState({userName:"",place:"",photoURL:""});
  const [disInfo, setDisInfo] = useState({ kind: "", text: "", img: "" ,file:"",place:"",poster:""});
  const [profile, setProfile] = useState({ name: "", furigana: "", gender: "", password: "", tel: "", auth: false,time:null });
  const [hitoInfo, setHitoInfo] = useState({ name: "", age: "", time: "", gender: "", place: "", tokutyou: "" });
  const [petInfo, setPetInfo] = useState({ name: "", time: "", place: "", tokutyou: "" });
  // const [register, setRegister] = useState({ tel: "", password: "", gender: "", name: "", furigana: "", username: "" ,place:""});

  return (
    <Router>
      <div className="container">
        <Navigation userData={userData} setProfile={setProfile} /*setRegister={setRegister}*//>
        <Routes>
        <Route path="/login/home" element={<Home /*setActivePost={setActivePost}*/ myInfo={myInfo} setMyInfo={setMyInfo}/>} />
          {/* <Route path="/login/register" element={<Register register={register} setRegister={setRegister} />} /> */}
          <Route path="/login/username" element={<Username />} />
          <Route path="/login/serchplace" element={<SerchPlace setProf={setProf}/>} />
          {/* <Route path="/login/serchplace" element={<SerchPlace register={register} setRegister={setRegister}/>} /> */}
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

function Navigation(/*{ userData, setProfile, setRegister }*/) {
  const location = useLocation();
  const navigate = useNavigate();

  // /login パス以降の場合はナビゲーションを表示しない
  if (location.pathname.startsWith('/login')) {
    return null;
  }
  if (localStorage.getItem("uid")){
    navigate("/login/home")
  }

  /* googleログイン */
  function SignInButton(prof, setProf) {
    const signInWithGoogle = () => {
      signInWithPopup(auth, provider)
      .then(async (result) => {
        navigate('/login/serchplace');
        // console.log('signin', result.user);
        const user = result.user;
        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        };
        localStorage.setItem("uid", user.uid);
        const docRef = doc(db, 'googleusers', user.uid);
        const docSnap=await getDoc(docRef);
        if (docSnap.exists()){
          await updateDoc(docRef, userData);
        }else{
          await setDoc(docRef, userData);
        }
        
      }).catch((error) => {
        console.log('signin error');
      });
    };

    return (
      <button className='rogButton' onClick={signInWithGoogle}>  
        <p> Googleでサインイン</p>
      </button>
    )
  }

  return (
    <div className='rogContainer'>
      <h2 className="rogTitle">Figare</h2>
      <nav className='mainlogin'>
        <SignInButton />
      </nav>
    </div>
  );
}

export default App;
