import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  productList: [
   
  ],
  orders: [],
  totalItems: 0,
  totalPrice: 0,
}

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    addToOrders: (state, action) => {
      const selectedProduct = action.payload

      const index = state.orders.findIndex(
        (order) => order.id === selectedProduct.id
      )

      if (index === -1) {
        state.orders = [selectedProduct, ...state.orders]
      } else {
        state.orders[index].amount++
      }
    },

    deleteOrder: (state, action) => {
      const selectedOrderId = action.payload

      state.orders = state.orders.filter(
        (product) => product.id !== selectedOrderId
      )
    },

    increase: (state, action) => {
      const selectedOrderId = action.payload

      const selectedOrder = state.orders.find(
        (order) => order.id === selectedOrderId
      )

      selectedOrder.amount += 1
    },

    decrease: (state, action) => {
      const selectedOrderId = action.payload

      const selectedOrder = state.orders.find(
        (order) => order.id === selectedOrderId
      )

      selectedOrder.amount -= 1
    },

    setProducts: (state,action)=>{
      state.productList = action.payload
    },

    computeTotalItems: (state) => {
      state.totalItems = state.orders.reduce((acc, currItem) => {
        const { amount } = currItem

        acc += amount

        return acc
      }, 0)
    },

    computeTotalPrice: (state) => {
      state.totalPrice = state.orders.reduce((acc, currItem) => {
        const { amount, price } = currItem

        const totalPrice = amount * price

        acc += itemTotal

        return acc
      }, 0)
    },
  },
})

export const {
  addToOrders,
  deleteOrder,
  computeTotalItems,
  computeTotalPrice,
  increase,
  decrease,
  setProducts
} = productSlice.actions

export default productSlice.reducer
