import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import MainAppContainer from './components/MainAppContainer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

let store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <MainAppContainer />
  </Provider>,
  document.getElementById('root')
);
