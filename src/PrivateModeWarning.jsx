import React from 'react';
import './PrivateModeWarning.css'; // スタイルをインポート
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMail } from 'react-icons/fi';
const PrivateModeWarning = ({ setIsOpenModal }) => {
    return (
        <div className="private-warning">
            <div className="modal-content">
                <div className='modal-tojiru'>
                    <a href='https://docs.google.com/forms/d/e/1FAIpQLSf7_UDugSccFIFirIg8t7IbDcj2LldzOzHTctWl9yll5zaXjg/viewform'><FiMail size={32} color="#007bff"/></a>
                    <AiFillCloseCircle className="back-icon" onClick={() => setIsOpenModal(false)} />
                </div>
                <p>プライベートモードを使用することはセキュリティ上のリスクを招く可能性があります。</p>
                <p>プライベートモードを解除して、より安全な設定でウェブサイトをご利用ください。</p>
            </div>
        </div>
    );
};

export default PrivateModeWarning;
