import React, { Component } from "react";

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(){
    console.log(this.props.data1);
  }
  componentDidUpdate(){
    // total_bill vs tip
    console.log("ComponentDidUpdate", this.props.data1);
  }
  render() {
    return <svg className="child1_svg"></svg>;
  }
}

export default Child1;
