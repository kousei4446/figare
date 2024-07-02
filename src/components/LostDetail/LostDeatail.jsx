import React from 'react'
import './LostDetail.css';
import { useState } from 'react';
import logoImage from '../LostDetail/testpict.png';
import cameraImage from '../LostDetail/CameraMark.png';
import { TiArrowSortedDown } from "react-icons/ti";


const ChangePict = ({ newLogo, setLogo }) => { //写真を表示

    setLogo(newLogo);

    return (
        <img className='lostde-logo-image' src={newLogo || logoImage} alt="Logo" />
    );
};

const Tag = () => { //関連するタグを表示
    return (
        <div className='lostde-tag-container'>
            <ul className='lostde-tag-list'>
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
            <button className='lostde-detail-button' onClick={detail}>
                <TiArrowSortedDown />
            </button>

            {Add && (
                <div className='lostde-detail-content'>
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
        <button className='lostde-plus-button' onClick={Plus}>＋</button>
    );
};

const Camera = () => { //画像を追加
    const cam = () => {

    };

    return (
        <button className='lostde-camera-button' onClick={cam}>
            <img src={cameraImage} alt="Camera" />
        </button>
    )
}

const Message = () => { //メッセージを入力
    const mess = () => {

    };

    return (
        <button className='lostde-message-button' onClick={mess}>メッセージを入力</button>
    );
};


function App() {

    const [logo, setLogo] = useState(logoImage);
    const [AddDet, setAddDet] = useState(false);


    return (
        <div className='lostde-body'>
            <div className='lostde-container'>
                <div className='lostde-box lostde-ctp lostde-top'>
                    <ChangePict newLogo={logo} setLogo={setLogo} />
                    <Tag />
                    <br />
                </div>


                <div className='lostde-box lostde-detail-display'>
                    <DetDisp Add={AddDet} setAdd={setAddDet} />
                    <br />
                </div>

                <div className='lostde-box lostde-inbtn'>
                    <div className='lostde-input'>
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