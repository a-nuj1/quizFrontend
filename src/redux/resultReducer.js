import { createSlice } from "@reduxjs/toolkit"



export const resultReducer = createSlice({
    name: 'result',
    initialState: {
        userId: null,
        result: []
    },
    reducers: {
        setUserId:(state, action)=>{
            state.userId = action.payload;
        },
        pushResultAction:(state, action)=>{
            state.result.push(action.payload);
        },
        resetResultAction:()=>{
            return{
                userId: null,
                result: []
            }
        },
        updateRes:(state, action)=>{
            const {count, checked} = action.payload; 
            state.result[count] = checked;
        }
    }
})


export const {setUserId,pushResultAction,resetResultAction, updateRes} = resultReducer.actions;

export default resultReducer.reducer;