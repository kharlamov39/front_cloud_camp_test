import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const submitForm = createAsyncThunk(
    'submitForm',
    async (obj:{}) => {
        const res = await axios.post('https://api.sbercloud.ru/content/v1/bootcamp/frontend', obj)
    }
)

type State = {
    phone: string
    email: string
    success: null | boolean
}

const initialState:State = {
    phone: '',
    email: '',
    success: null
}

const formSlice = createSlice({
    name: 'form', 
    initialState,
    reducers: {
        fetchStartForm: (state, action) => {
            state.email = action.payload.email
            state.phone = action.payload.phone
        },
        closeModal: (state) => {
            state.success = null
        }
    },
    extraReducers: {
       [submitForm.pending.type]: (state) => {
            state.success = null
       }, 
       [submitForm.fulfilled.type]: (state) => {
            state.success = true
       }, 
       [submitForm.rejected.type]: (state) => {
            state.success = false
       }, 
    }
})

export const { fetchStartForm, closeModal } = formSlice.actions

export default formSlice.reducer