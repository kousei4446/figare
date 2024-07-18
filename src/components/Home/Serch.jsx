import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Serch.css"
import { Timestamp, collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import SerchPlace from '../SerchPlace/SerchPlace';

function Serch({ prof }) {
    console.log(prof);
    const navigate=useNavigate()
    const back=()=>{
        navigate("/login/home")
    }
    const [serch, setSerch]=useState('');
    const [posts, setPosts]=useState([]);
    const [cnt, setCnt]=useState(0);
    const [bool, setBool]=useState('');
    useEffect(() => {
      const fetchFilteredPosts = async () => {
        try {
          const prefRef = collection(db, "Posts");
          const q = query(prefRef, where("place", "==", prof.place),/*orderBy('time','desc')*/);
          const querySnapshot = await getDocs(q);
          const filteredPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const filterResult = filteredPosts.filter((item) => item.kind === serch);
          setPosts(filterResult);
          if (filterResult.length>1000){
            setCnt(1000);
            setBool('+');
          } else{
            setCnt(filterResult.length);
            setBool('');
          }

            // const q = query(collection(db, 'Posts'), orderBy('time', 'desc'));
            // const querySnapshot = await getDocs(q);
            // const filteredPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // const filterResult = filteredPosts.filter((item) => item.kind === serch);
            // setPref(filterResult);
        } catch (error) {
            console.error('Error fetching filtered posts:', error);
        }
      };
      fetchFilteredPosts();  
    }, [serch]);
    useEffect(()=>{
      if (!localStorage.getItem("uid")){
        navigate("/")
      }
    },[])

    // useEffect(() => {
    //   setPosts(pref);
    // }, [pref]);

    const handleSerch = (type) => {
      setSerch(type === serch ? 'all' : type);
    };

    const handleClick=(item)=>{
      localStorage.setItem("postid", item.id);
      navigate("/login/home/finder");
    };
    
  return (
    <div className='select-BackGround'>
          <img src={image} className='select-Back' onClick={back} />
          <h2 className='serch-Title'>絞り込み検索</h2>
          <div className='S-btn'>
            <button onClick={()=>handleSerch('人')} className='Select-btn'>人</button>
            <button onClick={()=>handleSerch('ペット')} className='Select-btn'>ペット</button>
            <button onClick={()=>handleSerch('もの')} className='Select-btn'>もの</button>
          </div>
          <div>
            <a>検索結果：{cnt}{bool}件</a>
            {posts.map((item, index)=>(
              <div key={index} className='Spost-Main'>
                <div onClick={()=>handleClick(item)} className='Spost-card'>
                  <strong>{item.kind}</strong>
                  <div className='Spost-body'>
                    <img src={item.file} width='130px' alt='Post' className='Spost-img'/>
                    <p className='Spost-text'>{item.text}</p>
                  </div>
                  <div>
                    <p>{item.time.toDate().toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
    </div>
  )
}

export default Serch