import React from 'react'
import { useNavigate } from 'react-router-dom'
import image from "../../img/image.png"
import "./Message.css"

function Messeage() {
    const navigation = useNavigate()
    const back = () => {
        navigation("/login/home")
    }
    const chatpage = () => {
        navigation("/login/home/chat/")
    }
    return (
        <div>
            <div className='msg-head'>
                <img src={image} height="50px" className='back-btn' onClick={back} />
                <h1>メッセージ一覧</h1>
            </div>
            <div className='messages'>
                <div onClick={chatpage} className='msg-person'>
                    <h3>icon　</h3>
                    <p>新着メッセージ</p>
                </div>
                <div onClick={chatpage} className='msg-person'>
                    <h3>icon　</h3>
                    <p>新着メッセージ</p>
                </div>
                <div onClick={chatpage} className='msg-person'>
                    <h3>icon　</h3>
                    <p>新着メッセージ</p>
                </div>
                <div onClick={chatpage} className='msg-person'>
                    <h3>icon　</h3>
                    <p>新着メッセージ</p>
                </div>
                <div onClick={chatpage} className='msg-person'>
                    <h3>icon　</h3>
                    <p>新着メッセージ</p>
                </div>
                <div onClick={chatpage} className='msg-person'>
                    <h3>icon　</h3>
                    <p>新着メッセージ</p>
                </div>
            </div>
        </div>
    )
}

export default Messeage