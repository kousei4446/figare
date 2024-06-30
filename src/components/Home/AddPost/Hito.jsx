import React from 'react'
import { useNavigate } from 'react-router-dom'

function Hito() {
    const navigation = useNavigate()
    const back=()=>{
        navigation("/login/home/addpost")
    }
    const next=()=>{
        navigation("/login/home/addpost/hito/SureHitoInfo")
    }
    return (
        <div>
            <div><button onClick={back}>戻る</button></div>
            <h1>詳細情報を入力してね​</h1>
            <div><button onClick={next}>OK</button></div>
        </div>
    )
}

export default Hito