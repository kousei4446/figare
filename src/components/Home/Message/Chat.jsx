import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from "../../img/image.png";
import "./Chat.css";

function Chat() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState([]);
  const [text, setText] = useState("")
  const back = () => {
    navigate("/login/home/message");
  };
  const handleClick = () => {
    const newMsg = [...msg, text];
    setMsg(newMsg)
    setText("")
  }
  return (
    <div className='chat-contaner' >
      <img src={image} height="50px" className="back-btn" onClick={back} alt="戻る" />
      <h1>Chat</h1>
      <div className='chat-true'>
        <div className='chatran-true'>messagejfigjoarejgoajgoirejrejrgorjrpogeegiorogj</div>
      </div>
      <div className='chat-false'>
        <div className='chatran-false'>messagejfigjoarejgoajgoirejrejrgorjrpogeegiorogj</div>
      </div>
      {msg.map((ms) => {
        return (
          <div className='chat-false'>
            <div className='chatran-false'>{ms}</div>
          </div>
        )
      })}
      <div className='NyuuryokuRan'>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="メッセージを入力" />
        <button onClick={handleClick}>送信</button>
      </div>
    </div>
  );
}

export default Chat;
