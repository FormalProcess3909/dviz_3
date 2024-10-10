import React, { Component } from "react";
import "./App.css";
import Child1 from "./components/Child1";
import Child2 from "./components/Child2";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(){
    console.log("Component has been mounted")
  }
  render() {
    return <div className="parent">
      <div className="child1"><Child1></Child1></div>
      <div className="child2"><Child2></Child2></div>
    </div>;
  }
}

export default App;
