import React, { Component } from "react";
import "./App.css";

//import Heroes from "./components/Heroes";
import Controls from "./components/Controls";
import Status from "./components/Status";

class App extends Component {

    constructor(){
        super();
        this.state = {};
    }


  render() {
    return (
      <div>
        <h1>HomeWeb</h1>
        <div className="header-bar" />
      <Controls />
      <Status />
      </div>
    );
  }
}

export default App;
