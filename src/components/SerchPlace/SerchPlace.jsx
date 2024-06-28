import React from 'react'
import { useNavigate } from 'react-router-dom'

function SerchPlace() {
  const navigate=useNavigate()
  const comp=()=>{
      navigate("/login/home")
  }
  return (
    <div>
      <h1>探したい地区or発見した地区</h1>
      <button onClick={comp}>決定</button>
    </div>
  )
}

export default SerchPlace