
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store,persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import axios from 'axios';

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}  >

    <PersistGate persistor={persistor}> 
    <App />
    </PersistGate>
 
  </Provider>,
)
