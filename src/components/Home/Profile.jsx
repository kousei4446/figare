import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Profile.css"
import image1 from "./../img/image.png"
import image2 from "./../img/profile-img.png"


function Profile() {
    const navigate=useNavigate()
    const back=()=>{
        navigate("/login/home")
    }
    const logout=()=>{
      navigate("/")
    }
  return (
    <div>
      <img src={image1} className='back_btn' onClick={back} />
      <h2 className='pro_title'>プロフィール</h2>
      <div className='profile_checker'> 
        <label className='pro_item'>プロフィール画</label>
        <br></br>
          <img src={image2} className='pro_img'></img>
          <div className='line'></div>
        <label className='pro_item'>名前</label>
        <br></br>
          <div className='pro_input'>中井裕麻</div>
          <div className='line'></div>
        <label className='pro_item'>フリガナ</label>
        <br></br>
          <div className='pro_input'>ナカイユウマ</div>
          <div className='line'></div>
        <label className='pro_item'>ユーザ名</label>
        <br></br>
          <div className='pro_input'>yumachin</div>
          <div className='line'></div>
        <label className='pro_item'>性別</label>
        <br></br>
          <div className='pro_input'>男性</div>
          <div className='line'></div>
        <label className='pro_item'>電話番号</label>
        <br></br>
          <div className='pro_input'>070-1835-4783</div>
          <div className='line'></div>
        <label className='pro_item'>パスワード</label>
        <br></br>
          <div className='pro_input'>514514</div>
          <div className='line'></div>
      </div>
      <button className='logout_btn' onClick={logout}>ログアウト</button>
    </div>
  )
}

export default Profile