import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import {store} from "./store/configureStore";
import { Provider } from "react-redux";



ReactDOM.render(
  <React.StrictMode>
          <Provider store={store}>
              <ChakraProvider>
                  <App />
              </ChakraProvider>

          </Provider>

  </React.StrictMode>
  ,
  document.getElementById('root')
);


