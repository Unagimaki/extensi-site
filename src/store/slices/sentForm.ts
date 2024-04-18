import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    isFormSent: boolean
} 

const initialState = {
    isFormSent: false
} as InitialState

export const sentFormSlice = createSlice({
    name: 'sentForm',
    initialState,
    reducers: {
        isFormSent: (state) => {
            state.isFormSent = true
        }
    }
})

export const { isFormSent } = sentFormSlice.actions
export default sentFormSlice.reducer