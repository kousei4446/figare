import React from 'react'
import { useNavigate } from 'react-router-dom'
import image from "../../img/image.png"


function Mono() {
  const navigation =useNavigate()
  const next=()=>{
    navigation("/login/home/addpost/mono/suremono")
  }
  const back=()=>{
    navigation("/login/home/addpost")
  }
  return (
    <div>
      <div className='blue'></div>
      <img src={image} height="50px" className='back-btn' onClick={back} />
      <h1>mono</h1>
      <button className="ok-btn"onClick={next}>ok</button>
    </div>
  )
}

export default Mono