import React from 'react'
import { useNavigate } from 'react-router-dom'

function Name() {
  const navigete=useNavigate()
  const doClick=()=>{
    navigete("/login/namefurigana")
  }
  return (
    <div>
        <h1>お名前を入力してください</h1>
        <button onClick={doClick}>次へ</button>
    </div>
  )
}

export default Name