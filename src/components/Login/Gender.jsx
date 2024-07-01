import React from 'react'
import { useNavigate } from 'react-router-dom'

function Gender() {
  const navigete=useNavigate()
  const doClick=()=>{
    navigete("/login/telephonenumber")
  }
  return (
    <div>
        <h1>性別を選択してください</h1>
        <button onClick={doClick}>次へ</button>
    </div>
  )
}

export default Gender