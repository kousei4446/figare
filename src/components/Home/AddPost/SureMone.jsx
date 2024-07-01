import React from 'react'
import image from "../../img/image.png"
import { useNavigate } from 'react-router-dom'

function SureMone() {
  const navigation =useNavigate()
  const back=()=>{
    navigation("/login/home/addpost/mono")
  }
  const ok=()=>{
    navigation("/login/home/addpost")
  }
  return (
    <div>
      <div className='blue'></div>
      <img src={image} height="50px" className='back-btn' onClick={back} />
      <h1>情報の確認してね（もの）</h1>
      <button className="con-btn"onClick={ok}>確定する</button>
    </div>
  )
}

export default SureMone