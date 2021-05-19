import { createSlice } from '@reduxjs/toolkit'

// const USER_LOGGED = "userLogged";

// const LoggedUser = configureStore("USER_LOGGED");

const initialState = {
  profile: {
    id: '',
    username: '',
    email: '',
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

// createStore(initialState,{

//  [LoggedUser.type] :(state,action)=>{
//     state.push({
//       id:action.payload.id,
//       profile: action.payload.user,
//       isLoggedIn: true, 
//     })
//   }
// })