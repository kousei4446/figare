import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import image from "../../img/image.png";

function Mono({ disInfo, setDisInfo }) {
  const navigate = useNavigate();

  // デフォルトで"もの"を選択するための初期値設定
  useEffect(() => {
    setDisInfo(prevState => ({
      ...prevState,
      kind: "もの"
    }));
  }, [setDisInfo]);

  const ok = () => {
    navigate("/login/home/addpost/mono/suremono");
  };

  const back = () => {
    navigate("/login/home");
  };

  const upload = async (e) => {
    const file = e.target.files[0];
    setDisInfo(prevState => ({
      ...prevState,
      img: URL.createObjectURL(file),
      file: file
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDisInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

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
        <input
          type='radio'
          name='kind'
          value="もの"
          checked={disInfo.kind === "もの"}
          onChange={handleInputChange}
        />
        <label>もの</label>
        <input
          type='radio'
          name='kind'
          value="ペット"
          checked={disInfo.kind === "ペット"}
          onChange={handleInputChange}
        />
        <label>ペット</label>
        <input
          type='radio'
          name='kind'
          value="人"
          checked={disInfo.kind === "人"}
          onChange={handleInputChange}
        />
        <label>人</label>
        <div>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={upload}
          />
          {disInfo.img && <img src={disInfo.img} width="50%" alt="Preview" />}
        </div>
        <div>
          <textarea
            name="text"
            value={disInfo.text}
            onChange={handleInputChange}
          />
        </div>
        <div className='okbtn-posi'>
          <button className='ok-btn' onClick={ok}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default Mono;
