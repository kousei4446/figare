import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Search.css";
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import anime from 'animejs/lib/anime.es.js';
import { regions } from '../../RegionData';

function SerchPlace({ setProf }) {
  const [selectedRegion, setSelectedRegion] = useState('');
  const navigate = useNavigate();



  const handleChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const comp = async (e) => {
    if (selectedRegion) {
      console.log(selectedRegion);
      setProf({place: selectedRegion})
      
      const UID = localStorage.getItem("uid")
      const docRef = doc(db, "googleusers", UID )
      const docSnap=await getDoc(docRef);
      let data=docSnap.data();
      if (data.username){
        navigate('/login/home');
      }else{
        navigate("/login/username")
      }
      await updateDoc(docRef, {
        place: selectedRegion
      });
      console.log(docRef)
      console.log("ok")
      // const { name } = e.target;
      // setUserData(prevState => ({
      //   ...prevState,
      //   [name]: userData.selectedRegion
      // }))
      
      // const updateddisInfo = { ...disInfo, place: selectedRegion };
      // setDisInfo(updateddisInfo);
      // const docRef = doc(db, 'Posts');
      // await setDoc(docRef, updateddisInfo);
      
      
    } else {
      alert('地区を選択してください。');
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
        <h1 className='find'>探したい地区</h1>
        <h1 className='or'>or</h1>
        <h1 className='detect'>発見した地区</h1>
      </div>
      <select className='pulldown' value={selectedRegion} onChange={handleChange} name='place'>
        <option value="" disabled>選択してください</option>
        {regions.map((region, index) => (
          <optgroup key={index} label={region.label}>
            {region.options.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </optgroup>
        ))}
      </select>
      <div className='circleContainer'></div>
      <br />
      <button className='searchDecision' onClick={comp} >決定</button>
    </div>
  );
}

export default SerchPlace;