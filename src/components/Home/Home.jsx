import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import image from "../img/profile.jpeg";
import { IoMdSearch, IoMdAdd } from 'react-icons/io';
import { Timestamp, collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { FaCommentDots } from "react-icons/fa";
import { FaRegListAlt } from "react-icons/fa";
import { regions } from '../../RegionData';
import { FcCustomerSupport } from "react-icons/fc";

const Home = ({ myInfo, setMyInfo, setProf, serch, setSerch }) => {
  const [posts, setPosts] = useState([]);

  const [HF, setHF] = useState(false);
  const [PF, setPF] = useState(false);
  const [MF, setMF] = useState(false);
  const [modal, setModal] = useState(false);
  const [cnt, setCnt] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isMyPost")) {
      localStorage.setItem("isMyPost", false)
    }
  }, [name])
  useEffect(() => {
    if (!localStorage.getItem("uid")) {
      navigate("/")
    }
  }, [name])
  useEffect(() => {
    const fetchGoogleUserData = async () => {
      const savedUid = localStorage.getItem('uid');
      if (savedUid) {
        const userDocRef = doc(db, "googleusers", savedUid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setMyInfo({ place: userData.place, photoURL: userData.photoURL, username: userData.displayName });
        }
      }
    };
    fetchGoogleUserData();
  }, [setMyInfo]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      if (!serch || serch == "all") {
        const q = query(collection(db, 'Posts'), orderBy('time', 'desc'));
        const querySnapshot = await getDocs(q);
        const postList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const newPost = postList.filter(post => post.place === myInfo.place);

        const updatedPosts = await Promise.all(newPost.map(async post => {
          const userDocRef = doc(db, "googleusers", post.poster);
          const userDocSnap = await getDoc(userDocRef);
          const userInfo = userDocSnap.data();
          return { ...post, username: userInfo.username, userImg: userInfo.photoURL };
        }));
        setPosts(updatedPosts);
        setCnt(newPost.length);
      }
      else {
        const prefRef = collection(db, "Posts");
        const q = query(prefRef, orderBy('time', 'desc'));
        const querySnapshot = await getDocs(q);
        const filteredPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const filterResult = filteredPosts.filter((item) => item.kind === serch && item.place === myInfo.place);

        const updatedPosts = await Promise.all(filterResult.map(async post => {
          const userDocRef = doc(db, "googleusers", post.poster);
          const userDocSnap = await getDoc(userDocRef);
          const userInfo = userDocSnap.data();
          return { ...post, username: userInfo.username, userImg: userInfo.photoURL };
        }));
        setPosts(updatedPosts);
        setCnt(filterResult.length);
        if (serch === "人") {
          setHF(true)
        }
        else if (serch === "ペット") {
          setPF(true)
        }
        else if (serch === "もの") {
          setMF(true)
        }
      }
    };
    fetchAllPosts();
  }, [myInfo.place], [serch]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      if (!serch || serch == "all") {
        const q = query(collection(db, 'Posts'), orderBy('time', 'desc'));
        const querySnapshot = await getDocs(q);
        const postList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const newPost = postList.filter(post => post.place === myInfo.place);

        const updatedPosts = await Promise.all(newPost.map(async post => {
          const userDocRef = doc(db, "googleusers", post.poster);
          const userDocSnap = await getDoc(userDocRef);
          const userInfo = userDocSnap.data();
          return { ...post, username: userInfo.username, userImg: userInfo.photoURL };
        }));
        setPosts(updatedPosts);
        setCnt(newPost.length);
      }
      else {
        const prefRef = collection(db, "Posts");
        const q = query(prefRef, orderBy('time', 'desc'));
        const querySnapshot = await getDocs(q);
        const filteredPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const filterResult = filteredPosts.filter((item) => item.kind === serch && item.place === myInfo.place);

        const updatedPosts = await Promise.all(filterResult.map(async post => {
          const userDocRef = doc(db, "googleusers", post.poster);
          const userDocSnap = await getDoc(userDocRef);
          const userInfo = userDocSnap.data();
          return { ...post, username: userInfo.username, userImg: userInfo.photoURL };
        }));
        setPosts(updatedPosts);
        setCnt(filterResult.length);
        if (serch === "人") {
          setHF(true)
        }
        else if (serch === "ペット") {
          setPF(true)
        }
        else if (serch === "もの") {
          setMF(true)
        }
      }
    };
    fetchAllPosts();
  }, [serch], [myInfo.place]);

  const serchpage = () => {
    if (modal === false) {
      setProf({ place: myInfo.place });
      openModal();
      setModal(true);
      // navigate("/login/home/search");
    }
    else {
      closeModal();
      setModal(false);
    }
  }
  const closeModal = () => {
    document.getElementById('search').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  }
  const openModal = () => {
    document.getElementById('search').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
  }

  const handleSerch = (type) => {
    setSerch(type === serch ? 'all' : type);
  };

  const changeHF = () => {
    if (HF === false) {
      setHF(true);
      setPF(false);
      setMF(false);
    }
    else {
      setHF(false);
    }
  };

  const changePF = () => {
    if (PF === false) {
      setHF(false);
      setPF(true);
      setMF(false);
    }
    else {
      setPF(false);
    }
  };
  const changeMF = () => {
    if (MF === false) {
      setHF(false);
      setPF(false);
      setMF(true);
    }
    else {
      setMF(false);
    }
  };

  const profilepage = () => navigate("/login/home/profile");
  const addPost = () => navigate('/login/home/addpost/mono');
  const msgpage = () => navigate('/login/home/message');

  const message = async (post, isMyPost) => {
    localStorage.setItem("postid", post.id);
    navigate('/login/home/finder');
    localStorage.setItem("isMyPost", isMyPost);
  };

  const placeChange = (e) => {
    const { value } = e.target;
    setMyInfo(prevState => ({
      ...prevState,
      place: value
    }));
    const placeset = async () => {
      const Uid = localStorage.getItem('uid');
      const userDocRef = doc(db, "googleusers", Uid)
      await updateDoc(userDocRef, {
        place: value
      });
      // console.log(myInfo);
    }
    placeset();

  }
  const [isMsg, setIsMsg] = useState(false)
  useEffect(() => {
    async function fetchDocuments() {
      // コレクション名を指定
      const collectionName = "chats";
      const colRef = collection(db, collectionName);

      // コレクション内の全ドキュメントを取得
      const querySnapshot = await getDocs(colRef);

      // ドキュメント ID をフィルタリング
      const matchingDocs = querySnapshot.docs.filter(doc => doc.id.includes(localStorage.getItem("uid")));

      // 結果を表示
      matchingDocs.forEach(doc => {
        // console.log(`Document ID: ${doc.id}`);
        // console.log('Document Data:', doc.data().message[doc.data().message.length - 1]);
        // console.log('Document Data:', doc.data().message[doc.data().message.length - 1].checked);
        if (localStorage.getItem("uid") !== doc.data().message[doc.data().message.length - 1].sender) {
          if (!doc.data().message[doc.data().message.length - 1].checked) {
            setIsMsg(true)
          }
        }
      });
    }

    fetchDocuments();
  }, []); // Add de
  return (
    <div className="home-container">
      <div className='background'>
        <img src={myInfo.photoURL || image} className='Icon' onClick={profilepage} alt='Profile' />
        <h3 className='main-title'>{myInfo.place && `${myInfo.place}の検索一覧`}</h3>
        <IoMdSearch onClick={serchpage} className='search' />
      </div><br />
      <div className='backsr'>
        <div className='serchresult'>
          {!serch || serch == "all" ?
            <div>
              検索結果：{cnt}件
            </div>
            :
            <div>
              {serch}の検索結果：{cnt}件
            </div>
          }
          {/* 検索結果：{cnt}件 */}
        </div>

      </div>
      {modal ? (
        <div>
          <div id="overlay" className='overlays'></div>
          <div id="search" className='diasearch'>
            <h3 className='diatext'>絞り込み検索</h3>
            <button
              onClick={() => { changeHF(), handleSerch('人') }}
              className={HF ? 'selected' : 'Select-btn'}
            >人
            </button>
            <button
              onClick={() => { changePF(), handleSerch('ペット') }}
              className={PF ? 'selected' : 'Select-btn'}
            >ペット
            </button>
            <button
              onClick={() => { changeMF(), handleSerch('もの') }}
              className={MF ? 'selected' : 'Select-btn'}
            >もの
            </button><br /><br />
            <div>
              <select
                name='place'
                value={myInfo.place}
                onChange={placeChange}>
                <option value="" disabled>選択してください</option>
                {regions.map((region, index) => (
                  <optgroup key={index} label={region.label}>
                    {region.options.map((option, idx) => (
                      <option key={idx} value={option}>{option}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div id="overlay" /> <div id="search" />
        </div>
      )}

      <div className='home-background'>
        <div className='main-content'>
          {posts.map((post, index) => (
            <div className='main-post' key={index}>
              <div onClick={() => {
                if (post.poster === localStorage.getItem("uid")) {
                  message(post, post.poster === localStorage.getItem("uid"));
                } else {
                  message(post, post.poster === localStorage.getItem("uid"));
                }
              }}className='main-postcard'>
                <img src={post.file} className='postimg' alt='Post' />
                <div className='post-void'></div>
                <div className='post-main'>
                  <div className='post-username'>
                    <div>{post.userImg &&
                      <img src={post.userImg} alt="User" />}
                    </div>
                    <strong>@{post.username}</strong>
                  </div>
                  <div className='post-text' id="post-textId">{post.text.length > 50 ? `${post.text.slice(0, 50)}....` : post.text}</div>
                  <div className='post-time'>
                    <div>{post.time.toDate().toLocaleString()}</div>
                    {/* <p>{post.poster === localStorage.getItem("uid") && "※これは自分の投稿です"}</p> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className='main-foot'>
        <div style={{display:"flex"}}>
          <FaCommentDots onClick={msgpage} className='main-msg-btn' />
          {isMsg && <p style={{backgroundColor:"red",height:"10px",width:"10px",borderRadius:"50%"}}></p>}
        </div>
        <FaRegListAlt onClick={() => navigate("/login/home/profile/pastpost")} className='past-btn' />
        <IoMdAdd onClick={addPost} className='add-postbtn' />
        <a href='https://forms.gle/GnaeiD8MVhGDeCxi9' target="_blank" rel="noopener noreferrer"><FcCustomerSupport className='add-formbtn' /></a>
      </div>
    </div>
  );
}

export default Home;
