import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// import Register from './components/newregester/Register';
import Login from './components/Login/Login';
import "./App.css";
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
import AddPost from './components/Home/AddPost/AddPost';
import Hito from './components/Home/AddPost/Hito';
import SureHitoInfo from './components/Home/AddPost/SureHitoInfo';
import Messeage from './components/Home/Message/Messeage';
import Chat from './components/Home/Message/Chat';
import Pet from './components/Home/AddPost/Pet';
import SurePet from './components/Home/AddPost/SurePet';
import Mono from './components/Home/AddPost/Mono';
import LostDetail from "./components/LostDetail/LostDeatail";
import SureMone from './components/Home/AddPost/SureMone';
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { signInWithPopup } from "firebase/auth";
// import { useAuthState} from "react-firebase-hooks/auth";
import { db, auth, provider } from './firebase';
import anime from 'animejs/lib/anime.es.js';

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
  const [myInfo,setMyInfo]=useState({userName:"",place:"",photoURL:""})
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
        <Route path="/login" element={<Login />} />
          {/* <Route path="/login/register" element={<Register register={register} setRegister={setRegister} />} /> */}
          <Route path="/login/username" element={<Username />} />
          <Route path="/login/serchplace" element={<SerchPlace />} />
          {/* <Route path="/login/serchplace" element={<SerchPlace register={register} setRegister={setRegister}/>} /> */}
          <Route path="/login/namekanji" element={<Name />} />
          <Route path="/login/namefurigana" element={<Namefuri />} />
          <Route path="/login/gender" element={<Gender />} />
          <Route path="/login/telephonenumber" element={<TelNum />} />
          <Route path="/login/password" element={<Password />} />
          <Route path="/login/usernamed" element={<LoginUsername />} />
          <Route path="/login/home/search" element={<Serch />} />
          <Route path="/login/home/profile" element={<Profile userData={userData} setUserData={setUserData} />} />
          <Route path="/login/home/addpost" element={<AddPost />} />
          <Route path="/login/home/addpost/hito" element={<Hito hitoInfo={hitoInfo} setHitoInfo={setHitoInfo} />} />
          <Route path="/login/home/addpost/hito/SureHitoInfo" element={<SureHitoInfo hitoInfo={hitoInfo} setHitoInfo={setHitoInfo} />} />
          <Route path="/login/home/addpost/pet" element={<Pet petInfo={petInfo} setPetInfo={setPetInfo} />} />
          <Route path="/login/home/addpost/pet/surepet" element={<SurePet petInfo={petInfo} setPetInfo={setPetInfo} />} />
          <Route path="/login/home/addpost/mono" element={<Mono disInfo={disInfo} setDisInfo={setDisInfo} />} />
          <Route path="/login/home/addpost/mono/suremono" element={<SureMone disInfo={disInfo} setDisInfo={setDisInfo} myInfo={myInfo} />} />
          <Route path="/login/home/message" element={<Messeage />} />
          <Route path="/login/home/chat" element={<Chat />} />
          <Route path="/login/home/finder" element={<LostDetail /*activePost={activePost}*//>} />
        </Routes>
      </div>
    </Router>
  );
}

function Navigation(/*{ userData, setProfile, setRegister }*/) {
  const location = useLocation();
  const navigate = useNavigate();
  // const [tel, setTel] = useState("");
  // const [password, setPassword] = useState("");

  // const [user] = useAuthState(auth);

  // const login = () => {
  //   const user = userData.find(user => user.tel === tel && user.password === password);
  //   if (user) {
  //     // console.log(user.name)
  //     navigate('/login/serchplace');
  //     localStorage.setItem("電話番号", JSON.stringify(user.tel));
  //     setRegister( {tel: user.tel, password: user.password, gender: user.gender, name: user.name, furigana: user.furigana, username: user.username ,place:user.place})
  //     setProfile({ name: user.name, furigana: user.furigana, gender: user.gender, password: user.password, tel: user.tel });
  //   } else {
  //     window.alert("正しくないです");
  //   }
  // };

  // /login パス以降の場合はナビゲーションを表示しない
  if (location.pathname.startsWith('/login')) {
    return null;
  }

  /* googleログイン */
  function SignInButton() {
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
        await updateDoc(docRef, userData);
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
