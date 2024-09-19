import {createSlice} from '@reduxjs/toolkit';

export const questionReducer = createSlice({
    name: 'questions',
    initialState: {
        quest: [],
        answers: [],
        count: 0,
    },
    reducers: {
        addExamAction:(state, action)=>{
            let {question,answers} = action.payload;
            return {
                ...state,
                quest: question,
                answers
            }
        },
        moveNextAction:(state)=>{
            return {
                ...state,
                count: state.count + 1,
            }
        },
        movePrevAction:(state)=>{
            return{
                ...state,
                count: state.count - 1,
            }
        },
        resetAction:()=>{
            return {
                quest: [],
                answers: [],
                count: 0,
            }
            
        }
    }
});

export const {addExamAction, moveNextAction,movePrevAction,resetAction} = questionReducer.actions;

export default questionReducer.reducer;