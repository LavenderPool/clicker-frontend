import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {setupStore} from "./store/store";
const store = setupStore();
import {Provider} from "react-redux";
import './i18'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
)
