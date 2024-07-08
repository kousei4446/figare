import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import image from "../img/profile-img.png";
import { IoMdChatbubbles, IoMdSearch, IoMdAdd } from 'react-icons/io';
import { Timestamp, collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function Home({ myInfo, setMyInfo }) {
  const navigate = useNavigate();

  const profilepage = () => {
    navigate("/login/home/profile");
  }
  const serchpage = () => {
    navigate("/login/home/search");
  }
  const addPost = () => {
    navigate('/login/home/addpost/mono');
  };

  const message = async (post) => {
    localStorage.setItem("postid", post.id);
    navigate('/login/home/finder');
    const UID = localStorage.getItem("uid");
    const docRef = doc(db, "userChats", UID);
    const docSnap = await getDoc(docRef);
    const userDocRef=doc(db,"googleusers",post.poster)
    const userDocSnap=await getDoc(userDocRef)
    const myUserInfo=userDocSnap.data()

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        [post.poster]: {
          date: Timestamp.now(),
          userInfo: {
            photoURL: myUserInfo.photoURL,
            uid: post.poster,
            username: myUserInfo.username
          }
        }
      });
    } else {
      await setDoc(docRef, {
        [post.poster]: {
          date: Timestamp.now(),
          userInfo: {
            photoURL: myUserInfo.photoURL,
            uid: post.poster,
            username: myUserInfo.username
          }
        }
      });
    }

    const hisDocRef = doc(db, "userChats", post.poster);
    const hisDocSnap = await getDoc(hisDocRef);
    const hisUserDocRef=doc(db,"googleusers",UID)
    const hisUserDocSnap=await getDoc(hisUserDocRef)
    const hisUserInfo=hisUserDocSnap.data()
    if (hisDocSnap.exists()) {
      await updateDoc(hisDocRef, {
        [UID]: {
          date: Timestamp.now(),
          userInfo: {
            photoURL: hisUserInfo.photoURL,
            uid: UID,
            username: hisUserInfo.username
          }
        }
      });
    } else {
      await setDoc(hisDocRef, {
        [UID]: {
          date: Timestamp.now(),
          userInfo: {
            photoURL: hisUserInfo.photoURL,
            uid: UID,
            username: hisUserInfo.username
          }
        }
      });
    }
  };
  const msgpage = () => {
    navigate('/login/home/message');
  };

  useEffect(() => {
    const fetchGoogleUserData = async () => {
      const querySnapshot = await getDocs(collection(db, 'googleusers'));
      const userList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const savedUid = localStorage.getItem('uid');
      if (savedUid) {
        const foundUser = userList.find((user) => user.uid === savedUid);
        setMyInfo({ place: foundUser.place, photoURL: foundUser.photoURL, username: foundUser.displayName });
      }
    };

    fetchGoogleUserData();
  }, [setMyInfo]);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchAllPosts = async () => {
      const q = query(collection(db, 'Posts'), orderBy('time', 'desc'));
      const querySnapshot = await getDocs(q);
      const postList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const newPost = postList.filter((post) => post.place === myInfo.place);
      setPosts(newPost);
    };
    fetchAllPosts();
  }, [myInfo.place]);

  return (
    <div>
      <div className='background'>
        <img src={myInfo.photoURL || image} height='75px'width="75px" className='Icon' onClick={profilepage} alt='Profile' />
        <h3 className='main-title'>{myInfo.place && `${myInfo.place}の検索一覧`}</h3>
        <IoMdSearch onClick={serchpage} size={35} className='search' />
      </div>

      {posts.map((post, index) => (
        <div className='main-post' key={index}>
          <div onClick={() => message(post)} className='main-postcard'>
            <strong>{post.kind}</strong>
            <div>
              <img src={post.file} width='50%' alt='Post' />
            </div>
            <div>
              <p>{post.text}</p>
              <p>投稿時間: {post.time.toDate().toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}

      <div className='main-foot'>
        <IoMdChatbubbles onClick={msgpage} className='main-msg-btn' />
        <IoMdAdd onClick={addPost} className='add-postbtn' />
      </div>
    </div>
  );
}

export default Home;
