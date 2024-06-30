import React from 'react'
import { useNavigate } from 'react-router-dom'

function SurePet() {
    const navigation =useNavigate()
    const back=()=>{
        navigation("/login/home/addpost/pet")
    }
    const ok=()=>{
        navigation("/login/home")
    }
  return (
    <div>
        <button onClick={back}>戻る</button>
        <h1>さっき入力した犬かその他の情報を確認してね​</h1>
        <button onClick={ok}>確定</button>
    </div>
  )
}

export default SurePet