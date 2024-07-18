import React from 'react';
import './PrivateModeWarning.css'; // スタイルをインポート
import { AiFillCloseCircle } from "react-icons/ai";
const PrivateModeWarning = ({ setIsOpenModal }) => {
    return (
        <div className="private-warning">
            <div className="modal-content">
                <div className='modal-tojiru'>
                    <AiFillCloseCircle className="back-icon" onClick={() => setIsOpenModal(false)} />
                </div>
                <p>プライベートモードを使用することはセキュリティ上のリスクを招く可能性があります。</p>
                <p>プライベートモードを解除して、より安全な設定でウェブサイトをご利用ください。</p>
            </div>
        </div>
    );
};

export default PrivateModeWarning;
