import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Register.css";

function Register() {
  const navgation=useNavigate()
  const complete=()=>{
    navgation("/login/username")

  }
  return (
    <div className="regi_background">
      <div className='regi_rectangle'>
        <h2 className='regi_title'>新規登録</h2>
        <table>
          <tbody>
            <tr>
              <td className='regi_item'>お名前</td>
              <td><input className='regi_input'></input></td>
            </tr>
            <tr>
              <td className='regi_item'>フリガナ</td>
              <td><input className='regi_input'></input></td>
            </tr>
            <tr>
              <td className='regi_item'>性別</td>
              <td>
                <input type="radio" className='man' name='only'></input>
                  <label className='sexal'>男性</label>
                <input type="radio" className='woman' name='only'></input>
                  <label className='sexal'>女性</label>
                <input type="radio" className='no_response' name='only'></input>
                  <label className='sexal'>回答しない</label>
              </td>
            </tr>
            <tr>
              <td className='regi_item'>電話番号</td>
              <td><input className='regi_input'></input></td>
            </tr>
            <tr>
              <td className='regi_item'>パスワード</td>
              <td><input className='regi_input'></input></td>
            </tr>
          </tbody>
        </table>
        <p className='regi_attach'>＜顔写真の添付＞</p>
        <input type="file" className='regi_picture'></input>
        <button className='regi_button' onClick={complete}>登録</button>
      </div>
    </div>
  );
}

export default Register