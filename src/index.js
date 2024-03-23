import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Amplify from 'aws-amplify';
// import "@aws-amplify/ui-react/styles.css";
// import { IntlProvider, FormattedNumber, FormattedMessage } from 'react-intl';
// import ja from './store/dictionary/ja';
// import en from './store/dictionary/en';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';




// import {AmplifyProvider} from "@aws-amplify/ui-react";
// import awsconfig from './aws-exports';
// Amplify.configure(awsconfig);
if (process.env.REACT_APP_ENVIRONMENT === 'cardel-product' || process.env.REACT_APP_ENVIRONMENT === 'adad-product') {
    console.log = () => { }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        // <IntlProvider messages={en} locale="ja" defaultLocale="ja">
            <RecoilRoot>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </RecoilRoot>
        // </IntlProvider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();