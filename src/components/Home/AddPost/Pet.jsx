import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from "../../img/image.png";
import sampleimg from "../../img/sampleimg.png";

function Pet({ petInfo, setPetInfo }) {
  const navigation = useNavigate();
  
  const back = () => {
    navigation("/login/home/addpost");
  }

  const ok = () => {
    navigation("/login/home/addpost/pet/surepet");
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div>
      <div className='blue'></div>
      <div className='dis-head'>
        <img src={image} height='50px' className='back-btn' onClick={back} alt='戻る' />
        <div style={{ textAlign: "center", width: "100vw" }}>
          <p style={{ fontSize: '28px' }}>詳細情報を入力してね</p>
        </div>
      </div>
      <div>
        <div className='inputran'>
          <p>種類：</p>
          <input
            type='radio'
            name='type'
            id='dog'
            value="犬"
            checked={petInfo.type === '犬'}
            onChange={handleInputChange}
          />
          <label htmlFor='dog'>犬</label>
          <input
            type='radio'
            name='type'
            id='cat'
            value='猫'
            checked={petInfo.type === '猫'}
            onChange={handleInputChange}
          />
          <label htmlFor='cat'>猫</label>
          <input
            type='radio'
            name='type'
            id='other'
            value='その他'
            checked={petInfo.type === 'その他'}
            onChange={handleInputChange}
          />
          <label htmlFor='other'>その他</label>
        </div>
        <div className='inputran'></div>
      </div>
      <div className='maigoimg'>
        <img src={sampleimg} height="200px" alt='サンプル画像'/>
      </div>
      <div>
        <div className='dis-info'>
          <div className="name">
            <label>　　名前　:</label>
            <input
              type='text'
              name='name'
              value={petInfo.name}
              onChange={handleInputChange}
            />
          </div>
          <div className='name'>
            <label>　　場所　:</label>
            <input
              type='text'
              name='place'
              value={petInfo.place}
              onChange={handleInputChange}
            />
          </div>
          <div className='name'>
            <label>　目撃時間:</label>
            <input
              type='text'
              name='time'
              value={petInfo.time}
              onChange={handleInputChange}
            />
          </div>
          <div className='tokuryou'>
            <label>特徴 :</label>
            <textarea
              className='tokutyou-area'
              name='tokutyou'
              value={petInfo.tokutyou}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='okbtn-posi'>
          <button className='ok-btn' onClick={ok}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default Pet;
