import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./AddPost.css"
import image from "../../img/image.png"

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
    const monopage=()=>{
        navigation("/login/home/addpost/mono")
    }
    return (
        <div className='addpost'>
            <div className='blue'></div>
            <div>
            <img src={image} height="50px" className='back-btn' onClick={back} />
                
            </div>
            <div className='kindmain'>
            <p style={{ fontSize: "30px" }}>種類を選んでね</p>
            <div className='threebtn'>
                    <button onClick={hito} className='kind-btns'>人</button>
                    <button onClick={petpage} className='kind-btns'>ペット</button>
                    <button onClick={monopage} className='kind-btns'>もの</button>
                </div>
                <button onClick={petpage} className='kind-btn'>その他</button>
            </div>
        </div>
    )
}

export default AddPost