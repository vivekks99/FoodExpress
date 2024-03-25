import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action){
            state.cart.push(action.payload);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        deleteItem(state, action){
            state.cart = state.cart.filter(i => i._id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        clearCart(state, action){
            state.cart = [];
        },
        increaseCart(state, action){
            let cartItem = state.cart.find(i => i._id === action.payload);
            cartItem.quantity += 1;
            cartItem.totalPrice = cartItem.price * cartItem.quantity;
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        decreaseCart(state, action){
            let cartItem = state.cart.find(i => i._id === action.payload);
            cartItem.quantity -= 1;
            cartItem.totalPrice = cartItem.price * cartItem.quantity;
            if(cartItem.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        resetCart(state){
            state.cart = []
        }
    }
})

export const getCart = state => state.cart.cart;
export const getTotalCartQuantity = state => state.cart.cart.reduce((count, i) => count + i.quantity, 0);
export const getTotalCartPrice = state => state.cart.cart.reduce((sum, i) => sum + i.totalPrice, 0);

export const {addItem, deleteItem, clearCart, increaseCart, decreaseCart, resetCart} = cartSlice.actions;

export default cartSlice.reducer;