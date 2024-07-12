import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Username.css";
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import anime from 'animejs/lib/anime.es.js';


function Username() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleInputChange = (e) => {
    setUsername(e.target.value);
    // const { name, value } = e.target;
    // setRegister(prevState => ({
    //   ...prevState,
    //   [name]: value
    // }));
  };

  const comp = async () => {
    try {
      const updatedUserDatas = { username: username };
      const docRef = doc(db, 'googleusers', localStorage.getItem("uid"));
      await updateDoc(docRef, updatedUserDatas);
      navigate("/login/home");
      window.location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  useEffect(() => {
    const placeContainer = document.querySelector('.circleContainer');
    if (placeContainer) {
      for (let i = 0; i <= 20; i++) {
        const circles = document.createElement('div');
        circles.classList.add('circle');
        placeContainer.appendChild(circles);
      }
    }

    const animateCircles = () => {
      anime({
        targets: '.circle',
        translateX: () => anime.random(-400, 400),
        translateY: () => anime.random(-300, 800),
        scale: () => anime.random(5,7),
        duration: 10000,
        delay: anime.stagger(100),
      });
    };

    animateCircles();
  }, []);

  return (
    <div className='searchPlace'>
      <div className='searchtitle'>
        <h1 className='user-user'>ユーザーネームを</h1>
        <h1 className='user-write'>登録してください</h1>
      </div>
      <br />
      <div>
        <input
          className='username'
          placeholder='ユーザー名'
          name="username"
          value={username}
          onChange={handleInputChange}
        />
      </div>
      <div className='circleContainer'></div>
      <br />
      <button className='searchDecision' onClick={comp} >決定</button>
    </div>
  );
}

export default Username;
