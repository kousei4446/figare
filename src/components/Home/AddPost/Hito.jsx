import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../img/image.png';
import './Hito.css';
import sampleimg from "../../img/sampleimg.png"

function Hito() {
    const navigation = useNavigate();
    const back = () => {
        navigation('/login/home/addpost');
    }
    const next = () => {
        navigation('/login/home/addpost/hito/SureHitoInfo');
    }

    return (
        <div>
            <div className='blue'></div>
            <div className='dis-head'>
                <img src={image} height='50px' className='back-btn' onClick={back} alt='戻る' />
                <div style={{ textAlign: "center", width: "100vw" }}>
                    <p style={{ fontSize: '28px' }}>詳細情報を入力してね</p>
                </div>
            </div>
            <div>
                <div className='inputran'>
                    <p>性別：</p>
                    <input type='radio' name='gender' id='male' value='male' />
                    <label htmlFor='male'>男性</label>
                    <input type='radio' name='gender' id='female' value='female' />
                    <label htmlFor='female'>女性</label>
                    <input type='radio' name='gender' id='other' value='other' />
                    <label htmlFor='other'>その他</label>
                </div>
                <div className='inputran'>
                    <p>年齢：</p>
                    <input type='number' />
                    <label>歳</label>
                </div>
            </div>
            <div className='maigoimg'>
                <img src={sampleimg} width="200px" height="200px" />
            </div>
            <div>
                <div className='dis-info'>
                    <div className="name">
                        <label>　　名前　:</label>
                        <input type='text' />
                    </div>
                    <div className='name'>
                        <label>　　場所　:</label>
                        <input type='text' />
                    </div>
                    <div className='name'>
                        <label>　目撃時間:</label>
                        <input type='text' />
                    </div>
                    <div className='tokuryou'>
                        <label>特徴 :</label>
                        <textarea className='tokutyou-area' />
                    </div>
                </div>
                <div className='okbtn-posi'>
                    <button className='ok-btn' onClick={next}>OK</button>

                </div>
            </div>
        </div>
    );
}

export default Hito;
