import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Mono.css";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { CiTextAlignCenter } from 'react-icons/ci';
import { IoMdArrowRoundBack } from 'react-icons/io';

function Mono({ disInfo, setDisInfo }) {
  const navigate = useNavigate();

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
    if (!file) {
      console.error("ファイルが選択されていません");
      return;
    }
    const uniqueFileName = `${uuidv4()}-${file.name}`;
    const storageRef = ref(storage, `uploads/${uniqueFileName}`);
    try {
      await uploadBytes(storageRef, file); // ファイルをアップロード
      const downloadURL = await getDownloadURL(storageRef); // アップロード後にURLを取得
      setDisInfo(prevState => ({
        ...prevState,
        img: downloadURL,
        file: file,
        storagePath: storageRef.fullPath,
      }));
    } catch (error) {
      console.error("ファイルのアップロード中にエラーが発生しました:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDisInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className='mono'>
      <div className='mono-blue'>
        <div className="mono-back" onClick={back} alt="戻る"><IoMdArrowRoundBack className='mono-back-icon'/>戻る</div>
        <div className='mono-title'>＜詳細情報を入力＞</div>
        <div></div>
        <div></div>
      </div>

      <div className='mono-main'>
        <div className="kind-item">
          種類：
        </div>
        <div className="kind-select">
          <input
            type='radio'
            name='kind'
            value="もの"
            checked={disInfo.kind === "もの"}
            onChange={handleInputChange}
          />
          <label className='kind-mono'>　もの</label>
          <input
            type='radio'
            name='kind'
            value="ペット"
            checked={disInfo.kind === "ペット"}
            onChange={handleInputChange}
          />
          <label className='kind-pet'>　ペット</label>
          <input
            type='radio'
            name='kind'
            value="人"
            checked={disInfo.kind === "人"}
            onChange={handleInputChange}
          />
          <label>　人</label>
        </div>
        <div className='file-item'>
          写真：
        </div>
        <div className='mono-file'>
          {disInfo.img && <img src={disInfo.img} width="50%" alt="Preview" />}  
          <input
            type="file"
            onChange={upload}
            accept=".jpg,.jpeg,.png"
          />
        </div>
        <div className='characteristic'>
          <textarea
            name="text"
            value={disInfo.text}
            onChange={handleInputChange}
            placeholder="※特徴や情報などご記載ください。(任意)"
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
