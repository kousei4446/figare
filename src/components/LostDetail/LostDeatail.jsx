import React, { useEffect } from 'react'
import './LostDetail.css';
import { useState } from 'react';
import logoImage from '../LostDetail/testpict.png';
import { AiOutlinePicture } from "react-icons/ai";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { BsPlusLg } from "react-icons/bs";
import { IoIosExpand } from 'react-icons/io';
import { Timestamp, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';


const ChangePict = ({ newLogo, setLogo }) => { //写真を表示

    setLogo(newLogo);

    return (
        <img className='lostdetail-logo-image' src={newLogo || logoImage} alt="Logo" />
    );
};

const Tag = () => { //関連するタグを表示
    return (
        <div className='lostdetail-tag-container'>
            <ul className='lostdetail-tag-list'>
                <li>tag1aaaaaaaaaaaa</li>
                <li>tag2</li>
                <li>tag3bbbbb</li>
            </ul>
        </div>
    );
};

const DetDisp = ({ Add, setAdd }) => { //詳細を表示
    const [open, setOpen] = useState(true);

    const detail = () => {
        setOpen((prev) => !prev);
        setAdd(!Add);
    };

    // const Plus = () => setOpen((prev) => !prev);

    return (
        <>
            <div className='lostdetail-font'>
                Show Details
            </div>
            <button className='lostdetail-detail-button' onClick={detail}>
                {open ? <GoChevronUp /> : <GoChevronDown />}
            </button>

            <div className={`lostdetail-collapse ${open ? 'lostdetail-visible' : 'lostdetail-hidden'}`}>
                <div className='lostdetail-section'>
                    <div className='lostdetail-title'>特徴</div>
                    <div className='lostdetail-content'>
                        aaaaaaaaaaaaaaaaaaaaaa
                    </div>
                </div>
                <div className='lostdetail-section'>
                    <div className='lostdetail-title'>場所</div>
                    <div className='lostdetail-content'>
                        bbb
                    </div>
                </div>
                <div className='lostdetail-section'>
                    <div className='lostdetail-title'>時間</div>
                    <div className='lostdetail-content'>
                        c
                    </div>
                </div>
                <div className='lostdetail-section'>
                    <div className='lostdetail-title'>その他</div>
                    <div className='lostdetail-content'>
                        d
                    </div>
                </div>
            </div>

            {/* {Add && (
                <div className='lostdetail-detail-content'>
                    プロフィールが表示される．
                </div>
            )} */}
        </>
    );
};

const Plusalpha = () => { //入力のその他
    const Plus = () => {

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

    };

    return (
        <button className='lostdetail-camera-button' onClick={cam}>
            <AiOutlinePicture />
        </button>
    )
}

const Message = ({ activePost }) => { //メッセージを入力
    const [text, setText] = useState("")
    const mess = () => {

    };
    const navigation = useNavigate()
    const chatpage = async () => {
        const chatPairId = localStorage.getItem("uid") + activePost.poster;
        localStorage.setItem("chatpair", chatPairId);
        const docRef = doc(db, 'chats', chatPairId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            await setDoc(docRef, {
                message: [{ date: Timestamp.now(), sender: localStorage.getItem("uid"), text: text }]
            });

        } else {
            await updateDoc(docRef, {
                message: arrayUnion({ date: Timestamp.now(), sender: localStorage.getItem("uid"), text: text })
            });
        }
        navigation("/login/home/chat");

    };
    return (
        <>
            <input className='lostdetail-message-button' placeholder='メッセージを入力してください' onChange={(e) => setText(e.target.value)} />
            <button onClick={chatpage}>送信</button>
        </>

    );
};


function App() {
    const [activePost,setActivePost]=useState({})
    const [logo, setLogo] = useState(logoImage);
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
    }, [setActivePost]);
    return (
        <div className='lostdetail-body'>
            <div className='lostdetail-container'>
                <div className='lostdetail-box lostdetail-ctp lostdetail-top'>
                    <ChangePict newLogo={logo} setLogo={setLogo} />
                    <Tag />
                    <br />
                </div>


                <div className='lostdetail-box lostdetail-detail-display'>
                    <DetDisp Add={AddDet} setAdd={setAddDet} />
                    <br />
                </div>

                <div className='lostdetail-box-ex lostdetail-inbtn'>
                    <div className='lostdetail-input'>
                        <Plusalpha />
                        <Camera />
                        <Message activePost={activePost} />
                    </div>
                </div>
            </div>
        </div>


    );
}

export default App;