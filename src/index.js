import './index.css'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, compose, combineReducers } from 'redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
  optionsReducer,
  canvasReducer,
} from './store'

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  options: optionsReducer,
  canvas: canvasReducer,
})

export const store = createStore(
  rootReducer,
  composeEnhancers()
);

const paintApp = (
  <Provider store={store}>
    <App />
  </Provider>
)

render(paintApp, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
