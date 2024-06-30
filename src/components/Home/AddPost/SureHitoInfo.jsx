import React from 'react'
import { useNavigate } from 'react-router-dom'

function SureHitoInfo() {
    const navigation=useNavigate()
    const ok=()=>{
        navigation("/login/home")
    }
    const back=()=>{
      navigation("/login/home/addpost/hito")
    }
  return (
    <div>
      <button onClick={back}>戻る</button>
        <h1>情報を確認してね​</h1>
        <button onClick={ok}>確定する</button>
    </div>
  )
}

export default SureHitoInfo