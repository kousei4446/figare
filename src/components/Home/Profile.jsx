import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import image1 from "./../img/image.png";
import image from "../img/profile-img.png";
// import image2 from "./../img/profile-img.png";
import { collection, doc, getDocs, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import {getAuth, signOut } from "firebase/auth";
import { db } from '../../firebase';

function Profile({ prof, setProf }) {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState(prof);

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

  const PhandleChange = (e) => {
    const { value } = e.target;
    setEditProfile(prevState => ({
        ...prevState,
        place: value
      }));
  };

  const back = () => {
    navigate("/login/home");
  };
  
  function SignOutButton(){
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate("/");
      console.log('signout');
    }).catch((error) => {
      console.log(" signout error");
    })
  }

  useEffect(() => {
    const fetchAllUserData = async () => {
      
      const querySnapshot = await getDocs(collection(db, "googleusers"));
      const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const savedUid = localStorage.getItem('uid');
      if (savedUid) {
        const foundUser = userList.find((user) => user.uid === savedUid);
        setProf({ 
          place: foundUser.place, 
          photoURL: foundUser.photoURL, 
          displayname: foundUser.displayName,
          email: foundUser.email,
          username: foundUser.username,
          uid: foundUser.uid });
      }
    };
    fetchAllUserData();
  }, [setProf]);

  useEffect(() => {
    setEditProfile(prof);
  }, [prof]);

  const handleChange = (e) => {
    const { value } = e.target;
    setEditProfile(prevState => ({
      ...prevState,
      username: value
    }));
  };

  const handleSave = async () => {
    const Uid = localStorage.getItem('uid');
    const userDocRef = doc(db,"googleusers", Uid )
    // console.log(editProfile);
    // const userDocRef = doc(db, "googleusers", prof.id);

    // if (editProfile.uid !== prof.uid) {
    //   const newInfo = editProfile.uid;
    //   const newUserDocRef = doc(db, "googleusers", newInfo);
    //   await setDoc(newUserDocRef, { ...editProfile, uid: newInfo });
    //   await deleteDoc(userDocRef);

    //   setProf(prev => ({ ...prev, id: newInfo, place: newInfo }));
    //   localStorage.setItem("情報更新", JSON.stringify(newInfo));
    // } else {
      await updateDoc(userDocRef,{
        username: editProfile.username,
        place: editProfile.place,
      });
      setProf(editProfile);
    // }

    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(prev => !prev);
  };

  return (
    <div>
      <img src={image1} className='back_btn' onClick={back} />
      <h2 className='pro_title'>プロフィール</h2>
      <div className='profile_checker'>
      <div className='edit_save_btn'>
        {isEditing ? (
          <>
            <button className='pro_savebtn' onClick={handleSave}>保存</button>
            <button className='pro_cancelbtn' onClick={handleEditToggle}>キャンセル</button>
          </>
        ) : (
          <button className='pro_editbtn' onClick={handleEditToggle}>編集</button>
        )}
      </div>
        <label className='pro_item'>プロフィール画</label>
        <br />
        <div className='pro_content'>
          <img src={prof.photoURL || image} className='pro_img' />
        </div>
        <div className='line'></div>

        <label className='pro_item'>名前</label>
        <br />
        <div className='pro_content'>
            <div className='pro_input'>{prof.displayname}</div>
        </div>
        <div className='line'></div>

<label className='pro_item'>メールアドレス</label>
        <br />
        <div className='pro_content'>
            <div className='pro_input'>{prof.email}</div>
        </div>
        <div className='line'></div>

        <label className='pro_item'>ユーザ名</label>
        <br />
        <div className='pro_content'>
          {isEditing ? (
            <input
              type='text'
              name='username'
              value={editProfile.username}
              onChange={handleChange}
            />
          ) : (
            <div className='pro_input'>{prof.username}</div>
          )}
        </div>
        <div className='line'></div>

        <label className='pro_item'>地域選択</label>
        <br />
        <div className='pro_content'>
          {isEditing ? (
            <select
              name='place'
              value={editProfile.place}
              onChange={PhandleChange}>
              <option value="" disabled>選択してください</option>
                {regions.map((region, index) => (
                <optgroup key={index} label={region.label}>
                  {region.options.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
            ))}
          </optgroup>
        ))}
            </select>
          ) : (
            <div className='pro_input'>{prof.place}</div>
          )}
        </div>
        <div className='line'></div>
      </div>

      <button className='logout_btn' onClick={SignOutButton}>サインアウト</button>
    </div>
  );
}

export default Profile;
