import React from 'react'
import './LostDetail.css';
import { useState } from 'react';
import logoImage from '../LostDetail/testpict.png';
import { AiOutlinePicture } from "react-icons/ai";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { BsPlusLg } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
// import { doc, setDoc } from 'firebase/firestore';
// import { IoIosExpand } from 'react-icons/io';


const ChangePict = ({ newLogo, setLogo, activePost }) => { //写真を表示

    setLogo(newLogo);

    return (
        <img className='lostdetail-logo-image' src={activePost.file} alt="Logo" />
    );
};

const Tag = ({ activePost }) => { //関連するタグを表示
    return (
        <div className='lostdetail-tag-container'>
            <ul className='lostdetail-tag-list'>
                <li>{activePost.kind}</li>
                <li>tag</li>
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
        const date = timestamp.toDate();
        const option = { year: 'numeric', month: 'long', day: 'numeric' };
        const formatD = date.toLocaleDateString('ja-JP', option);

        const hour = date.getHours();
        const minute = date.getMinutes().toString().padStart(2, '0');
        const formatT = `${hour}時${minute}分`;

        return `${formatD} ${formatT}`;
    };

    // const Plus = () => setOpen((prev) => !prev);

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

const Message = () => { //メッセージを入力
    const mess = () => {

    };

    return (
        <input className='lostdetail-message-button'
            placeholder='メッセージをココに入力'>
        </input>
    );
};

const Contribution = () => {
    return (<button className='contbtn'>
        <FaRegPaperPlane />
    </button>
    )
}


function App({ activePost }) {

    const [logo, setLogo] = useState(logoImage);
    const [AddDet, setAddDet] = useState(false);



    return (
        <div className='lostdetail-body'>
            <div className='lostdetail-container'>
                <div className='lostdetail-box lostdetail-ctp lostdetail-top'>
                    <ChangePict newLogo={logo} setLogo={setLogo} activePost={activePost} />
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
                        <Message />
                        <Contribution />
                    </div>
                </div>
            </div>
        </div>


    );
}

export default App;