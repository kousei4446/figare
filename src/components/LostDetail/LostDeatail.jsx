import React from 'react'
import { useState } from 'react';
import logoImage from '../LostDetail/testpict.png';
import cameraImage from '../LostDetail/CameraMark.png';

const ChangePict = ({ newLogo, setLogo }) => { //写真を表示

    setLogo(newLogo);

    return (
        <img src={newLogo || logoImage} alt="Logo" />
    );
};

const Tag = () => { //関連するタグを表示
    return (
        <>tag</>
    );
};

const DetDisp = ({ Add, setAdd }) => { //詳細を表示
    const detail = () => {
        setAdd(!Add);
    };

    return (
        <>
            <button onClick={detail}>詳細を表示</button>
            {Add && (
                <div>
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
        <button onClick={Plus}>＋</button>
    );
};

const Camera = () => { //画像を追加
    const cam = () => {

    };

    return (
        <button onClick={cam}>
            <img src={cameraImage} alt="Camera" />
        </button>
    )
}

const Message = () => { //メッセージを入力
    const mess = () => {

    };

    return (
        <button onClick={mess}>メッセージを入力</button>
    );
};


function App() {

    const [logo, setLogo] = useState(logoImage);
    const [AddDet, setAddDet] = useState(false);


    return (

        <>
            <div className='Top'>
                <ChangePict newLogo={logo} setLogo={setLogo} />
                <Tag />
                <br />
            </div>


            <div className='DetailDisplay'>
                <DetDisp Add={AddDet} setAdd={setAddDet} />
                <br />
            </div>


            <div className='Input'>
                <Plusalpha />
                <Camera />
                <Message />
            </div>
        </>

    );
}

export default App;