import React from 'react'
import { useNavigate } from 'react-router-dom'
import image from "../../img/image.png"
import image1 from "../../img/img1.jpg"
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../../../firebase'

function SureHitoInfo({ hitoInfo, profile, setProfile }) {
  const navigation = useNavigate()
  const ok = async () => {
    // setHitoInfo({name: "",age: "",time: "",gender: "",place: "",tokutyou: ""})
    navigation("/login/home")

    // const querySnapshot = await getDocs(collection(db, "users"));
    // const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // const savedTel = JSON.parse(localStorage.getItem("電話番号"))
    // if (savedTel) {
    //   const foundUser = userList.find(user => user.tel === savedTel);
    //   setProfile(foundUser)
    // }
    const hito = { ...hitoInfo, tel: JSON.parse(localStorage.getItem("電話番号")) }
    const docRef = doc(collection(db, 'Posts')); // 'users'はコレクション名、register.nameはドキュメントID
    await setDoc(docRef, hito);
  }
  const back = () => {
    navigation("/login/home/addpost/hito")
  }
  return (
    <div>
      <div className='blue'></div>
      <img src={image} height="50px" className='back-btn' onClick={back} />

      <p style={{ fontSize: "29px", marginTop: "0px", marginBottom: "0px", marginLeft: "5%" }}>情報を確認してね​</p>
      <div className='con-text'>
        <p>種類 : 人</p>
        <p>性別 : {hitoInfo.gender}</p>
        <p>写真 :</p>
        <p>　　　 <img src={image1} height="200px" /></p>
        <p>名前　　 : {hitoInfo.name}</p>
        <p>年齢　　 : {hitoInfo.age}</p>
        <p>場所　　 : {hitoInfo.place}</p>
        <p>目撃時間 : {hitoInfo.time}</p>
        <p>特徴　　 : {hitoInfo.tokutyou}</p>
      </div>
      <div className="okbtn-posi">
        <button onClick={ok} className='con-btn'>確定する</button>
      </div>
    </div>
  )
}

export default SureHitoInfo