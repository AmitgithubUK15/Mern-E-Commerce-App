import { createSlice  } from '@reduxjs/toolkit'

const initialState ={
    currentUser:null,
    error:null,
    loading:false,
    sidenav:null,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        SignSuccess: (state,action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        SignFailure:(state)=>{
            state.error = true;
            state.loading=false;
        },
        userUpdateStart:(state)=>{
            state.loading =true;
        },
        userUpdateSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.error = false;
            state.loading=false;
        },
        userUpdateFailure:(state)=>{
            state.error = true;
            state.loading=false;
        }
        
    }
});

export const {SignSuccess,SignFailure,userUpdateStart,userUpdateSuccess,userUpdateFailure} = userSlice.actions;
export default userSlice.reducer;
