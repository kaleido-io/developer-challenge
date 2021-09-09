import Amplify from "aws-amplify";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import awsExports from "./aws-exports";
import './index.css';
import { store } from './state/index';
Amplify.configure(awsExports);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
