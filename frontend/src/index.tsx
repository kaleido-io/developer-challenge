import Amplify from "aws-amplify";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import awsExports from "./aws-exports";
import './index.css';
import { fetchUser } from "./state/action-creators";
import { store } from './state/index';
Amplify.configure(awsExports);

/**
 * Get user information before app loads
 */
store.dispatch(fetchUser('38679115-7c2f-487c-aae9-2a1614b85938'))

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
