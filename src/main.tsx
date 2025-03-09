import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/index.tsx';
import App from './App.tsx';
import "./assets/scss/app.scss";
import "./assets/css/tailwind.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate
      persistor={persistor}
    >
      {/* Designated area for adding sticky notes */}
      <div id="designated-click-area" className='wireframe-background' style={{ height: '100vh', width: '100vw', zIndex: 0, position: 'absolute' }}></div>
      <App />
    </PersistGate>
  </Provider>
);
