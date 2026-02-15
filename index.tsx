
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("App initialization started...");

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical Error: #root element not found in HTML.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React render call successful.");
  } catch (error) {
    console.error("Failed to render React app:", error);
    rootElement.innerHTML = `
      <div style="color: white; padding: 50px; text-align: center; font-family: sans-serif; direction: rtl;">
        <h2 style="color: #ef4444;">אופס, משהו השתבש בטעינת האפליקציה.</h2>
        <p>שגיאה טכנית: ${error instanceof Error ? error.message : String(error)}</p>
        <p style="color: #9ca3af; margin-top: 20px;">נסה לרענן את הדף או לבדוק את ה-Console בדפדפן.</p>
      </div>
    `;
  }
}
