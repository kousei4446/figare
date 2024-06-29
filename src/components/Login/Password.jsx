import React from 'react'
import { useNavigate } from 'react-router-dom'

function Password() {
  const navigate=useNavigate()
  const comp=()=>{
      navigate("/login/usernamed")
  }
  return (
    <div>
        <h1>パスワードを入力してください</h1>
        <button onClick={comp}>次へ</button>
    </div>
  )
}

export default Password