import { createSlice } from "@reduxjs/toolkit";
import reducer from "./userSlice";



const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: []
  },
  reducers: {
    //action
    setProducts: (state, action) => {
      state.products = action.payload
    }
  }
})

export const { setProducts } = productSlice.actions
export default productSlice.reducer