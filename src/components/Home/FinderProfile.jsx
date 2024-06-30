import React from 'react'
import { useNavigate } from 'react-router-dom'

function FinderProfile() {
    const navigate=useNavigate()
    const back=()=>{
        navigate("/login/home")        
    }
    const msgpage=()=>{
        navigate("/login/home/chat")
    }
  return (
    <div>
        <button onClick={back}>戻る</button>
        <h1>見つけた人のプロフィールです</h1>
        <button onClick={msgpage}>メッセージを送信</button>
    </div>
  )
}

export default FinderProfile