import React from 'react'
import { useParams } from 'react-router-dom'

function DoctorList() {
  const params = useParams()
  console.log(params);
  return (
    <div>DoctorList</div>
  )
}

export default DoctorList