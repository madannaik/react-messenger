import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  profile: {
    id: '',
    username: '',
    email: '',
    image:''
  },
  isLoggedIn: false
}

const slice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    "userLogged": (state, action) => {

      return {
        ...state,
        profile: {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          image:action.payload.image
        },
        isLoggedIn: true,
      }
    },
    "userLoggedOut":(state,action)=>{
      return {
        ...state,
        profile:{},
        isLoggedIn:false
      }
    }
  }
})


export const { userLogged ,userLoggedOut} = slice.actions;
export const reducers = slice.reducer;

