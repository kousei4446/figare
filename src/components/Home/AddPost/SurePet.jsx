import React from 'react'
import { useNavigate } from 'react-router-dom'
import image from "../../img/image.png"

function SurePet() {
  const navigation = useNavigate()
  const back = () => {
    navigation("/login/home/addpost/pet")
  }
  const ok = () => {
    navigation("/login/home")
  }
  return (
    <div>
      <div className='blue'></div>
      <img src={image} height="50px" className='back-btn' onClick={back} />
      <h1>さっき入力した犬かその他の情報を確認してね​</h1>
      <button className='con-btn' onClick={ok}>確定する</button>
    </div>
  )
}

export default SurePet