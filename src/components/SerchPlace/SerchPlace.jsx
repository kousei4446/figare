import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Search.css";
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function SerchPlace() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const navigate = useNavigate();

  const regions = [
    { label: '北海道', options: ['北海道'] },
    { label: '東北', options: ['青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'] },
    { label: '関東', options: ['茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県'] },
    { label: '中部', options: ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県'] },
    { label: '近畿', options: ['三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'] },
    { label: '中国', options: ['鳥取県', '島根県', '岡山県', '広島県', '山口県'] },
    { label: '四国', options: ['徳島県', '香川県', '愛媛県', '高知県'] },
    { label: '九州', options: ['福岡県', '佐賀県', '大分県', '宮崎県', '長崎県', '熊本県', '鹿児島県', '沖縄県'] },
    { label: 'その他', options: ['その他'] }
  ];

  const handleChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const comp = async (e) => {
    if (selectedRegion) {
      console.log(selectedRegion);
      
      const UID = localStorage.getItem("uid")
      const docRef = doc(db, "googleusers", UID )
      const docSnap=await getDoc(docRef);
      let data=docSnap.data();
      if (data.username){
        navigate('/login/home');
      }else{
        navigate("/login/username")
      }
      await updateDoc(docRef, {
        place: selectedRegion
      });
      console.log(docRef)
      console.log("ok")
      // const { name } = e.target;
      // setUserData(prevState => ({
      //   ...prevState,
      //   [name]: userData.selectedRegion
      // }))
      
      // const updateddisInfo = { ...disInfo, place: selectedRegion };
      // setDisInfo(updateddisInfo);
      // const docRef = doc(db, 'Posts');
      // await setDoc(docRef, updateddisInfo);
      
      
    } else {
      alert('地区を選択してください。');
    }
  };


  return (
    <div className='searchPlace'>
      <div className='searchtitle'>
        <h1 className='find'>探したい地区</h1>
        <h1 className='or'>or</h1>
        <h1 className='detect'>発見した地区</h1>
      </div>
      <select className='pulldown' value={selectedRegion} onChange={handleChange} name='place'>
        <option value="" disabled>選択してください</option>
        {regions.map((region, index) => (
          <optgroup key={index} label={region.label}>
            {region.options.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </optgroup>
        ))}
      </select>
      <br />
      <button className='searchDecision' onClick={comp} style={{ marginTop: "265px" }}>決定</button>
    </div>
  );
}

export default SerchPlace;