import React from 'react'
import { useNavigate } from 'react-router-dom'
import image from "../../img/image.png"
import sampleimg from "../../img/sampleimg.png"


function SurePet({petInfo,setPetInfo}) {
  const navigation = useNavigate()
  const back = () => {
    navigation("/login/home/addpost/pet")
  }
  const ok = () => {
    navigation("/login/home")
    setPetInfo({name: "",time: "",place: "",tokutyou: ""})
  }
  return (
    
    <div>
      <div className='blue'></div>
      <img src={image} height="50px" className='back-btn' onClick={back} />

      <p style={{ fontSize: "29px", marginTop: "0px", marginBottom: "0px", marginLeft: "5%" }}>情報を確認してね​</p>
      <div className='con-text'>
        <p>種類 : ---</p>
        <p>写真 :</p>
        <p>　　　 <img src={sampleimg} height="200px" /></p>
        <p>名前　　 : {petInfo.name}</p>
        <p>場所　　 : {petInfo.place}</p>
        <p>目撃時間 : {petInfo.time}</p>
        <p>特徴　　 : {petInfo.tokutyou}</p>
      </div>
      <div className="okbtn-posi">
        <button onClick={ok} className='con-btn'>確定する</button>
      </div>
    </div>
  )
}

export default SurePet