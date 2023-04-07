/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit'

export const activeNav = createSlice({
    name:"activeNav",
    initialState:{
        value:0
    },
    reducers:{
        changeNav:(state,action)=>{
            state.value = action.payload.actNav
        }
    }
})

export const  {changeNav} =  activeNav.actions

export default activeNav