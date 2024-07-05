import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Serch.css"

function Serch() {
    const navigate=useNavigate()
    const back=()=>{
        navigate("/login/home")
    }
    const [serch, setSerch]=useState('all');
    const [data, setData]=useState([
    ]);
    const handleSerch=(type)=>{
      setSerch(type);
    };
    const handleClick=(item)=>{
      navigate("/login/home/finder");
    }
    const filterData=data.filter(item =>{
      if(serch==='all'){
        return true;
      } else{
        return item.kind===serch;
      }
    });
  return (
    <div className='select-BackGround'>
        <button className='select-Back' onClick={back}>戻る</button>
          <h2 className='serch-Title'>絞り込み検索</h2>
          <button onClick={()=>handleSerch('hito')}>人</button>
          <button onClick={()=>handleSerch('pet')}>ペット</button>
          <button onClick={()=>handleSerch('mono')}>もの</button>
          <div>
            {filterData.map(item=>(
              <div key={item.id} onClick={()=>handleClick(item.id)}>
                <p>{item.img}</p>
                <p>{item.text}</p>
                <p>{item.time}</p>
              </div>
            ))}
          </div>        
    </div>
  )
}

export default Serch