import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import App from './App'
import './index.css'
import store from './redux/store';

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate persistor={persistor}>
    <App />
      </PersistGate>
  </React.StrictMode>
  </Provider>
)
