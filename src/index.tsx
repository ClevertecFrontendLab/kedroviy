import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store, history } from '@redux/configure-store';
import { HistoryRouter as Router } from "redux-first-history/rr6";

import { routes } from './shared';
import "antd/dist/antd.css";
import './index.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                {routes}
            </Router>
        </Provider>
    </React.StrictMode>
);
