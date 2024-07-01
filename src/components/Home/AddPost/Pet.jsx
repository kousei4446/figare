import React from 'react'
import { useNavigate } from 'react-router-dom'
import image from "../../img/image.png"

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
      <div className='blue'></div>
      <img src={image} height="50px" className='back-btn' onClick={back} />

        <h1>ペットかその他の情報を登録する画面です</h1>
        <button className="ok-btn"onClick={ok}>OK</button>
    </div>
  )
}

export default Pet