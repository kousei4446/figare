import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Register.css";

function Register() {
  const navgation=useNavigate()
  const complete=()=>{
    navgation("/login/username")

  }
  return (
    <div>
      <h1 className='Regtitle'>新規登録</h1>
      <div className='Reginput'>
        お名前：
        <input></input><br/>
        フリガナ：
        <input></input><br/>
        性別：
        <input type="checkbox" id = "1"/>男性
        <input type="checkbox" id = "2"/>女性<br/>
        電話番号：
        <input></input><br/>
        パスワード：
        <input></input><br/>
      </div><br/>
      <div className='reg'>
        <button onClick={complete} className='Reg'>登録</button>
      </div>
    </div>
  )
}

export default Register