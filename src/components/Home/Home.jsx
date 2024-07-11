import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import image from "../img/profile-img.png";
import { IoMdSearch, IoMdAdd } from 'react-icons/io';
import { Timestamp, collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FaCommentDots } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

const Home = ({ myInfo, setMyInfo }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isMyPost")) {
      localStorage.setItem("isMyPost", false)
    }
  }, [])
  useEffect(()=>{
    if (!localStorage.getItem("uid")){
      navigate("/")
    }
  },[])
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
    if (myInfo.place) {
      const fetchAllPosts = async () => {
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
      };
      fetchAllPosts();
    }
  }, [myInfo.place]);

  const profilepage = () => navigate("/login/home/profile");
  const serchpage = () => navigate("/login/home/search");
  const addPost = () => navigate('/login/home/addpost/mono');
  const msgpage = () => navigate('/login/home/message');

  const message = async (post, isMyPost) => {
    localStorage.setItem("postid", post.id);
    navigate('/login/home/finder');
    localStorage.setItem("isMyPost", isMyPost);
  };

  return (
    <div className="home-container">
      <div className='background'>
        <img src={myInfo.photoURL || image}  className='Icon' onClick={profilepage} alt='Profile' />
        <h3 className='main-title'>{myInfo.place && `${myInfo.place}の検索一覧`}</h3>
        <IoMdSearch onClick={serchpage} className='search' />
      </div>

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
              }} className='main-postcard'>
                <div className='post-username'>
                  <p>{post.userImg && <img src={post.userImg} width="40px" height="40px" alt="User" />}</p>
                  <strong>@{post.username}</strong>
                </div>
                <div className='post-main'>
                  <img src={post.file} width='130px' alt='Post' className='postimg' />
                  <div className='palce-and-toku'>
                    <div>
                      <p className='place'>{post.place}</p>
                    </div>
                    <p class Name='text'>{post.text}</p>
                  </div>
                </div>
                <div>
                  <p>{post.time.toDate().toLocaleString()}</p>
                  {/* <p>{post.poster === localStorage.getItem("uid") && "※これは自分の投稿です"}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      

      <div className='main-foot'>
        <FaCommentDots onClick={msgpage} className='main-msg-btn' />
        <IoEyeSharp onClick={()=>navigate("/login/home/profile/pastpost")} className='past-btn'/>
        <IoMdAdd onClick={addPost} className='add-postbtn' />
      </div>
    </div>
  );
}

export default Home;
