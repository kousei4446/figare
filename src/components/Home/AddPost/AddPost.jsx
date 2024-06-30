import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./AddPost.css"

function AddPost() {
    const navigation = useNavigate()
    const back = () => {
        navigation("/login/home")
    }
    const hito = () => {
        navigation("/login/home/addpost/hito")
    }
    const petpage = () => {
        navigation("/login/home/addpost/pet")
    }
    return (
        <div className='addpost'>
            <div className='blue'></div>
            <div>
                <button onClick={back}>戻る</button>
            </div>
            <div className='kindmain'>
                <h1>種類を選んでね</h1>
                <div className='threebtn'>
                    <button onClick={hito} className='kind-btn'>人</button>
                    <button onClick={petpage} className='kind-btn'>ペット</button>
                    <button className='kind-btn'>もの</button>
                </div>
                <button onClick={petpage} className='kind-bt'>その他</button>
            </div>
        </div>
    )
}

export default AddPost