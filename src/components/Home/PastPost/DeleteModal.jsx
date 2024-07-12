import React from 'react';
import "./DeleteModal.css";

function DeleteModal({ setConfirm, deleteBtn, id, storagePath }) {
    return (
        <div className="overlay">
            <div className="content" onClick={(e) => e.stopPropagation()}>
                <p>本当に削除してよろしいでしょうか</p>
                <div>
                    <button onClick={() => {
                        deleteBtn(id, storagePath);
                        setConfirm(false);
                    }}>はい</button>
                    <button onClick={() => setConfirm(false)} style={{ backgroundColor: "white", color: "black", border: "1px solid black" }}>いいえ</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
