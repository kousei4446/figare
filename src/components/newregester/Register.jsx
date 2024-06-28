import React from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navgation=useNavigate()
  const complete=()=>{
    navgation("/login/username")
  }
  return (
    <div>
      <h1>新規登録</h1>
      <button onClick={complete}>登録</button>
    </div>
  )
}

export default Register