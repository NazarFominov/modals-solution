import React, { Suspense } from 'react';

import ReactDOM from 'react-dom/client';
import { App } from 'app/ui';
import './index.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <Suspense>
        <App />
    </Suspense>,
);
