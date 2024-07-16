import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, arrayUnion, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../../../firebase'; // Firestoreインスタンスのインポート
import image from "../../img/image.png";
import "./Chat.css";
import { IoMdArrowRoundBack } from "react-icons/io";

function Chat() {
  const [msg, setMsg] = useState([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const docRef = doc(db, 'chats', localStorage.getItem("chatpair"));

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const updatedMessages = data.message || [];

        // メッセージの既読管理を行う
        const updatedMessagesWithReadFlag = updatedMessages.map(ms => ({
          ...ms,
          checked: ms.checked || (ms.sender !== localStorage.getItem("uid"))
        }));

        // Firestore でメッセージを更新
        updateDoc(docRef, { message: updatedMessagesWithReadFlag });

        setMsg(updatedMessagesWithReadFlag);
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // チャットコンテナを最下部にスクロール
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [msg]);

  const back = () => {
    navigate("/login/home/message");
  };

  const handleClick = async () => {
    const UID = localStorage.getItem("uid");
    const newMsg = { sender: UID, text: text, date: Timestamp.now(), checked: false }; // 新しいメッセージに既読フラグを追加
    const docRef = doc(db, 'chats', localStorage.getItem("chatpair"));

    await updateDoc(docRef, {
      message: arrayUnion(newMsg)
    });

    setText(""); // テキストエリアをクリア
  };

  return (
    <div>
      <button className="back-btn" onClick={back} alt="戻る" >
        <IoMdArrowRoundBack />
      </button>
      <div className='chat-container' ref={chatContainerRef}>
        {msg.map((ms, index) => (
          <div className={`chat-${ms.sender === localStorage.getItem("uid") ? 'false' : 'true'}`} key={index}>
            <div className={`chatran-${ms.sender === localStorage.getItem("uid") ? 'false' : 'true'}`}>{ms.text}</div>
          </div>
        ))}
      </div>
      <div className='NyuuryokuRan'>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="メッセージを入力" required />
        <button onClick={handleClick}>送信</button>
      </div>
    </div>
  );
}

export default Chat;
