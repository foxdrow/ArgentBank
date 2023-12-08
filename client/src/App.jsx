import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import "./styles/styles.scss";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
