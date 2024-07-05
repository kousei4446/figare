import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Serch.css"

function Serch() {
    const navigate=useNavigate()
    const back=()=>{
        navigate("/login/home")
    }
    const ok=()=>{
        navigate("/login/home")
    }
  return (
    <div className='select-BackGround'>
        <button className='select-Back' onClick={back}>戻る</button>
          <h2 className='serch-Title'>絞り込み検索</h2>
          <table>
            <tbody>
              <tr>
                <td className='sS-Name'>種類</td>
                <td className='select-Seed'>
                <input 
                  type="radio" 
                  name="kind-box" 
                  id="hito" 
                  value="hito"/>人
                <input 
                  type="radio" 
                  name="kind-box" 
                  id="pet" 
                  value="pet"/>ペット
                <input 
                  type="radio" 
                  name="kind-box" 
                  id="mono" 
                  value="mono"/>もの
                </td>
              </tr>
              <tr>
                <td className='sG-Name'>性別</td>
                <td className='select-Gender'>
                <input 
                  type="radio" 
                  name="gender-box" 
                  id="male" 
                  value="male"/>男性
                <input 
                  type="radio" 
                  name="gender-box" 
                  id="female" 
                  value="female"/>女性
                <input 
                  type="radio" 
                  name="gender-box" 
                  id="others" 
                  value="others"/>その他
                </td>
              </tr>
              <tr>
                <td className='sN-Name'>名前</td>
                <td className='select-Name'>
                  <input></input>
                </td>
              </tr>
              <tr>
                <td className='sL-Name'>場所</td>
                <td className='select-Location'>
                  <input></input>
                </td>
              </tr>
              <tr>
                <td className='sT-Name'>目撃時間</td>
                <td className='select-Time'>
                  <select className="select-AorP">
                    <option value="am">午前</option>
                    <option value="pm">午後</option>
                  </select>
                  <select className="select-hour">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>時
                  <select className="select-minut">
                    <option value="Zero">0</option>
                    <option value="Ten">10</option>
                    <option value="Twenty">20</option>
                    <option value="Thirty">30</option>
                    <option value="Fourty">40</option>
                    <option value="Fifty">50</option>
                  </select>分頃
                </td>
              </tr>
            </tbody>
          </table>
        
        {/*<div className='select-Seed'>
          種類：
          <input type="radio" name="kind-box" id="hito" value="hito"/>人
          <input type="radio" name="kind-box" id="pet" value="pet"/>ペット
          <input type="radio" name="kind-box" id="mono" value="mono"/>もの<br />
        </div>
        <div className='select-Gender'>
          性別：
          <input type="radio" name="gender-box" id="male" value="male"/>男性
          <input type="radio" name="gender-box" id="female" value="female"/>女性
          <input type="radio" name="gender-box" id="others" value="others"/>その他<br />
        </div>
        <div className='select-Name'>
          名前：
          <input></input><br />
        </div>
        <div className='select-Location'>
          場所：
          <input></input><br />
        </div>
        <div className='select-Time'>
          目撃時間：
          <select className="select-AorP">
            <option value="am">午前</option>
            <option value="pm">午後</option>
          </select>
          <select className="select-hour">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>時
          <select className="select-minut">
            <option value="Zero">0</option>
            <option value="Ten">10</option>
            <option value="Twenty">20</option>
            <option value="Thirty">30</option>
            <option value="Fourty">40</option>
            <option value="Fifty">50</option>
          </select>分頃<br />
        </div>*/}
        <div className='Desition-poji'>
          <button className="select-Desition" onClick={ok}>条件を適用</button>
        </div>
    </div>
  )
}

export default Serch