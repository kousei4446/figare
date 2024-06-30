import React from 'react'
import { useNavigate } from 'react-router-dom'

function Messeage() {
    const navigation=useNavigate()
    const back=()=>{
        navigation("/login/home")
    }
    const chatpage=()=>{
        navigation("/login/home/chat/")
    }
  return (
    <div>
        <button onClick={back}>戻る</button>
        <h1>メッセージ一覧</h1>
        <button onClick={chatpage}>
            <h3>icon</h3>
            <p>新着メッセージ</p>
        </button>
    </div>
  )
}

export default Messeage