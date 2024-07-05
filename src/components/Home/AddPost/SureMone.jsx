import React, { useState } from 'react';
import image from "../../img/image.png";
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../../firebase';
import { Timestamp, collection, doc, setDoc } from 'firebase/firestore';
import "./SureMono.css";

function SureMone({ disInfo, setDisInfo }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const back = () => {
    navigate("/login/home/addpost/mono");
  };

  const ok = async () => {
    setLoading(true);
    try {
      const storageRef = ref(storage, 'images/' + disInfo.file.name);
      await uploadBytes(storageRef, disInfo.file); // ファイルをまずアップロード
      const url = await getDownloadURL(storageRef); // その後にURLを取得
      console.log("File available at:", url);
      const docRef = doc(collection(db, 'Posts')); // 'Post'はコレクション名
      const newDisInfo = { ...disInfo, file: url ,time:Timestamp.now()}; // URLを含めて新しいオブジェクトを作成
      await setDoc(docRef, newDisInfo); // Firestoreに新しいオブジェクトを保存

      setDisInfo({ kind: "", text: "", img: "", file: "",time:"" });
      navigate("/login/home");
    } catch (error) {
      console.error("Error uploading file or saving document:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className='loading'>
          <p>送信中...</p>
        </div>
      ) : (
        <>
          <div className='mono-blue'>figare</div>
          <img src={image} height="50px" className='back-btn' onClick={back} alt="戻る" />
          <div className='mono-sure'>＜情報を確認してね＞​</div>
          <div className='con-text'>
            <div className='kind-check'>種類 : もの</div>
            <div className='picture-check'>写真 :</div>
            <div className='preview-check'><img src={disInfo.img ? disInfo.img : {}} height="200px" alt="プレビュー" /></div>
            <div className='text-check'>記述 :</div>
            <div className='context-check'>{disInfo.text}</div>
          </div>
          <div className="con-btn-posi">
            <button onClick={ok} className='con-btn'>確定する</button>
          </div>
        </>
      )}
    </div>
  );
}

export default SureMone;
