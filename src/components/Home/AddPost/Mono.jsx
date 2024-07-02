import React from 'react'
import { useNavigate } from 'react-router-dom'
import image from "../../img/image.png"
import sampleimg from "../../img/sampleimg.png"


function Mono({monoInfo,setMonoInfo}) {
  const navigation = useNavigate()
  const ok = () => {
    navigation("/login/home/addpost/mono/suremono")
  }
  const back = () => {
    navigation("/login/home/addpost")
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMonoInfo(prevState => ({
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
            value={monoInfo.name}
            onChange={handleInputChange}
          />
        </div>
        <div className='name'>
          <label>　　場所　:</label>
          <input
            type='text'
            name='place'
            value={monoInfo.place}
            onChange={handleInputChange}
          />
        </div>
        <div className='name'>
          <label>　目撃時間:</label>
          <input
            type='text'
            name='time'
            value={monoInfo.time}
            onChange={handleInputChange}
          />
        </div>
        <div className='tokuryou'>
          <label>特徴 :</label>
          <textarea
            className='tokutyou-area'
            name='tokutyou'
            value={monoInfo.tokutyou}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className='okbtn-posi'>
        <button className='ok-btn' onClick={ok}>OK</button>
      </div>
    </div>
  </div>
  )
}

export default Mono