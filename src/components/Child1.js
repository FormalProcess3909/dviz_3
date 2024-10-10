import React, { Component } from "react";

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(){
    console.log("Component has been mounted")
  }
  render() {
    return <svg className="child1_svg"></svg>;
  }
}

export default Child1;
