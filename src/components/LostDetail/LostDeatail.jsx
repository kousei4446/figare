import React from 'react'
import './LostDetail.css';
import { useState } from 'react';
import logoImage from '../LostDetail/testpict.png';
import { AiOutlinePicture } from "react-icons/ai";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsPlusLg } from "react-icons/bs";


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
                <li>tag1</li>
                <li>tag2</li>
                <li>tag3</li>
            </ul>
        </div>
    );
};

const DetDisp = ({ Add, setAdd }) => { //詳細を表示
    const detail = () => {
        setAdd(!Add);
    };

    return (
        <>
            詳細を表示
            <button className='lostdetail-detail-button' onClick={detail}>
                <TiArrowSortedDown />
            </button>

            {Add && (
                <div className='lostdetail-detail-content'>
                    プロフィールが表示される．
                </div>
            )}
        </>
    );
};

const Plusalpha = () => { //入力のその他
    const Plus = () => {

    };

    return (
        <button className='lostdetail-plus-button' onClick={Plus}>
            <BsPlusLg />
        </button>
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
        <button className='lostdetail-message-button' onClick={mess}>メッセージを入力</button>
    );
};


function App() {

    const [logo, setLogo] = useState(logoImage);
    const [AddDet, setAddDet] = useState(false);


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

                <div className='lostdetail-box lostdetail-inbtn'>
                    <div className='lostdetail-input'>
                        <Plusalpha />
                        <Camera />
                        <Message />
                    </div>
                </div>

            </div>
        </div>


    );
}

export default App;