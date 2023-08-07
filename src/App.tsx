import Home from './../components/Home'
import store from './../store/index';
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
         <Home/>
      </Provider>
    </>
  );
}

export default App;
