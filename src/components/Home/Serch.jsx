import React from 'react'
import { useNavigate } from 'react-router-dom'

function Serch() {
    const navigate=useNavigate()
    const back=()=>{
        navigate("/login/home")
    }
  return (
    <div>
        <button onClick={back}>戻る</button>
        <h1>絞り込み検索</h1>

        <button>条件を適用</button>
    </div>
  )
}

export default Serch