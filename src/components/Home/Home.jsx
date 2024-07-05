import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Home.css";
import image from "./../img/sampleimg.png"
import { IoMdChatbubbles } from 'react-icons/io';
import { IoMdSearch } from 'react-icons/io';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { IoMdAdd } from 'react-icons/io';

function Home() {
  const navigation = useNavigate()
  const [place, setPlace] = useState("")
  const profilepage = () => {
    navigation("/login/home/profile")
  }
  const [toggle, setToggle]=useState(false);
  const serchpage = () => {
    navigation("/login/home/search")
    setToggle(!toggle);
  }
  const addPost = () => {
    navigation("/login/home/addpost/mono")
  }
  const message = () => {
    navigation("/login/home/finder")
  }
  const msgpage = () => {
    navigation("/login/home/message")
  }
  useEffect(() => {
    const fetchAllUserData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const savedTel = JSON.parse(localStorage.getItem("電話番号"))
      if (savedTel) {
        const foundUser = userList.find(user => user.tel === savedTel);
        setPlace(foundUser)
        // console.log(savedTel)
      }
    }

    fetchAllUserData();
  }, [])
  return (
    <div>
      <div className='background'>
        <img src={image} height="75px" className="Icon" onClick={profilepage} />
        <h3 className='main-title'>{place.place && place.place}の検索一覧</h3>
        < IoMdSearch onClick={serchpage} size={35} className='search' />
      </div>

      <div className='main-post'>
        <div onClick={message} className='main-postcard'>
          <div><img /></div>
          <div>
            <p>犬を見つけた</p>
            <p>日付</p>
          </div>
        </div>
        <div onClick={message} className='main-postcard'>
          <div><img /></div>
          <div>
            <p>犬を見つけた</p>
            <p>日付</p>
          </div>
        </div>
        <div onClick={message} className='main-postcard'>
          <div><img /></div>
          <div>
            <p>犬を見つけた</p>
            <p>日付</p>
          </div>
        </div>
        <div onClick={message} className='main-postcard'>
          <div><img /></div>
          <div>
            <p>犬を見つけた</p>
            <p>日付</p>
          </div>
        </div>
        <div onClick={message} className='main-postcard'>
          <div><img /></div>
          <div>
            <p>犬を見つけた</p>
            <p>日付</p>
          </div>
        </div>
        <div onClick={message} className='main-postcard'>
          <div><img /></div>
          <div>
            <p>犬を見つけた</p>
            <p>日付</p>
          </div>
        </div>
        
      </div>
       
 

      <div className='main-foot'>
        <IoMdChatbubbles onClick={msgpage} className='main-msg-btn' />
        <></>
        <IoMdAdd onClick={addPost} className='add-postbtn' />
      </div>
    </div>
  )
}

export default Home