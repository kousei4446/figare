import React from 'react'
import { useNavigate } from 'react-router-dom'

function Chat() {
    const navigation =useNavigate()
    const back=()=>{
        navigation("/login/home/message")
    }
  return (
    <div>
        <button onClick={back}>戻る</button>
        <h1>Chat</h1>
    </div>
  )
}

export default Chat