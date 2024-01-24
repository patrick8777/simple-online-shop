import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  number: 0,
}

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increase: (state) => {
      state.number += 1
    },

    decrease: (state) => {
      state.number -= 1
    },

    increaseByNumber: (state, action) => {
      const myNumber = action.payload

      state.number += myNumber
    },
  },
})

export const { increase, decrease, increaseByNumber } = counterSlice.actions

export default counterSlice.reducer
