import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { routers } from "./routers/router";
import { routerString } from "./routers/routerString";
function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={routerString.Login} />} />
        {routers()}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
