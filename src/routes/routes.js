import React from "react";
import Home from "../components/HomeContents/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function Routes(props) {
  return (
    <Router>
      <Route path="/" exact component={Home} />
    </Router>
  );
}
