import { createSlice } from '@reduxjs/toolkit'


const key = JSON.parse(localStorage.getItem("item"));

const initialState = {
  profile: {
    id: key?.id,
    username: key?.username,
    email: key?.email,
    image: key?.image,
  },
  isLoggedIn: key===null?false:true
}

const slice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    "userLogged": (state, action) => {
      localStorage.setItem("item", JSON.stringify(action.payload));
      return {
        ...state,
        profile: {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          image: action.payload.image
        },
        isLoggedIn: true,
      }
    },
    "userLoggedOut": (state, action) => {
      return {
        ...state,
        profile: {},
        isLoggedIn: false
      }
    }
  }
})


export const { userLogged, userLoggedOut } = slice.actions;
export const reducers = slice.reducer;

