import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../img/image.png';
import './Hito.css';
import sampleimg from "../../img/img1.jpg";

function Hito({hitoInfo,setHitoInfo}) {
    const navigation = useNavigate();
    const back = () => {
        navigation('/login/home/addpost');
    }
    const next = () => {
        navigation('/login/home/addpost/hito/SureHitoInfo');
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHitoInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

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
                    <input
                        type='radio'
                        name='gender'
                        id='male'
                        value='男'
                        checked={hitoInfo.gender === '男'}
                        onChange={handleInputChange}
                    />
                    <label htmlFor='male'>男性</label>
                    <input
                        type='radio'
                        name='gender'
                        id='female'
                        value='女'
                        checked={hitoInfo.gender === '女'}
                        onChange={handleInputChange}
                    />
                    <label htmlFor='female'>女性</label>
                    <input
                        type='radio'
                        name='gender'
                        id='other'
                        value='その他'
                        checked={hitoInfo.gender === 'その他'}
                        onChange={handleInputChange}
                    />
                    <label htmlFor='other'>その他</label>
                </div>
                <div className='inputran'>
                    <p>年齢：</p>
                    <input
                        type='number'
                        name='age'
                        value={hitoInfo.age}
                        onChange={handleInputChange}
                    />
                    <label>歳</label>
                </div>
            </div>
            <div className='maigoimg'>
                <img src={sampleimg} height="200px" alt='サンプル画像'/>
            </div>
            <div>
                <div className='dis-info'>
                    <div className="name">
                        <label>　　名前　:</label>
                        <input
                            type='text'
                            name='name'
                            value={hitoInfo.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='name'>
                        <label>　　場所　:</label>
                        <input
                            type='text'
                            name='place'
                            value={hitoInfo.place}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='name'>
                        <label>　目撃時間:</label>
                        <input
                            type='text'
                            name='time'
                            value={hitoInfo.time}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='tokuryou'>
                        <label>特徴 :</label>
                        <textarea
                            className='tokutyou-area'
                            name='tokutyou'
                            value={hitoInfo.tokutyou}
                            onChange={handleInputChange}
                        />
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
