import React from 'react'
import { useNavigate } from 'react-router-dom'
import image from "../../img/image.png"


function SureHitoInfo() {
  const navigation = useNavigate()
  const ok = () => {
    navigation("/login/home")
  }
  const back = () => {
    navigation("/login/home/addpost/hito")
  }
  return (
    <div>
      <div className='blue'></div>
      <img src={image} height="50px" className='back-btn' onClick={back} />

      <h1>情報を確認してね​</h1>
      <button onClick={ok}>確定する</button>
    </div>
  )
}

export default SureHitoInfo