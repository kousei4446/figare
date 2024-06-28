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
  return (
    <div>
      <div>
        <button onClick={profilepage}>プロフィール画面へ</button>
        <button onClick={serchpage}>探す</button>
      </div>
      <div>
        <button onClick={addPost}>+</button>
      </div>
    </div>
  )
}

export default Home