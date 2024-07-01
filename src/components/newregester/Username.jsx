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
        <h1 className='usernametitle'>ユーザー名を入力してください</h1>
        <input className='username' placeholder='ユーザー名'></input>
        <br></br>
        <button className='decision' onClick={comp}>決定</button>
    </div>
  )
}

export default Username