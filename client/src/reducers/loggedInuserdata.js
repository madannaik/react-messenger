// const initialState = {
//     profile: {
//       username: '',
//       email: '',
//     },
//     isLoggedIn: false
//   }
//   const reducer = (state = initialState, action) => {
//       switch (action.type) {
//         case "LOGIN":
//             console.log('login', action.payload.user)
//               return {
//                 ...state,
//                 profile: action.payload.user,
//                 isLoggedIn: false 
//               }
  
//       }
//     }

export const DrawerReducer = (state = false,action)=>{
  switch (action.type) {
    case "SWITCH_DRAWER":
      return !state;
      default :
      return state;
  }
      
};
