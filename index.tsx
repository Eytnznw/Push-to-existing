
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("Starting application mounting...");

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical Error: #root not found.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Application mounted successfully.");
  } catch (error) {
    console.error("React Mounting Failed:", error);
    rootElement.innerHTML = `
      <div style="color: white; padding: 50px; text-align: center; font-family: sans-serif; direction: rtl; background: #030712; height: 100vh;">
        <h2 style="color: #ef4444; font-size: 24px;">חלה שגיאה בטעינת האתר</h2>
        <p style="margin-top: 20px;">אנא וודא שאתה משתמש בדפדפן מודרני ושכל הקבצים הועלו לשרת.</p>
        <p style="color: #6b7280; font-size: 12px; margin-top: 10px;">Error: ${error instanceof Error ? error.message : String(error)}</p>
      </div>
    `;
  }
}
