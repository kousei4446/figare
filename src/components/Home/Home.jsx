import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigation=useNavigate()
  const profilepage=()=>{
    navigation("/login/home/profile")
  }
  const serchpage=()=>{
    navigation("/login/home/search")
  }
  const addPost =()=>{
    navigation("/login/home/addpost")
  }
  const message=()=>{
    navigation("/login/home/finder")
  }
  const msgpage=()=>{
    navigation("/login/home/message")
  }
  return (
    <div>
      <div>
        <button onClick={profilepage}>プロフィール画面へ</button>
        <button onClick={serchpage}>探す</button>
      </div>
      <button onClick={message}>
        <div><img/></div>
        <div>
          <p>地区</p>
          <p>犬を見つけた</p>
          <p>日付</p>
        </div>
      </button>
      <div>
        <button onClick={msgpage}>メッセージ</button>
        <button onClick={addPost}>+</button>
      </div>
    </div>
  )
}

export default Home