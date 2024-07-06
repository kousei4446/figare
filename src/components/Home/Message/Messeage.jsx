import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
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
          setDocumentIdList(keyList);
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
    console.log(documents);
    const docRef = doc(db, 'chats', documents);
    const docSnap = await getDoc(docRef);
    const docRefs=doc(db,"chats",id+localStorage.getItem("uid"));
    const docSnaps=await getDoc(docRefs);
    if (docSnap.exists()) {
      console.log('Document exists');
      localStorage.setItem("chatpair",localStorage.getItem("uid") + id)
      navigate("/login/home/chat/");
    } else if(docSnaps.exists()){
      console.log("fhogrejhob");
      localStorage.setItem("chatpair",id +localStorage.getItem("uid") )
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
        {documentIdList.map((id) => (
          <div onClick={() => chatpage(id)} className='msg-person' key={id}>
            <h3>icon</h3>
            <p>
              {id}
              <br />
              {localStorage.getItem("uid")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messeage;
