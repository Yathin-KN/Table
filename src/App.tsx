import Home from "./../components/Home";
import store from "./../store/index";
import { Provider } from "react-redux";
import Login from "../components/Login";
import Verify from "../components/Verify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
let persistor=persistStore(store);
function App() {
  return (
    <>
      <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/app" element={<Home />} />
            <Route path="/verify" element={<Verify/>} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
