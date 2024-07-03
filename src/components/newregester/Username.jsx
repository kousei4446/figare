import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Username.css";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function Username({ register, setRegister }) {
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegister(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const comp = async () => {
    try {
      const docRef = doc(db, 'users', register.tel); // 'users'はコレクション名、register.telはドキュメントID
      await setDoc(docRef, { ...register });
      navigate("/");
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
