import * as React from 'react';
import { Provider } from 'react-redux';
import store from "./store";
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './style/index.css';
// import 'typeface-roboto';

const root = <Provider store={store}>
<App/>
</Provider>

ReactDOM.render(
  root,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
