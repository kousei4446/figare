import React, { act, useEffect } from 'react'
import './LostDetail.css';
import { useState } from 'react';
import { AiOutlinePicture } from "react-icons/ai";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { BsPlusLg } from "react-icons/bs";
import { Timestamp, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { FaRegPaperPlane } from "react-icons/fa";

const ChangePict = ({ activePost }) => { //写真を表示
    const displayText = activePost.kind === "もの" ? "落としもの画像" : "探している人";
    return (
        <div className="lostdetail-image-container">
            <div className="lostdetail-title-text">{displayText}</div>
            <br />
            <img className='lostdetail-logo-image' src={activePost.file} alt="Logo" />
        </div>
    );
};

const Tag = ({ activePost }) => { //関連するタグを表示
    return (
        <div className='lostdetail-tag-container'>
            <div className='lostdetail-tag-title'>関連するタグ</div>
            <ul className='lostdetail-tag-list'>
                <li>{activePost.kind}</li>
                <li>{activePost.place}</li>
            </ul>
        </div>
    );
};

const DetDisp = ({ Add, setAdd, activePost }) => { //詳細を表示
    const [open, setOpen] = useState(true);

    const detail = () => {
        setOpen((prev) => !prev);
        setAdd(!Add);
    };

    const formatDateTime = (timestamp) => {
        if (!timestamp) {
            return 'N/A';
        }
        const date = timestamp.toDate();
        const option = { year: 'numeric', month: 'long', day: 'numeric' };
        const formatD = date.toLocaleDateString('ja-JP', option);

        const hour = date.getHours();
        const minute = date.getMinutes().toString().padStart(2, '0');
        const formatT = `${hour}時${minute}分`;

        return `${formatD} ${formatT}`;
    };

    return (
        <>
            <div className='lostdetail-font'>
                詳細
            </div>
            <button className='lostdetail-detail-button' onClick={detail}>
                {open ? <GoChevronUp /> : <GoChevronDown />}
            </button>

            <div className={`lostdetail-collapse ${open ? 'lostdetail-visible' : 'lostdetail-hidden'}`}>
                <div className='lostdetail-section'>
                    <div className='lostdetail-title'>詳細情報</div>
                    <div className='lostdetail-content'>
                        {activePost.text}
                    </div>
                </div>
                <div className='lostdetail-section'>
                    <div className='lostdetail-title'>投稿時間</div>
                    <div className='lostdetail-content lostdetail-timestamp'>
                        {formatDateTime(activePost.time)}
                    </div>
                </div>
                <div className='lostdetail-section'>
                    <div className='lostdetail-title'>その他</div>
                    <div className='lostdetail-content'>
                        {/* その他の内容があればここに追加 */}
                    </div>
                </div>
            </div>
        </>
    );
};

const Plusalpha = () => { //入力のその他
    const Plus = () => {
        // プラスアルファの操作を追加
    };

    return (
        <>
            <button className='lostdetail-plus-button' onClick={Plus}>
                <BsPlusLg />
            </button>
        </>
    );
};

const Camera = () => { //画像を追加
    const cam = () => {
        // カメラの操作を追加
    };

    return (
        <button className='lostdetail-camera-button' onClick={cam}>
            <AiOutlinePicture />
        </button>
    )
}

const Message = ({ activePost }) => { //メッセージを入力
    const [text, setText] = useState("")
    const navigation = useNavigate();

    const chatpage = async () => {
        const UID = localStorage.getItem("uid");
        const chatPairId = UID + activePost.poster;
        const chatPairIds = activePost.poster + UID;
        localStorage.setItem("chatpair", chatPairId);
        const docRef = doc(db, 'chats', chatPairId);
        const docRefs = doc(db, 'chats', chatPairIds);

        const docSnap = await getDoc(docRef);
        const docSnaps = await getDoc(docRefs);

        if (docSnap.exists()) {
            await updateDoc(docRef, {
                message: arrayUnion({ date: Timestamp.now(), sender: UID, text: text })
            });
            localStorage.setItem("chatpair", chatPairId);
        } else if (docSnaps.exists()) {
            await updateDoc(docRefs, {
                message: arrayUnion({ date: Timestamp.now(), sender: UID, text: text })
            });
            localStorage.setItem("chatpair", chatPairIds);
        } else {
            await setDoc(docRef, {
                message: [{ date: Timestamp.now(), sender: UID, text: text }]
            });
            localStorage.setItem("chatpair", chatPairId);
        }
        navigation("/login/home/chat");
    };

    return (
        <>
            <input className='lostdetail-message-button' placeholder='メッセージを入力してください' onChange={(e) => setText(e.target.value)} />

            <button className='contbtn' onClick={chatpage}>
                <FaRegPaperPlane />
            </button>
        </>
    );
};

// const Contribution = () => {
//     return (
//         <button className='contbtn'>
//             <FaRegPaperPlane />
//         </button>
//     )
// }

function App() {
    const [activePost, setActivePost] = useState({})
    // const [logo, setLogo] = useState(logoImage);
    const [AddDet, setAddDet] = useState(false);

    useEffect(() => {
        const fetchPostData = async () => {
            const docRef = doc(db, "Posts", localStorage.getItem("postid"));
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const post = docSnap.data();
                setActivePost(post);
            }
        };
        fetchPostData();
    }, []);

    return (
        <div className='lostdetail-body'>
            <div className='lostdetail-container'>
                <div className='lostdetail-box lostdetail-ctp lostdetail-top'>
                    <ChangePict activePost={activePost} />
                    <Tag activePost={activePost} />
                    <br />
                </div>
                <div className='lostdetail-box lostdetail-detail-display'>
                    <DetDisp Add={AddDet} setAdd={setAddDet} activePost={activePost} />
                    <br />
                </div>
                <div className='lostdetail-box-ex lostdetail-inbtn'>
                    <div className='lostdetail-input'>
                        <Plusalpha />
                        <Camera />
                        <Message activePost={activePost} />
                        {/* <Contribution /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
