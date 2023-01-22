import React from 'react';
// import ReactDOM from 'react-dom';
import {HashRouter} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './app/App';
import {Provider} from 'react-redux';
import {store} from './bll/store';
import ReactDOM from 'react-dom/client';

// ReactDOM.render(
//     <HashRouter>
//         <Provider store={store}>
//             <App/>
//         </Provider>
//     </HashRouter>,
//     document.getElementById('root')
// );

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <HashRouter>
        <Provider store={store}>
        <App />
        </Provider>
    </HashRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
