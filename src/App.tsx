/* eslint-disable @typescript-eslint/no-unused-vars */
import Home from "./../components/Home";
import store from "./../store/index";
import { Provider } from "react-redux";
import Login from "../components/Login";
// import Otp from "../components/Otp";
import Error from "../components/Error";
import Verify from "../components/Verify";
import Loading from "../components/Loading";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
const persistor = persistStore(store);
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/app" element={<Home />} />
              <Route path="/verify" element={<Verify />} />
              {/* <Route path="/loading" element={<Loading />} /> */}
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
