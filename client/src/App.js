import "./App.css";
import "./components/style.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Main from "./components/Main";
import MyDocs from "./components/MyDocs";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/create/:file">
            <Main />
          </Route>
          <Route path="/create">
            <Main newFile={true} />
          </Route>
          <Route path="/my-docs">
            <MyDocs />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
