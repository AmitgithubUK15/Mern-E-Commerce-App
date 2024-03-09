import { createSlice  } from '@reduxjs/toolkit'

const initialState ={
    currentUser:null,
    error:null,
    loading:false,
    ProfileDetailsVisible:true,
    AppylyVendorvisible:false,
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
        SignFailure:(state,action)=>{
            state.error = action.payload;
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
        },
        signoutUserSuccess:(state)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signoutUserFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        setProfiledetail:(state)=>{
            state.ProfileDetailsVisible=true;
            state.AppylyVendorvisible= false;
        },
        setVendor:(state)=>{
            state.AppylyVendorvisible = true,
            state.ProfileDetailsVisible=false;
        },
        keysuccess:(state)=>{
            state.loading=false;
        },
        keyfaile:(state)=>{
            state.loading = false;
        }
    }
});

export const {
    SignSuccess,
    SignFailure,
    userUpdateStart,
    userUpdateSuccess,
    userUpdateFailure,
    signoutUserSuccess,
    signoutUserFailure,
    setProfiledetail,
    setVendor,
    keysuccess,
    keyfaile
} = userSlice.actions;
export default userSlice.reducer;
