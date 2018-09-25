import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import {Provider} from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import store from './store';

const root = <Provider store={store}>
  <App />
</Provider>

ReactDOM.render(
  root,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
