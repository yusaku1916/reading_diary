import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App'

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.querySelector('#root');
  const root = createRoot(rootElement);
  
  root.render(
    <>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </>
  );
});
//   ReactDOM.render(
//     <BrowserRouter>
//       <App/>
//     </BrowserRouter>,
//     document.querySelector('#root'),
//   );
// });