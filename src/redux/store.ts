import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';

const rootReducer = {
    form: formReducer,
}

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch