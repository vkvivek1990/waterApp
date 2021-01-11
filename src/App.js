import React from "react";
import {  Route, Switch } from "react-router-dom";
import "./App.css";
import EMForm from "./pages/EMForm";
import EMGrid from "./pages/EMGrid";
import Header from "./component/header";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" component={EMForm} exact />
        <Route path="/about" component={EMGrid} />
      </Switch>
    </div>
  );
}

export default App;

// "Roboto Regular",Montserrat Regular,Helvetica Neue,Helvetica,Arial,sans-serif
