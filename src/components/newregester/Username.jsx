import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Username.css";

function Username() {
    const navigate=useNavigate()
    const comp=()=>{
        navigate("/login/serchplace");
    }
  return (
    <div>
      <div className='usernametitle'>
        <h1 className='title1'>ユーザー名を</h1>
        <h1 className='title2'>入力してください</h1>
      </div>
      <input className='username' placeholder='ユーザー名'></input>
      <br></br>
      <button className='decision' onClick={comp}>決定</button>
    </div>
  )
}

export default Username