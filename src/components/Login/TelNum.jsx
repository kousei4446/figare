import React from 'react'
import { useNavigate } from 'react-router-dom'

function TelNum() {
  const navigate=useNavigate()
  const comp=()=>{
      navigate("/login/password")
  }
  return (
    <div>
        <h1>電話番号を入力してください</h1>
        <button onClick={comp}>次へ</button>
    </div>
  )
}

export default TelNum