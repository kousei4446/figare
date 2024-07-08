import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase';
import image from "../../img/image.png";
import "./Message.css";

function Messeage() {
  const [documentIdList, setDocumentIdList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocumentIdAndUsername = async () => {
      const UID = localStorage.getItem("uid");

      if (UID) {
        const userChatDocRef = doc(db, 'userChats', UID);
        // const q = query(collection(db, 'userChats'), orderBy('date', 'desc'));
        const userChatDocSnap = await getDoc(userChatDocRef);
        if (userChatDocSnap.exists()) {
          const userData = userChatDocSnap.data();
          const keyList = Object.keys(userData);

          const fetchedUsernames = [];
          for (const id of keyList) {
            // console.log(id)
            let chatDocRef = doc(db, "chats", id + localStorage.getItem("uid"));
            let chatDocSnap = await getDoc(chatDocRef);
            let lastMessage = "";

            if (chatDocSnap.exists()) {
              lastMessage = chatDocSnap.data().message[chatDocSnap.data().message.length - 1].text;
            } else {
              chatDocRef = doc(db, "chats", localStorage.getItem("uid") + id);
              chatDocSnap = await getDoc(chatDocRef);
              if (chatDocSnap.exists()) {
                lastMessage = chatDocSnap.data().message[chatDocSnap.data().message.length - 1].text;
              }
            }

            const userDocRef = doc(db, 'googleusers', id);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              fetchedUsernames.push({
                imgURL: userDocSnap.data().photoURL,
                username: userDocSnap.data().username,
                id: id,
                text: lastMessage,
              });
            }
          }
          setDocumentIdList(fetchedUsernames);
        }
      }
    };

    fetchDocumentIdAndUsername();
  }, []);

  const back = () => {
    navigate("/login/home");
  }

  const chatpage = async (id) => {
    const documents = localStorage.getItem("uid") + id;
    const docRef = doc(db, 'chats', documents);
    const docSnap = await getDoc(docRef);
    const docRefs = doc(db, "chats", id + localStorage.getItem("uid"));
    const docSnaps = await getDoc(docRefs);

    if (docSnap.exists()) {
      localStorage.setItem("chatpair", localStorage.getItem("uid") + id);
      navigate("/login/home/chat/");
    } else if (docSnaps.exists()) {
      localStorage.setItem("chatpair", id + localStorage.getItem("uid"));
      navigate("/login/home/chat/");
    }
  }

  return (
    <div>
      <div className='msg-head'>
        <img src={image} height="50px" className='back-btn' onClick={back} alt="Back" />
        <h1>メッセージ一覧</h1>
      </div>
      <div className='messages'>
        {documentIdList.map((user) => (
          <div onClick={() => chatpage(user.id)} className='msg-person' key={user.id}>
            <img src={user.imgURL} alt={user.username} height="60px" style={{ borderRadius: "50%" }} />
            <div className='msg-content'>
              <strong>{user.username}</strong>
              <p>{user.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messeage;
