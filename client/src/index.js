import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { createStore } from "redux";
import { DrawerReducer } from './reducers/loggedInuserdata';
import { Provider } from "react-redux";
const store = createStore(DrawerReducer);

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>

    </ChakraProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);


