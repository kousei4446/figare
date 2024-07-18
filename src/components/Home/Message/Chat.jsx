import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, arrayUnion, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../../../firebase'; // Firestoreインスタンスのインポート
import { IoMdArrowRoundBack } from 'react-icons/io';
import './Chat.css';

function Chat() {
  const [msg, setMsg] = useState([]);
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const docRef = doc(db, 'chats', localStorage.getItem('chatpair'));

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const updatedMessages = data.message || [];

        const updatedMessagesWithReadFlag = updatedMessages.map(ms => ({
          ...ms,
          checked: ms.checked || (ms.sender !== localStorage.getItem('uid'))
        }));

        updateDoc(docRef, { message: updatedMessagesWithReadFlag });

        setMsg(updatedMessagesWithReadFlag);
      } else {
        console.log('No such document!');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [msg]);

  const back = () => {
    navigate('/login/home/message');
  };

  const handleClick = async () => {
    const UID = localStorage.getItem('uid');
    const newMsg = { sender: UID, text: text, date: Timestamp.now(), checked: false };
    const docRef = doc(db, 'chats', localStorage.getItem('chatpair'));

    await updateDoc(docRef, {
      message: arrayUnion(newMsg)
    });

    setText('');
  };

  return (
    <div>
      <button className="back-btn" onClick={back} alt="戻る">
        <IoMdArrowRoundBack />
      </button>
      <div className="chat-container" ref={chatContainerRef}>
        {msg.map((ms, index) => (
          <div className={`chat-${ms.sender === localStorage.getItem('uid') ? 'false' : 'true'}`} key={index}>
            <div className={`chatran-${ms.sender === localStorage.getItem('uid') ? 'false' : 'true'}`}>{ms.text}</div>
          </div>
        ))}
      </div>
      <div className="NyuuryokuRan">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="メッセージを入力"
          required
        />
        <button onClick={handleClick}>送信</button>
      </div>
    </div>
  );
}

export default Chat;
