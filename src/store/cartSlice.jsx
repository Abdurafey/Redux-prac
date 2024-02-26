import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addCart(state,action) {
            state.push(action.payload)
            // console.log(action.payload);
        },
        removeCart(state,action) {
            // console.log("hi" + action.payload);
            // state.pop(action.payload))
            // state.splice(action.payload,2)
            return state.filter((item)=>item.id !== action.payload)
        },
        // deleteUsers(state,action) {
        //     return [];
        //     // console.log("hi hello");
        // },

        // using create Action function
    },
    //     extraReducers(builder){
    //         builder.addCase(deleteUsers, () =>{
    //             return []; 
    //         })
       
    // },
});

/* 
IF ACTION IS SUPPOSED TO BE HANDLED BY ONE REDUCER, USE REDUCERS.
IF ACTION IS SUPPOSED TO BE HANDLED BY MULTIPLE REDUCERS, USE EXTRA REDUCERS
*/ 

export const {addCart, removeCart} = cartSlice.actions;
export default cartSlice.reducer; 