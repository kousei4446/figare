import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import image from "../../img/image.png";
import "./Message.css";
import { v4 as uuidv4 } from 'uuid';

function Message() {
  const [documentIdList, setDocumentIdList] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let senderId=""
  let time=""
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDocumentIdAndUsername = async () => {
      setLoading(true);
      try {
        const UID = localStorage.getItem("uid");
        if (!UID) return;

        const userChatDocRef = doc(db, 'userChats', UID);
        const userChatDocSnap = await getDoc(userChatDocRef);

        if (userChatDocSnap.exists()) {
          const userData = userChatDocSnap.data();
          const keyList = Object.keys(userData);
          const fetchedUsernames = [];

          for (const id of keyList) {
            const postDocRef = doc(db, "Posts", id);
            const postDocSnap = await getDoc(postDocRef);

            if (postDocSnap.exists()) {
              const postData = postDocSnap.data();
              let posterId = postData.poster;
              if (UID === posterId) {
                const userInfoDoc = await getDoc(doc(db, "userChats", UID));
                if (userInfoDoc.exists()) {
                  const userInfoData = userInfoDoc.data();
                  if (userInfoData && userInfoData[id]) {
                    posterId = userInfoData[id].userInfo.uid;
                  }
                }
              }
              let chatDocRef = doc(db, "chats", id + posterId + UID);
              let chatDocSnap = await getDoc(chatDocRef);
              let chatDocRefs = doc(db, "chats", id + UID + posterId);
              let chatDocSnaps = await getDoc(chatDocRefs);
              let lastMessage = "";
              let count = 0;

              console.log(`Checking chat documents for ID ${id}:`);
              console.log(`chatDocSnap.exists(): ${chatDocSnap.exists()}`);
              console.log(`chatDocSnap ID: ${id + posterId + UID}`);
              console.log(`chatDocSnaps.exists(): ${chatDocSnaps.exists()}`);
              console.log(`chatDocSnaps ID: ${id + UID + posterId}`);

              if (chatDocSnap.exists() && chatDocSnap.data()) {
                const messages = chatDocSnap.data().message;
                console.log(`Messages from chatDocSnap: ${messages}`);
                if (messages && messages.length > 0) {
                  lastMessage = messages[messages.length - 1].text;
                  senderId= messages[messages.length - 1].sender;
                  time=messages[messages.length - 1].date;
                  messages.forEach((msg) => {
                    if (msg.checked === false) {
                      count += 1;
                    }
                  });
                }
              } else if (chatDocSnaps.exists() && chatDocSnaps.data()) {
                const messages = chatDocSnaps.data().message;
                console.log(`Messages from chatDocSnaps: ${messages}`);
                if (messages && messages.length > 0) {
                  lastMessage = messages[messages.length - 1].text;
                  senderId= messages[messages.length - 1].sender;
                  time=messages[messages.length - 1].date;
                  messages.forEach((msg) => {
                    if (msg.checked === false) {
                      if (msg.sender != UID) {
                        count += 1;
                      }
                    }
                  });
                }
              }
              console.log(count)
              const messagee = chatDocSnaps.exists() && chatDocSnaps.data() ? chatDocSnaps.data().message : [];
              fetchedUsernames.push({
                time:time,
                tokutyou: postData.text,
                postid: id,
                senderId: senderId,
                postIcon: postData.file,
                id: posterId,
                text: lastMessage,
                count: count
              });
            }
          }
          
          setDocumentIdList(fetchedUsernames);
        } else {
          console.log(`User chat document with ID ${UID} does not exist`);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentIdAndUsername();
  }, []);

  const back = () => {
    navigate("/login/home");
  }

  const chatpage = async (id, posterId) => {
    const UID = localStorage.getItem("uid");
    const documents = posterId + UID + id;
    const docRef = doc(db, 'chats', documents);
    const docSnap = await getDoc(docRef);
    const docRefs = doc(db, "chats", posterId + id + UID);
    const docSnaps = await getDoc(docRefs);

    if (docSnap.exists()) {
      localStorage.setItem("chatpair", posterId + UID + id);
      navigate("/login/home/chat");
    } else if (docSnaps.exists()) {
      localStorage.setItem("chatpair", posterId + id + UID);
      navigate("/login/home/chat");
    }
  }

  return (
    <div>
      {loading ? (
        <div className='load'>
          <h3>メッセージデータを取得中</h3>
          <div className='loader'></div>
        </div>
      ) : (
        <>
          <div className='msg-head'>
            <img src={image} height="40px" className='back-btn' onClick={back} alt="Back" />
            <h3>メッセージ一覧</h3>
          </div>
          <div className='messages'>
            {documentIdList.map((user) => (
              <div onClick={() => chatpage(user.id, user.postid)} className='msg-person' key={uuidv4()}>
                <img src={user.postIcon} width="60px" />
                <div className='msg-content'>
                  <strong>{user.tokutyou}</strong>

                  {user.count > 0 && user.senderId !== localStorage.getItem("uid") ?
                    <h6>新着メッセージ{user.count}件あります</h6> :
                    <p>{user.text}</p>}
                    {/* <p>{user.time.toDate().toLocaleString()}</p> */}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Message;
