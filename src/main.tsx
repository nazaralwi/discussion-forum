import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
// import store from './states/index.ts'

createRoot(document.getElementById('root')!).render(
  // <Provider store={store}>
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
  // </Provider>,
)
