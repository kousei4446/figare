import React from 'react'
import { useNavigate } from 'react-router-dom'

function Username() {
    const navigate=useNavigate()
    const comp=()=>{
        navigate("/login/serchplace")
    }
  return (
    <div>
        <h1>Username</h1>
        <button onClick={comp}>決定</button>
    </div>
  )
}

export default Username