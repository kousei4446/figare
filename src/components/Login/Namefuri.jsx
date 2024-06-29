import React from 'react'
import { useNavigate } from 'react-router-dom'

function Namefuri() {
  const navigete=useNavigate()
  const doClick=()=>{
    navigete("/login/gender")
  }
  return (
    <div>
        <h1>フリガナを入力してください</h1>
        <button onClick={doClick}>次へ</button>
    </div>
  )
}

export default Namefuri