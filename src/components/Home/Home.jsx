import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import image from './../img/sampleimg.png';
import { IoMdChatbubbles, IoMdSearch, IoMdAdd } from 'react-icons/io';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';

function Home({ setActivePost, myInfo, setMyInfo }) {
  const navigate = useNavigate();
  const [place, setPlace] = useState("");
  const profilepage = () => {
    navigate('/login/home/profile');
  };
  const [toggle, setToggle] = useState(false);
  const serchpage = () => {
    navigate('/login/home/search');
    setToggle(!toggle);
  };
  const addPost = () => {
    navigate('/login/home/addpost/mono');
  };
  const message = (post) => {
    setActivePost({ ...post });
    navigate('/login/home/finder');
  };
  const msgpage = () => {
    navigate('/login/home/message');
  };

  useEffect(() => {
    const fetchAllUserData = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const savedTel = JSON.parse(localStorage.getItem('電話番号'));
      if (savedTel) {
        const foundUser = userList.find((user) => user.tel === savedTel);
        setPlace(foundUser);
        setMyInfo({ ...myInfo, place: foundUser });
      }
    };

    const fetchGoogleUserData = async () => {
      const querySnapshot = await getDocs(collection(db, 'googleusers'));
      const userList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const savedUid = localStorage.getItem('uid');
      if (savedUid) {
        const foundUser = userList.find((user) => user.uid === savedUid);
        console.log(foundUser);
        setMyInfo({ ...myInfo, photoURL: foundUser.photoURL, name: foundUser.displayName });
      }
    };

    fetchAllUserData();
    fetchGoogleUserData();
  }, []);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchAllPosts = async () => {
      const q = query(collection(db, 'Posts'), orderBy('time', 'desc'));
      const querySnapshot = await getDocs(q);
      const postList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postList);
    };
    fetchAllPosts();
  }, []);

  return (
    <div>
      <div className='background'>
        <img src={myInfo.photoURL || image} height='75px' className='Icon' onClick={profilepage} alt='Profile' />
        <h3 className='main-title'>{place.place && place.place}の検索一覧</h3>
        <IoMdSearch onClick={serchpage} size={35} className='search' />
      </div>

      {posts.map((post, index) => {
        return (
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
        );
      })}

      <div className='main-foot'>
        <IoMdChatbubbles onClick={msgpage} className='main-msg-btn' />
        <IoMdAdd onClick={addPost} className='add-postbtn' />
      </div>
    </div>
  );
}

export default Home;
