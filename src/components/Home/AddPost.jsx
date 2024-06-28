import React from 'react'
import { useNavigate } from 'react-router-dom'

function AddPost() {
    const navigation=useNavigate()
    const back=()=>{
        navigation("/login/home")
    }
    const hito=()=>{
        navigation("/login/home/addpost/hito")
    }
    
    return (
        <div>
            <div>
                <button onClick={back}>戻る</button>
            </div>
            <h1>種類を選んでね</h1>
            <div>
                <button onClick={hito}>人</button>
                <button>ペット</button>
                <button>もの</button>
                <button>その他</button>
            </div>
        </div>
    )
}

export default AddPost