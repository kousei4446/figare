import React from 'react'
import { useNavigate } from 'react-router-dom'

function Serch() {
    const navigate=useNavigate()
    const back=()=>{
        navigate("/login/home")
    }
    const ok=()=>{
        navigate("/login/home")
    }
  return (
    <div>
        <button onClick={back}>戻る</button>
        <h1>絞り込み検索</h1>
        種類：
        <input type="radio" name="kind-box" id="hito" value="hito"/>人
        <input type="radio" name="kind-box" id="pet" value="pet"/>ペット
        <input type="radio" name="kind-box" id="mono" value="mono"/>もの<br />
        性別：
        <input type="radio" name="gender-box" id="male" value="male"/>男性
        <input type="radio" name="gender-box" id="female" value="female"/>女性
        <input type="radio" name="gender-box" id="others" value="others"/>その他<br />
        名前：
        <input></input><br />
        場所：
        <input></input><br />
        目撃時間：
        <select name="select-AorP">
          <option value="am">午前</option>
          <option value="pm">午後</option>
        </select>
        <select name="select-hour">
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
        <select name="select-minut">
          <option value="Zero">0</option>
          <option value="Ten">10</option>
          <option value="Twenty">20</option>
          <option value="Thirty">30</option>
          <option value="Fourty">40</option>
          <option value="Fifty">50</option>
        </select>分頃<br />
        <button onClick={ok}>条件を適用</button>
    </div>
  )
}

export default Serch