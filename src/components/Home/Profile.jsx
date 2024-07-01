import React from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const navigate=useNavigate()
    const back=()=>{
        navigate("/login/home")
    }
  return (
    <div>
        <button onClick={back}>戻る</button>
        <h1>プロフィール</h1>
    </div>
  )
}

export default Profile