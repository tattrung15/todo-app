import "./App.scss";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { guardRoutes } from "./helpers/components.helper";
import { Roles } from "./constants/common";
import { routes } from "./app.routes";

function App() {
  return (
    <div>
      <Router>
        <div className="App">
          <Routes>
            {guardRoutes(routes, Roles.USER, {
              roles: [Roles.USER],
              redirect: "/sign-in",
            })}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
