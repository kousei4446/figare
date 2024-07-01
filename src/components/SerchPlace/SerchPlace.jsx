import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Search.css";

function SerchPlace() {
  const navigate=useNavigate()
  const comp=()=>{
      navigate("/login/home")
  }
  return (
    <div>
      <h1 className='searchtitle' >探したい地区 or 発見した地区</h1>
      <select className='pulldown'>
        <option selected>選択してください</option>
        <optgroup label='北海道'>
          <option>北海道</option>
        </optgroup>
        <optgroup label='東北'>
          <option>青森県</option>
          <option>岩手県</option>
          <option>宮城県</option>
          <option>秋田県</option>
          <option>山形県</option>
          <option>福島県</option>
        </optgroup>
        <optgroup label='関東'>
          <option>茨城県</option>
          <option>栃木県</option>
          <option>群馬県</option>
          <option>埼玉県</option>
          <option>千葉県</option>
          <option>東京都</option>
          <option>神奈川県</option>
        </optgroup>
        <optgroup label='中部'>
          <option>新潟県</option>
          <option>富山県</option>
          <option>石川県</option>
          <option>福井県</option>
          <option>山梨県</option>
          <option>長野県</option>
          <option>岐阜県</option>
          <option>静岡県</option>
          <option>愛知県</option>
        </optgroup>
        <optgroup label='近畿'>
          <option>三重県</option>
          <option>滋賀県</option>
          <option>京都府</option>
          <option>大阪府</option>
          <option>兵庫県</option>
          <option>奈良県</option>
          <option>和歌山県</option>
        </optgroup>
        <optgroup label='中国'>
          <option>鳥取県</option>
          <option>島根県</option>
          <option>岡山県</option>
          <option>広島県</option>
          <option>山口県</option>
        </optgroup>
        <optgroup label='四国'>
          <option>徳島県</option>
          <option>香川県</option>
          <option>愛媛県</option>
          <option>高知県</option>
        </optgroup>
        <optgroup label='九州'>
          <option>福岡県</option>
          <option>佐賀県</option>
          <option>大分県</option>
          <option>宮崎県</option>
          <option>長崎県</option>
          <option>熊本県</option>
          <option>鹿児島県</option>
          <option>沖縄県</option>
        </optgroup>
        <option>その他</option>
      </select>
      <br></br>
      <button className='regionDecision' onClick={comp}>決定</button>
    </div>
  )
}

export default SerchPlace