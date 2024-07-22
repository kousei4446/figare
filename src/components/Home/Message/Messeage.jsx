import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { IoMdArrowRoundBack } from 'react-icons/io';
import './Message.css';

function Message() {
  const [documentIdList, setDocumentIdList] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState('');

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    if (!uid) {
      navigate('/');
    } else {
      setUid(uid);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDocumentIdAndUsername = async () => {
      setLoading(true);
      try {
        if (!uid) return;

        const userChatDocRef = doc(db, 'userChats', uid);
        const userChatDocSnap = await getDoc(userChatDocRef);

        if (userChatDocSnap.exists()) {
          const userData = userChatDocSnap.data();
          const keyList = Object.keys(userData);
          const fetchedUsernames = [];

          for (const id of keyList) {
            const postDocRef = doc(db, 'Posts', id);
            const postDocSnap = await getDoc(postDocRef);

            if (postDocSnap.exists()) {
              const postData = postDocSnap.data();
              let posterId = postData.poster;
              if (uid === posterId) {
                const userInfoDoc = await getDoc(doc(db, 'userChats', uid));
                if (userInfoDoc.exists()) {
                  const userInfoData = userInfoDoc.data();
                  if (userInfoData && userInfoData[id]) {
                    posterId = userInfoData[id].userInfo.uid;
                  }
                }
              }
              const chatDocRef1 = doc(db, 'chats', id + posterId + uid);
              const chatDocSnap1 = await getDoc(chatDocRef1);
              const chatDocRef2 = doc(db, 'chats', id + uid + posterId);
              const chatDocSnap2 = await getDoc(chatDocRef2);

              let lastMessage = '';
              let senderId = '';
              let time = '';
              let count = 0;

              if (chatDocSnap1.exists() && chatDocSnap1.data()) {
                const messages = chatDocSnap1.data().message;
                if (messages && messages.length > 0) {
                  lastMessage = messages[messages.length - 1].text;
                  senderId = messages[messages.length - 1].sender;
                  time = messages[messages.length - 1].date;
                  count = messages.filter((msg) => msg.checked === false && msg.sender !== uid).length;
                }
              } else if (chatDocSnap2.exists() && chatDocSnap2.data()) {
                const messages = chatDocSnap2.data().message;
                if (messages && messages.length > 0) {
                  lastMessage = messages[messages.length - 1].text;
                  senderId = messages[messages.length - 1].sender;
                  time = messages[messages.length - 1].date;
                  count = messages.filter((msg) => msg.checked === false && msg.sender !== uid).length;
                }
              }

              fetchedUsernames.push({
                time: time,
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

          // 時間順にソート
          fetchedUsernames.sort((a, b) => b.time.seconds - a.time.seconds);
          setDocumentIdList(fetchedUsernames);
        } else {
          console.log(`User chat document with ID ${uid} does not exist`);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentIdAndUsername();
  }, [uid]);

  const back = () => {
    navigate('/login/home');
  };

  const chatpage = async (id, posterId) => {
    const documents = posterId + uid + id;
    const docRef1 = doc(db, 'chats', documents);
    const docSnap1 = await getDoc(docRef1);
    const docRef2 = doc(db, 'chats', posterId + id + uid);
    const docSnap2 = await getDoc(docRef2);

    if (docSnap1.exists()) {
      localStorage.setItem('chatpair', posterId + uid + id);
      navigate('/login/home/chat');
    } else if (docSnap2.exists()) {
      localStorage.setItem('chatpair', posterId + id + uid);
      navigate('/login/home/chat');
    }
  };
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0'); // 時間を0パディング
    const minutes = date.getMinutes().toString().padStart(2, '0'); // 分を0パディング
    return `${month}/${day} ${hours}:${minutes}`;
  };
  
  return (
    <div>
      {loading ? (
        <div className="load">
          <h3>メッセージデータを取得中</h3>
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="msg-head">
            <button className="back-btn" onClick={back} alt="Back">
              <IoMdArrowRoundBack />
            </button>
            <h3>メッセージ一覧</h3>
          </div>
          <div className="messages">
            {documentIdList.map((user) => (
              <div onClick={() => chatpage(user.id, user.postid)} className="msg-person" key={uuidv4()}>
                <img src={user.postIcon} width="60px" alt="icon" />
                <div className="msg-content">
                  <strong>{user.tokutyou.length > 10 ? `${user.tokutyou.slice(0, 10)}...` : user.tokutyou}</strong>
                  {user.count > 0 && user.senderId !== localStorage.getItem('uid') ? (
                    <h6 >新着メッセージ{user.count}件あります</h6>
                  ) : (
                    <p>{user.text}</p>
                  )}
                </div>
                <div className='msg-time'>
                  <p>{formatDate(user.time)}</p>
                </div>
                {user.count > 0 && (
                  <div className="msg-num" style={{marginTop:"10px"}}>
                    <p >{user.count}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Message;
