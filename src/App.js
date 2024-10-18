import React, { Component } from "react"; // Import React and Component from react library
import "./App.css"; // Import custom CSS style sheet
// Import components
import Child1 from "./components/Child1";
import Child2 from "./components/Child2";
import * as d3 from "d3"; // Import d3 library for data manipulation
import tips from "./data_sets/tips.csv"; // Import dataset

// Add comment and explain about class, extends, and how it relates to component
class App extends Component {
  constructor(props) {
    super(props); // Call constructor of the parent class which is Component
    this.state = { data: [] }; // Initialize state with empty array
    /*
    Initializing the state with an empty array serves a few important purposes:
    1.  Default State: It provides a default state for the component, ensuring that this.state.data is always defined. 
        This prevents potential errors when the component tries to access or manipulate data before it has been populated.
    2.  Data Loading: The component is designed to load data asynchronously (in this case, from a CSV file).
        By initializing data as an empty array, the component can render without data initially and then update once the data is loaded.
    3.  Reactivity: React components re-render when their state changes. By initializing the state, you set up the component to re-render and display the data once it becomes available.
    */
  }
  componentDidMount() {
    var self = this;
    console.log("Component has been mounted");
    d3.csv(tips, function (d) {
      return {
        tip: parseFloat(d.tip),
        total_bill: parseFloat(d.total_bill),
        day: d.day,
      };
    })
      .then(function (csv_data) {
        self.setState({ data: csv_data });
        //console.log(csv_data)
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="parent">
        <div className="child1">
          <Child1 data1={this.state.data}></Child1>
        </div>
        <div className="child2">
          <Child2 data2={this.state.data}></Child2>
        </div>
      </div>
    );
  }
}

export default App;
