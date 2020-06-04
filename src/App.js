import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//import { Counter } from './features/counter/Counter';
import Home from "./features/home/Home";
import Hash from "./features/hash/Hash";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div>
        <Route exact path={"/"} component={Home} />
        <Route path={"/hash"} component={Hash} />
      </div>
    </Router>
  );
}

export default App;
