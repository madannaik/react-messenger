import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import {persistor, store} from "./store/configureStore";
// import { configureStore,combineReducers } from "@reduxjs/toolkit";
// import { reducers} from './store/login';
// import {currentChatReducer} from './store/currentchatuser'
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
// const combindedReducers  = combineReducers({
//         User : reducers,
//         Chat:currentChatReducer,
//
// })
// const store = configureStore({reducer:combindedReducers});

ReactDOM.render(
  <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
              <ChakraProvider>
                  <App />
              </ChakraProvider>

          </Provider>
      </PersistGate>
  </React.StrictMode>
  ,
  document.getElementById('root')
);


