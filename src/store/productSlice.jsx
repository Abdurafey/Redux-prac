import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const STATUSES =  Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
})

const productSlice = createSlice({
    name: "cart",
    initialState: {
        data: [],
        status: STATUSES.IDLE
    },
    reducers: {
//  will comment below code and try alternative method for redux thunk using extrareducer
        // setProducts(state,action) {
        //     state.data = action.payload;
        //     // state.push(action.payload)
        //     // console.log(action.payload);
        // },
        // setStatus(state, action){
        //     state.status = action.payload;
        // }

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        // removeCart(state,action) {
        //     // console.log("hi" + action.payload);
        //     // state.pop(action.payload))
        //     // state.splice(action.payload,2)
        //     return state.filter((item)=>item.id !== action.payload)
        // },
        // deleteUsers(state,action) {
        //     return [];
        //     // console.log("hi hello");
        // },

        // using create Action function
    },
    extraReducers(builder){
        builder
            .addCase(fetchProducts.pending, (state,action) =>{
                state.status = STATUSES.LOADING
            })
            .addCase(fetchProducts.fulfilled, (state,action) =>{
                state.data = action.payload;
                state.status = STATUSES.IDLE
            })
            .addCase(fetchProducts.rejected, (state,action) =>{
                state.status = STATUSES.ERROR
            })
   
},  
       
    // },
});

/* 
IF ACTION IS SUPPOSED TO BE HANDLED BY ONE REDUCER, USE REDUCERS.
IF ACTION IS SUPPOSED TO BE HANDLED BY MULTIPLE REDUCERS, USE EXTRA REDUCERS
*/ 

export const {setProducts, setStatus} = productSlice.actions;
export default productSlice.reducer; 



/**THUNK REDUX */
// another method 
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
})


// export function fetchProducts(){

//     return async function fetchProductsThunk(dispatch, getState){
//         //below by updating the status which was idle will update to LOading 
//         dispatch(setStatus(STATUSES.LOADING))
//         // const prop = getState().(property)
//         try{
//             const res = await fetch('https://fakestoreapi.com/products');
//             const data = await res.json();
//             dispatch(setProducts(data))
//             dispatch(setStatus(STATUSES.IDLE))

//         }
//         catch(err){
//             console.log(err);
//             dispatch(setStatus(STATUSES.ERROR))


//         }

//     } 
// }