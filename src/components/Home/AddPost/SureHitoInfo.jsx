import React from 'react'
import { useNavigate } from 'react-router-dom'
import image from "../../img/image.png"
import image1 from "../../img/img1.jpg"

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

      <p style={{ fontSize: "29px", marginTop: "0px",marginBottom:"0px", marginLeft: "5%" }}>情報を確認してね​</p>
      <div className='con-text'>
        <p>種類 : 人</p>
        <p>性別 : ---</p>
        <p>写真 :</p>
        <p>　　　 <img src={image1} height="200px" /></p>
        <p>名前　　 : ---</p>
        <p>場所　　 : ---</p>
        <p>目撃時間 : ---</p>
        <p>特徴　　 : ---</p>
      </div>
      <div className="okbtn-posi">
        <button onClick={ok} className='con-btn'>確定する</button>
      </div>
    </div>
  )
}

export default SureHitoInfo