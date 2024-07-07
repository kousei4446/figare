import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
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
        const userChatDocSnap = await getDoc(userChatDocRef);
        if (userChatDocSnap.exists()) {
          const userData = userChatDocSnap.data();
          const keyList = Object.keys(userData);

          // 各ユーザーのusernameを取得して状態に保存
          const fetchedUsernames = [];
          for (const id of keyList) {
            const userDocRef = doc(db, 'googleusers', id);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              fetchedUsernames.push({
                imgURL: userDocSnap.data().photoURL,
                username: userDocSnap.data().username,
                id: id
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
            <img src={user.imgURL} alt={user.username} height="40px"style={{borderRadius:"50%"}} />
            <p>
              {user.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messeage;
