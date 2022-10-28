import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import combineReducer from "./redux/reducers/combineReducer";
import { composeWithDevTools } from "redux-devtools-extension"
import { Provider } from "react-redux";

const store = createStore(
  combineReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

ReactDOM.hydrate(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);