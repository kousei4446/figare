import React from 'react'
import { useNavigate } from 'react-router-dom'

function LoginUsername() {
    const navigate=useNavigate()
    const comp=()=>{
        navigate("/login/serchplace")
    }
  return (
    <div>
        <h1>ユーザー名を入力してください</h1>
        <button onClick={comp}>決定</button>
    </div>
  )
}

export default LoginUsername