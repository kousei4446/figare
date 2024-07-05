import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import image1 from "./../img/image.png";
import image2 from "./../img/profile-img.png";
import { collection, doc, getDocs, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import {getAuth, signOut } from "firebase/auth";
import { db, auth } from '../../firebase';

function Profile({ profile, setProfile }) {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({ ...profile });

  const back = () => {
    navigate("/login/home");
  };

  const logout = () => {
    navigate("/");
    localStorage.setItem("電話番号", "");
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
      const querySnapshot = await getDocs(collection(db, "users"));
      const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const savedTel = JSON.parse(localStorage.getItem("電話番号"));
      if (savedTel) {
        const foundUser = userList.find(user => user.tel === savedTel);
        setProfile(foundUser);
        setEditProfile(foundUser);
      }
    };
    fetchAllUserData();
  }, [setProfile]);

  useEffect(() => {
    setEditProfile(profile);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const userDocRef = doc(db, "users", profile.id);

    if (editProfile.tel !== profile.tel) {
      const newTel = editProfile.tel;
      const newUserDocRef = doc(db, "users", newTel);
      await setDoc(newUserDocRef, { ...editProfile, tel: newTel });
      await deleteDoc(userDocRef);

      setProfile(prev => ({ ...prev, id: newTel, tel: newTel }));
      localStorage.setItem("電話番号", JSON.stringify(newTel));
    } else {
      await updateDoc(userDocRef, {
        name: editProfile.name,
        furigana: editProfile.furigana,
        username: editProfile.username,
        gender: editProfile.gender,
        password: editProfile.password
      });
      setProfile(editProfile);
    }

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
          <img src={image2} className='pro_img' />
        </div>
        <div className='line'></div>

        <label className='pro_item'>名前</label>
        <br />
        <div className='pro_content'>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editProfile.name}
              onChange={handleChange}
            />
          ) : (
            <div className='pro_input'>{profile.name}</div>
          )}
        </div>
        <div className='line'></div>

        <label className='pro_item'>フリガナ</label>
        <br />
        <div className='pro_content'>
          {isEditing ? (
            <input
              type='text'
              name='furigana'
              value={editProfile.furigana}
              onChange={handleChange}
            />
          ) : (
            <div className='pro_input'>{profile.furigana}</div>
          )}
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
            <div className='pro_input'>{profile.username}</div>
          )}
        </div>
        <div className='line'></div>

        <label className='pro_item'>性別</label>
        <br />
        <div className='pro_content'>
          {isEditing ? (
            <input
              type='text'
              name='gender'
              value={editProfile.gender}
              onChange={handleChange}
            />
          ) : (
            <div className='pro_input'>{profile.gender}</div>
          )}
        </div>
        <div className='line'></div>

        <label className='pro_item'>電話番号</label>
        <br />
        <div className='pro_content'>
          {isEditing ? (
            <input
              type='text'
              name='tel'
              value={editProfile.tel}
              onChange={handleChange}
            />
          ) : (
            <div className='pro_input'>{profile.tel}</div>
          )}
        </div>
        <div className='line'></div>

        <label className='pro_item'>パスワード</label>
        <br />
        <div className='pro_content'>
          {isEditing ? (
            <input
              type='password'
              name='password'
              value={editProfile.password}
              onChange={handleChange}
            />
          ) : (
            <div className='pro_input'>{profile.password}</div>
          )}
        </div>
        <div className='line'></div>
      </div>
      
      <button onClick={SignOutButton}>
        <p>サインアウト</p>
      </button>

      <button className='logout_btn' onClick={logout}>ログアウト</button>
    </div>
  );
}

export default Profile;
