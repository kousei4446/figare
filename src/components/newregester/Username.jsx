import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Username.css";
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function Username({ register, setRegister, userDatas }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  
  const handleInputChange = (e) => {
    setUsername(e.target.value);
    const { name, value } = e.target;
    setRegister(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const comp = async () => {
    try {
      const updatedUserDatas = { username: username };
      const docRef = doc(db, 'googleusers', localStorage.getItem("uid"));
      await updateDoc(docRef, updatedUserDatas);
      navigate("/");
      window.location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <div className='usernametitle'>
        <h1 className='title1'>ユーザー名を</h1>
        <h1 className='title2'>入力してください</h1>
      </div>
      <input
        className='username'
        placeholder='ユーザー名'
        name="username"
        value={register.username}
        onChange={handleInputChange}
      />
      <br />
      <button className='decision' onClick={comp}>決定</button>
    </div>
  );
}

export default Username;
  