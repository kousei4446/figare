import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import image1 from "./../img/image.png";
import image from "../img/profile-img.png";
// import image2 from "./../img/profile-img.png";
import { collection, doc, getDocs, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import {getAuth, signOut } from "firebase/auth";
import { db } from '../../firebase';
import { regions } from '../../RegionData';

function Profile({ prof, setProf }) {
  
  // console.log(prof);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState(prof);

  // console.log(editProfile);



  const PhandleChange = (e) => {
    const { value } = e.target;
    setEditProfile(prevState => ({
        ...prevState,
        place: value
      }));
      
    // console.log(value);
    // console.log(editProfile);
  };

  const back = () => {
    navigate("/login/home");
  };

  const openbtn = () => {
    dialog.showModal();
  }

  const closebtn = () => {
    dialog.close();
  }
   const dialog = document.getElementById("dialog");

  function SignOutButton(){
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.setItem("uid","")
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

  const max_length=10;
  const handleChange = (e) => {
    const { value } = e.target;
    if(value.length <= max_length){
      setEditProfile(prevState => ({
        ...prevState,
        username: value
      }));
    }
    //const { value } = e.target;
    //setEditProfile(prevState => ({
    //  ...prevState,
    //  username: value
    //}));
    // console.log(value);
    // console.log(editProfile);
  };
  const handleSave = async () => {
    // console.log(editProfile);
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
  useEffect(()=>{
    if (!localStorage.getItem("uid")){
      navigate("/")
    }
  },[])
  return (
    <div className='Background-Color'>
      <img src={image1} className='back_btn' onClick={back} />
      <h2 className='pro_title'>プロフィール</h2>
      <div className='profile_checker'>
      <div className='edit_save_btn'>
        {isEditing ? '' : (
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
              class='New_username'
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
              class='New_place'
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
    
      <dialog id = "dialog" className="dialog">
        <h2 className='Diatext'>このアカウントからサインアウトしますか？</h2>
        <div className = "diabtn">
          <button onClick={SignOutButton} className='logout_btn'>はい</button>
          <button onClick={closebtn} className='logout_btn'>いいえ</button>
        </div>  
      </dialog>
      <div className='save_cancel_btn'>
        {isEditing ? (
          <>
            <button className='Save_or_Cancel' onClick={handleSave}>保存</button>
            <button className='Save_or_Cancel' onClick={handleEditToggle}>キャンセル</button>
          </>
        ) : ''}
      </div>
      <div className='Logout_btn'>
        {isEditing ? '' : (
          <button className='logout_btn' onClick={openbtn}>サインアウト</button>
        )}
      </div>
    </div>
  );
}

export default Profile;
