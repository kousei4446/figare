import React from 'react';
import { teikei } from './teikei';
import { useNavigate } from 'react-router-dom';

function ConformModal({postt,setConfirms}) {
    const navigate=useNavigate()
    return (
        <div className="overlaysss">
            <div className="content">
                <p>本当に送信してよろしいでしょうか</p>
                <div>
                    <button style={{backgroundColor:"skyblue"}} onClick={()=>{return teikei(postt),navigate("/login/home/chat")}} >はい</button>
                    <button style={{backgroundColor:"skyblue"}} onClick={() => setConfirms(false)} >いいえ</button>
                </div>
            </div>
        </div>
    );
}

export default ConformModal;
