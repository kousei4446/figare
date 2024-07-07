import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import image1 from "./../img/image.png";
// import image2 from "./../img/profile-img.png";
import { collection, doc, getDocs, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import {getAuth, signOut } from "firebase/auth";
import { db, auth } from '../../firebase';

function Profile({ userData, setUserData }) {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({ ...userData });

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
      
      // const querySnapshot = await getDocs(collection(db, "googleusers"));
      // const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // const UID = JSON.parse(localStorage.getItem("uid"));
      // if (UID) {
      //   const foundUser = userList.find(user => user.uid === UID);
      //   setUserData(foundUser);
      //   setEditProfile(foundUser);
      // }
    };
    fetchAllUserData();
  }, [setUserData]);

  useEffect(() => {
    setEditProfile(userData);
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    console.log(editProfile);
    const userDocRef = doc(db, "googleusers", userData.id);

    if (editProfile.uid !== userData.uid) {
      const newInfo = editProfile.uid;
      const newUserDocRef = doc(db, "googleusers", newInfo);
      await setDoc(newUserDocRef, { ...editProfile, uid: newInfo });
      await deleteDoc(userDocRef);

      setUserData(prev => ({ ...prev, id: newInfo, place: newInfo }));
      localStorage.setItem("情報更新", JSON.stringify(newInfo));
    } else {
      await updateDoc(userDocRef, {
        // name: editProfile.name,
        // furigana: editProfile.furigana,
        username: editProfile.username,
        // gender: editProfile.gender,
        // password: editProfile.password
        place: editProfile.place,
      });
      setUserData(editProfile);
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
          <img src={auth.currentUser.photoURL} className='pro_img' />
        </div>
        <div className='line'></div>

        <label className='pro_item'>名前</label>
        <br />
        <div className='pro_content'>
          {/* {isEditing ? (
            <input
              type="text"
              name="name"
              value={editProfile.name}
              onChange={handleChange}
            />
          ) : ( */}
            <div className='pro_input'>{auth.currentUser.displayName}</div>
          {/* )} */}
        </div>
        <div className='line'></div>

        {/* <label className='pro_item'>フリガナ</label>
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
            <div className='pro_input'>{userData.furigana}</div>
          )}
        </div>
        <div className='line'></div> */}

<label className='pro_item'>メールアドレス</label>
        <br />
        <div className='pro_content'>
          {/* {isEditing ? (
            <input
              type='text'
              name='tel'
              value={editProfile.tel}
              onChange={handleChange}
            />
          ) : ( */}
            <div className='pro_input'>{auth.currentUser.email}</div>
          {/* )} */}
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
            <div className='pro_input'>{userData.username}</div>
          )}
        </div>
        <div className='line'></div>

        {/* <label className='pro_item'>性別</label>
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
            <div className='pro_input'>{userData.gender}</div>
          )}
        </div>
        <div className='line'></div> */}

        <label className='pro_item'>地域選択</label>
        <br />
        <div className='pro_content'>
          {isEditing ? (
            <input
              name='place'
              value={editProfile.place}
              onChange={handleChange}
            />
          ) : (
            <div className='pro_input'>{userData.place}</div>
          )}
        </div>
        <div className='line'></div>
      </div>

      <button className='logout_btn' onClick={SignOutButton}>サインアウト</button>
    </div>
  );
}

export default Profile;
