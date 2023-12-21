import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState : {
        products: [],
    },
    reducers:{
        addProduct: (state, action) => {
            const iteminCart = state.products.find((item) => item._id ===action.payload._id)
            if(iteminCart)
            {
                iteminCart.quantity++
            }
            else
            {
                state.products.push({...action.payload, quantity: 1})
            }
        },
        incrementQuantity: (state, action) => {
            const item=state.products.find((item)=>item._id===action.payload._id)
            item.quantity++
        },
        decrementQuantity: (state, action)=>{
            const item=state.products.find((item)=>item._id===action.payload._id)
            if(item.quantity>1)
            item.quantity--
        },
        removeItem: (state, action)=>{
            const item=state.products.filter((item)=>item._id!==action.payload._id);
            state.products=item;
        },
        clearCart: (state)=>{
            state.products=[];
        }
    }
})

export const {addProduct, increamentQuantity, decrementQuantity, removeItem, clearCart}=cartSlice.actions;
export default cartSlice.reducer;