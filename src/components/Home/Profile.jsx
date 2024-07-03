import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Profile.css"
import image1 from "./../img/image.png"
import image2 from "./../img/profile-img.png"
import { collection, doc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

function Profile({ profile ,setProfile}) {

 
  const navigate = useNavigate()
  const back = () => {
    navigate("/login/home")
  }
  const logout = () => {
    navigate("/")
    localStorage.setItem("電話番号","")
  }
  
  useEffect(() => {
    const fetchAllUserData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const savedTel=JSON.parse(localStorage.getItem("電話番号"))
      if (savedTel){
        const foundUser=userList.find(user=>user.tel === savedTel);
        setProfile(foundUser)
        console.log(profile)
      }
    }
    fetchAllUserData();
  }, [])
  return (
    <div>
      <img src={image1} className='back_btn' onClick={back} />
      <h2 className='pro_title'>プロフィール</h2>
      <div className='profile_checker'>
        <label className='pro_item'>プロフィール画</label>
          <br></br>
          <div className='pro_content'>
            <img src={image2} className='pro_img'></img>
            <button className='pro_editbtn'>編集</button>
          </div>
        <div className='line'></div>

        <label className='pro_item'>名前</label>
          <br></br>
          <div className='pro_content'>
            <div className='pro_input'>{profile.name}</div>
            <button className='pro_editbtn'>編集</button>
          </div>
        <div className='line'></div>

        <label className='pro_item'>フリガナ</label>
          <br></br>
          <div className='pro_content'>
            <div className='pro_input'>{profile.furigana}</div>
            <button className='pro_editbtn'>編集</button>
          </div>
        <div className='line'></div>

        <label className='pro_item'>ユーザ名</label>
          <br></br>
          <div className='pro_content'>
            <div className='pro_input'>{profile.username}</div>
            <button className='pro_editbtn'>編集</button>
          </div>
        <div className='line'></div>

        <label className='pro_item'>性別</label>
          <br></br>
          <div className='pro_content'>
            <div className='pro_input'>{profile.gender}</div>
            <button className='pro_editbtn'>編集</button>
          </div>
        <div className='line'></div>

        <label className='pro_item'>電話番号</label>
          <br></br>
          <div className='pro_content'>
            <div className='pro_input'>{profile.tel}</div>
            <button className='pro_editbtn'>編集</button>
          </div>
        <div className='line'></div>

        <label className='pro_item'>パスワード</label>
          <br></br>
          <div className='pro_content'>
            <div className='pro_input'>{profile.password}</div>
            <button className='pro_editbtn'>編集</button>
          </div>
        <div className='line'></div>

      </div>
      <button className='logout_btn' onClick={logout}>ログアウト</button>
    </div>
  )
}

export default Profile