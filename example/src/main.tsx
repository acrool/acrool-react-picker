import './index.css';
import '@acrool/react-picker/dist/index.css';
import '@acrool/react-modal/dist/index.css';
import '@acrool/react-grid/dist/index.css';
import '@acrool/react-dropdown/dist/index.css';
import '@acrool/react-skeleton/dist/index.css';
import '@acrool/react-datepicker/dist/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
        <App />
    // </React.StrictMode>,
);
