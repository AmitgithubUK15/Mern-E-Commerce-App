import { createSlice  } from '@reduxjs/toolkit'

const initialState ={
    currentUser:null,
    error:null,
    loading:null,
    ProfileDetailsVisible:true,
    AppylyVendorvisible:false,
    addproduct:false,
    sellerproductlist:null,
    prodcutlistTab:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        Signstart:(state)=>{
            state.loading = true;
        },
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
            state.addproduct = false;
            state.prodcutlistTab = false;
        },
        setVendor:(state)=>{
            state.AppylyVendorvisible = true,
            state.ProfileDetailsVisible=false;
            state.addproduct = false;
            state.prodcutlistTab = false;
        },
        Addproduct:(state)=>{
            state.addproduct = true;
            state.AppylyVendorvisible = false,
            state.ProfileDetailsVisible=false;
            state.prodcutlistTab = false;
        },
        showproductlistTab:(state)=>{
            state.prodcutlistTab = true
            state.addproduct = false;
            state.AppylyVendorvisible = false,
            state.ProfileDetailsVisible=false;
        },
        keysuccess:(state)=>{
            state.loading=false;
        },
        keyfaile:(state)=>{
            state.loading = false;
        },
        productlistingStart:(state)=>{
            state.loading = true;
        },
        productlistingSuccess:(state)=>{
            state.loading =false;
            state.error = false;
        },
        productlistingFailure:(state)=>{
            state.loading =false;
            state.error = true;
        },
        productList:(state,action)=>{
            state.sellerproductlist = action.payload;
        }
    }
});

export const {
    Signstart,
    SignSuccess,
    SignFailure,
    userUpdateStart,
    userUpdateSuccess,
    userUpdateFailure,
    signoutUserSuccess,
    signoutUserFailure,
    setProfiledetail,
    setVendor,
    Addproduct,
    showproductlistTab,
    keysuccess,
    keyfaile,
    productlistingSuccess,
    productlistingStart,
    productlistingFailure,
    productList
} = userSlice.actions;
export default userSlice.reducer;
