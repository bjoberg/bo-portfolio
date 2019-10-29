import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
