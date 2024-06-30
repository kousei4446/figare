import React from 'react'
import { useNavigate } from 'react-router-dom'

function Pet() {
    const navigation=useNavigate()
    const back=()=>{
        navigation("/login/home/addpost")
    }
    const ok=()=>{
        navigation("/login/home/addpost/pet/surepet")
    }
  return (
    <div>
        <button onClick={back}>戻る</button>
        <h1>ペットかその他の情報を登録する画面です</h1>
        <button onClick={ok}>OK</button>
    </div>
  )
}

export default Pet