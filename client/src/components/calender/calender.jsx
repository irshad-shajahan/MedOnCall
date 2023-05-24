/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ms from 'ms'

function Calender(props) {

  const [date,setDate] = useState(new Date())
  
  const disabled = () =>{
   let dd; let mm;
    const today = new Date()
    const month = today.getMonth()+1
    dd = `${  today.getDate()}`
    mm = `${  month}`
   
    const yyyy = `${  today.getFullYear()}`
    if(dd.length<2){
      dd = 0 + dd
    }
    
    if(mm.length<2){
      mm = 0 + mm 
    }
    return `${yyyy  }-${  mm  }-${  dd}`
  }
  
  
  const maxday = () =>{

    const day = new Date();
    let dd; let mm;
    const nextDay = new Date(day);
    const month = day.getMonth()+1

    const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const lastDay =last.getDate() 
    const diff = lastDay - day.getDate()

    nextDay.setDate(day.getDate() + diff);
   dd = `${  nextDay.getDate()}`
    mm = `${  month}`  
  const yyyy = `${  nextDay.getFullYear()}`

    if(dd.length<2){
      dd = 0 + dd
    }
    
    if(mm.length<2){
      mm = 0 + mm
    }
    
   const maximum = `${yyyy  }-${   mm  }-${   dd}`
    return maximum
  }


  return (
    
      <input type="date" min={disabled()} max={maxday()} onChange = {props.onChange} className={props.class} name = {props.name}/>
   
  )
}

export default Calender