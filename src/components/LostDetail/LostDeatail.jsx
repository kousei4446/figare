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
import { FaTag } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";


function App() {

    const [activePost, setActivePost] = useState({})
    const [AddDet, setAddDet] = useState(false);
    const navigate = useNavigate();

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
    useEffect(() => {
        if (!localStorage.getItem("uid")) {
            navigate("/")
        }
    }, [])

    //元画面遷移
    const Backbtn = () => {
        const back = () => {
            navigate("/login/home");
        }
        return (
            <button className="lostdetail-backbtn" onClick={back}>
                <IoMdArrowRoundBack />
            </button>
        )
    }

    //落とし物画像，モーダル表示
    const ChangePict = ({ activePost }) => {
        const displayText = activePost.kind === "もの" ? "落としもの画像" : "探している人";

        useEffect(() => {
            const dialog = document.getElementById("picture");

            const handleClickOutside = (event) => {
                if (event.target.closest('#dialogcls') === null) {
                    dialog.close();
                }
            };

            dialog.addEventListener('click', handleClickOutside);

            return () => {
                dialog.removeEventListener('click', handleClickOutside);
            };
        }, []);

        const openbtn = () => document.getElementById("picture").showModal();

        const closebtn = () => document.getElementById("picture").close();

        return (
            <div className="lostdetail-image-container">
                <div className="lostdetail-title-text">{displayText}</div>
                <div>
                    <button onClick={openbtn} className='lostdetail-logo-btn'>
                        <img className='lostdetail-logo-image' src={activePost.file} alt="Logo" />
                    </button>

                    <dialog id="picture" className="lostdetail-picture">
                        <div id="dialogcls">
                            <div className="diabtn">
                                {/* <a onClick={closebtn} className='lostdetail-logo-expand'>x</a> */}
                                <img className='lostdetail-logo-epict' src={activePost.file} alt="Logo" />
                            </div>
                        </div>
                    </dialog>
                </div>
                <div className='lostdetail-modalexp'>
                    <button onClick={openbtn} className='lostdetail-modalexpbtn'>
                        画像をタップして拡大
                    </button>
                </div>
            </div>
        );
    };

    //基本落とし物情報，タグ
    const Tag = ({ activePost }) => { //関連するタグを表示
        return (
            <div className='lostdetail-tag-container'>
                <div className='lostdetail-title-text'>基本情報</div>
                <ul className='lostdetail-tag-list'>
                    <li><FaTag /> {activePost.kind}</li>
                    <li><FaTag /> {activePost.place}</li>
                </ul>
            </div>
        );
    };

    //詳細ウィンドウ
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
                {/* <button className='lostdetail-detail-button' onClick={detail}>
                    {open ? <GoChevronUp /> : <GoChevronDown />}
                </button> */}

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
                        {/* <div className='lostdetail-title'>その他</div>
                        <div className='lostdetail-content'> */}
                        {/* その他の内容があればここに追加 */}
                        {/* </div> */}
                    </div>
                </div>
            </>
        );
    };

    // const Plusalpha = () => { //入力のその他
    //     const Plus = () => {
    //         // プラスアルファの操作を追加
    //     };

    //     return (
    //         <>
    //             <button className='lostdetail-plus-button' onClick={Plus}>
    //                 <BsPlusLg />
    //             </button>
    //         </>
    //     );
    // };

    // const Camera = () => { //画像を追加
    //     const cam = () => {
    //         // カメラの操作を追加
    //     };

    //     return (
    //         <button className='lostdetail-camera-button' onClick={cam}>
    //             <AiOutlinePicture />
    //         </button>
    //     )
    // }

    //メッセージを入力
    const Message = ({ activePost }) => {
        const [text, setText] = useState("")
        const navigation = useNavigate();
        const chatpage = async () => {
            const UID = localStorage.getItem("uid");
            const userDocRef = doc(db, "googleusers", activePost.poster);
            const userDocSnap = await getDoc(userDocRef);
            const myUserInfo = userDocSnap.data();

            const docRefss = doc(db, "userChats", UID);
            const docSnapss = await getDoc(docRefss);

            if (docSnapss.exists()) {
                await updateDoc(docRefss, {
                    [activePost.id]: {
                        date: Timestamp.now(),
                        userInfo: {
                            postIcon: activePost.file,
                            photoURL: myUserInfo.photoURL,
                            uid: activePost.poster,
                            username: myUserInfo.username,
                        },
                    },
                });
            } else {
                await setDoc(docRefss, {
                    [activePost.id]: {
                        date: Timestamp.now(),
                        userInfo: {
                            postIcon: activePost.file,
                            photoURL: myUserInfo.photoURL,
                            uid: activePost.poster,
                            username: myUserInfo.username,
                        },
                    },
                });
            }

            const hisDocRef = doc(db, "userChats", activePost.poster);
            const hisDocSnap = await getDoc(hisDocRef);
            const hisUserDocRef = doc(db, "googleusers", UID);
            const hisUserDocSnap = await getDoc(hisUserDocRef);
            const hisUserInfo = hisUserDocSnap.data();

            if (hisDocSnap.exists()) {
                await updateDoc(hisDocRef, {
                    [activePost.id]: {
                        date: Timestamp.now(),
                        userInfo: {
                            postIcon: activePost.file,
                            photoURL: hisUserInfo.photoURL,
                            uid: UID,
                            username: hisUserInfo.username,
                        },
                    },
                });
            } else {
                await setDoc(hisDocRef, {
                    [activePost.id]: {
                        date: Timestamp.now(),
                        userInfo: {
                            postIcon: activePost.file,
                            photoURL: hisUserInfo.photoURL,
                            uid: UID,
                            username: hisUserInfo.username,
                        },
                    },
                });
            }

            const chatPairId = activePost.id + UID + activePost.poster;
            const chatPairIds = activePost.id + activePost.poster + UID;
            localStorage.setItem("chatpair", chatPairId);

            const docRef = doc(db, 'chats', chatPairId);
            const docRefs = doc(db, 'chats', chatPairIds);

            const docSnap = await getDoc(docRef);
            const docSnaps = await getDoc(docRefs);

            if (docSnap.exists()) {
                await updateDoc(docRef, {
                    message: arrayUnion({ date: Timestamp.now(), sender: UID, text: text, checked: false })
                });
                localStorage.setItem("chatpair", chatPairId);
            } else if (docSnaps.exists()) {
                await updateDoc(docRefs, {
                    message: arrayUnion({ date: Timestamp.now(), sender: UID, text: text, checked: false })
                });
                localStorage.setItem("chatpair", chatPairIds);
            } else {
                await setDoc(docRef, {
                    message: [{ date: Timestamp.now(), sender: UID, text: text, checked: false }]
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

    //Appのreturn
    return (

        <div className='lostdetail-body'>
            <div className='lostdetail-container'>
                <Backbtn />
                <div className='lostdetail-box lostdetail-ctp '>
                    <ChangePict activePost={activePost} />
                    <div className='lostdetail-separator'></div>
                    <Tag activePost={activePost} />
                </div>
                <div className='lostdetail-box lostdetail-detail-display'>
                    <DetDisp Add={AddDet} setAdd={setAddDet} activePost={activePost} />
                    {/* <br /> */}
                </div>
                <div className='lostdetail-box-ex lostdetail-inbtn'>
                    {/* <Message activePost={activePost} /> */}
                    {JSON.parse(localStorage.getItem("isMyPost")) ? null : (
                        <>
                            {/* <Plusalpha />
                                <Camera /> */}
                            <Message activePost={activePost} />
                        </>
                    )
                    }
                    {/* <Contribution /> */}
                </div>
            </div>
        </div>
    );
}

export default App;
