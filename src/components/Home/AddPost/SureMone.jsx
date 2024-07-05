import React, { useState } from 'react';
import image from "../../img/image.png";
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../../firebase';
import { Timestamp, collection, doc, setDoc } from 'firebase/firestore';

function SureMone({ disInfo, setDisInfo, myInfo }) {
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
      const newDisInfo = { ...disInfo, file: url, time: Timestamp.now(), poster: localStorage.getItem("uid"), place: myInfo.place }; // URLを含めて新しいオブジェクトを作成
      await setDoc(docRef, newDisInfo); // Firestoreに新しいオブジェクトを保存

      setDisInfo({ kind: "", text: "", img: "", file: "", time: "" });
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
          <div className='blue'></div>
          <img src={image} height="50px" className='back-btn' onClick={back} alt="戻る" />
          <p style={{ fontSize: "29px", marginTop: "0px", marginBottom: "0px", marginLeft: "5%" }}>情報を確認してね​</p>
          <div className='con-text'>
            <p>種類 : {disInfo.kind}</p>
            <p>写真 :</p>
            <p>　　　 <img src={disInfo.img ? disInfo.img : {}} height="200px" alt="プレビュー" /></p>
            <p>記述 : {disInfo.text}</p>
          </div>
          <div className="okbtn-posi">
            <button onClick={ok} className='con-btn'>確定する</button>
          </div>
        </>
      )}
    </div>
  );
}

export default SureMone;
