import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import image1 from "./../img/image.png";
import image2 from "./../img/profile-img.png";
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function Profile({ profile ,setProfile }) {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState({
    name: false,
    furigana: false,
    username: false,
    gender: false,
    tel: false,
    password: false
  });
  const [editProfile, setEditProfile] = useState({ ...profile });

  const back = () => {
    navigate("/login/home");
  };

  const logout = () => {
    navigate("/");
    localStorage.setItem("電話番号","");
  };
  
  useEffect(() => {
    const fetchAllUserData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const savedTel = JSON.parse(localStorage.getItem("電話番号"));
      if (savedTel) {
        const foundUser = userList.find(user => user.tel === savedTel);
        setProfile(foundUser);
        setEditProfile(foundUser);
        console.log(profile)
      }
    };
    fetchAllUserData();
  }, [setProfile]);

  useEffect(() => {
    setEditProfile(profile);
  }, [profile]);

  const handleEdit = (field) => {
    setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (field) => {
    setIsEditing(prev => ({ ...prev, [field]: false }));
    const userDoc = doc(db, "users", profile.id);
    await updateDoc(userDoc, { [field]: editProfile[field] });
    setProfile(prev => ({ ...prev, [field]: editProfile[field] }));
  };

  return (
    <div>
      <img src={image1} className='back_btn' onClick={back} />
      <h2 className='pro_title'>プロフィール</h2>
      <div className='profile_checker'>
        <label className='pro_item'>プロフィール画</label>
          <br />
          <div className='pro_content'>
            <img src={image2} className='pro_img' />
            <button className='pro_editbtn'>編集</button>
          </div>
        <div className='line'></div>

        <label className='pro_item'>名前</label>
          <br />
          <div className='pro_content'>
            {isEditing.name ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editProfile.name}
                  onChange={handleChange}
                />
                <button onClick={() => handleSave('name')}>保存</button>
              </>
            ) : (
              <>
                <div className='pro_input'>{profile.name}</div>
                <button className='pro_editbtn' onClick={() => handleEdit('name')}>編集</button>
              </>
            )}
          </div>
          <div className='line'></div>

        <label className='pro_item'>フリガナ</label>
          <br />
          <div className='pro_content'>
          {isEditing.furigana ? (
            <>
              <input
                type='text'
                name='furigana'
                value={editProfile.furigana}
                onChange={handleChange}
              />
              <button onClick={() => handleSave('furigana')}>保存</button>
            </>
          ) : (
            <>
              <div className='pro_input'>{profile.furigana}</div>
              <button className='pro_editbtn' onClick={() => handleEdit('furigana')}>編集</button>
            </>
          )}
        </div>
        <div className='line'></div>

        <label className='pro_item'>ユーザ名</label>
          <br />
          <div className='pro_content'>
          {isEditing.username ? (
            <>
              <input
                type='text'
                name='username'
                value={editProfile.username}
                onChange={handleChange}
              />
              <button onClick={() => handleSave('username')}>保存</button>
            </>
          ) : (
            <>
              <div className='pro_input'>{profile.username}</div>
              <button className='pro_editbtn' onClick={() => handleEdit('username')}>編集</button>
            </>
          )}
        </div>
        <div className='line'></div>

        <label className='pro_item'>性別</label>
          <br />
          <div className='pro_content'>
          {isEditing.gender ? (
            <>
              <input
                type='text'
                name='gender'
                value={editProfile.gender}
                onChange={handleChange}
              />
              <button onClick={() => handleSave('gender')}>保存</button>
            </>
          ) : (
            <>
              <div className='pro_input'>{profile.gender}</div>
              <button className='pro_editbtn' onClick={() => handleEdit('gender')}>編集</button>
            </>
          )}
        </div>
        <div className='line'></div>

        <label className='pro_item'>電話番号</label>
          <br />
          <div className='pro_content'>
          {isEditing.tel ? (
            <>
              <input
                type='text'
                name='tel'
                value={editProfile.tel}
                onChange={handleChange}
              />
              <button onClick={() => handleSave('tel')}>保存</button>
            </>
          ) : (
            <>
              <div className='pro_input'>{profile.tel}</div>
              <button className='pro_editbtn' onClick={() => handleEdit('tel')}>編集</button>
            </>
          )}
        </div>
        <div className='line'></div>

        <label className='pro_item'>パスワード</label>
          <br />
          <div className='pro_content'>
          {isEditing.password ? (
            <>
              <input
                type='password'
                name='password'
                value={editProfile.password}
                onChange={handleChange}
              />
              <button onClick={() => handleSave('password')}>保存</button>
            </>
          ) : (
            <>
              <div className='pro_input'>{profile.password}</div>
              <button className='pro_editbtn' onClick={() => handleEdit('password')}>編集</button>
            </>
          )}
        </div>
        <div className='line'></div>

      </div>
      <button className='logout_btn' onClick={logout}>ログアウト</button>
    </div>
  );
}

export default Profile