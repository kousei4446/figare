import React from 'react'
import { useNavigate } from 'react-router-dom'

function Serch() {
    const navigate=useNavigate()
    const back=()=>{
        navigate("/login/home")
    }
  return (
    <div>
        <button onClick={back}>戻る</button>
        <h1>絞り込み検索</h1>
        種類：
        <input type="checkbox" id="1" />人
        <input type="checkbox" id="2" />ペット
        <input type="checkbox" id="3" />もの<br />
        性別：
        <input type="checkbox" id="1" />男性
        <input type="checkbox" id="2" />女性<br />
        名前：
        <input></input><br />
        場所：
        <input></input><br />
        目撃時間：
        <select>
          <option>午前</option>
          <option>午後</option>
        </select>
        <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
        </select>時
        <select>
          <option>0</option>
          <option>10</option>
          <option>20</option>
          <option>30</option>
          <option>40</option>
          <option>50</option>
        </select>分頃<br />
        <button>条件を適用</button>
    </div>
  )
}

export default Serch