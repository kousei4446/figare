import React from 'react'
import './LostDetail.css';
import { useState } from 'react';
import logoImage from '../LostDetail/testpict.png';
import cameraImage from '../LostDetail/CameraMark.png';
import { TiArrowSortedDown } from "react-icons/ti";


const ChangePict = ({ newLogo, setLogo }) => { //写真を表示

    setLogo(newLogo);

    return (
        <img className='logo-image' src={newLogo || logoImage} alt="Logo" />
    );
};

const Tag = () => { //関連するタグを表示
    return (
        <div className='tag-container'>
            <ul className='tag-list'>
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
            <button className='detail-button' onClick={detail}>
                <TiArrowSortedDown />
            </button>

            {Add && (
                <div className='detail-content'>
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
        <button className='plus-button' onClick={Plus}>＋</button>
    );
};

const Camera = () => { //画像を追加
    const cam = () => {

    };

    return (
        <button className='camera-button' onClick={cam}>
            <img src={cameraImage} alt="Camera" />
        </button>
    )
}

const Message = () => { //メッセージを入力
    const mess = () => {

    };

    return (
        <button className='message-button' onClick={mess}>メッセージを入力</button>
    );
};


function App() {

    const [logo, setLogo] = useState(logoImage);
    const [AddDet, setAddDet] = useState(false);


    return (

        <div className='container'>
            <div className='box ctp top'>
                <ChangePict newLogo={logo} setLogo={setLogo} />
                <Tag />
                <br />
            </div>


            <div className='box detail-display'>
                <DetDisp Add={AddDet} setAdd={setAddDet} />
                <br />
            </div>

            <div className='box inbtn'>
                <div className='input'>
                    <Plusalpha />
                    <Camera />
                    <Message />
                </div>
            </div>

        </div>

    );
}

export default App;