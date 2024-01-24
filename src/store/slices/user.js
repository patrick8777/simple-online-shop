import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    validAccessToken: undefined, // validated JWT token
    userDetails: null, // Object with all user details
  },
  reducers: {
    login: (state, action) => {
      state.validAccessToken = action.payload
    },

    loadUser: (state, action) => {
      state.userDetails = action.payload
    },
    logout: (state, action) => {
      state.validAccessToken = null
      state.userDetails = null
    },
  },
})

export const { login, logout, loadUser } = userSlice.actions

export default userSlice.reducer
