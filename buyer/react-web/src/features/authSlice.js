import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.status = true
    },
    logout: (state) => {
      state.status = false
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
