
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Critical Render Error:", error);
    rootElement.innerHTML = `<div style="color:white;text-align:center;padding:50px;font-family:sans-serif;direction:rtl;"><h2>שגיאה בטעינת האפליקציה</h2><p>${error}</p></div>`;
  }
}
