import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  // Lifecycle methods and rendering logic

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // Called after component is first mounted
    this.renderChart(); // Initial chart rendering
  }

  componentDidUpdate() {
    // Called when component updates such as after new data is passed as props
    this.renderChart(); // Re-render chart if component updates
  }

  renderChart() {
    // Save data to variable
    const data = this.props.data1; // Data passed via props

    // Set the dimensions and margins of the graph
    const margin = { top: 10, right: 10, bottom: 50, left: 30 },
      w = 500 - margin.left - margin.right,
      h = 400 - margin.top - margin.bottom;


    // Selecting the child1_svg and set width and height
    var container = d3
      .select(".child1_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_1")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Clear any previous content
    container.selectAll("*").remove();


    d3.select(".child1_svg")
      .append("text") // Append a text element for the title
      .attr("class", "chart_title") // Add a class for styling
      .attr("x", w / 2 + margin.left) // Center the title horizontally
      .attr("y", margin.top + 10) // Position the title relative to the top margin
      .attr("text-anchor", "middle") // Center the text
      .style("font-size", "20px") // Set the font size
      .style("font-weight", "bold") // Make the title bold
      .text("Total Bill vs Tips"); // The actual title text

    // Add X axis
    var x_data = data.map(item => item.total_bill);
    const x_scale = d3
      .scaleLinear()
      .domain([0, d3.max(x_data)]) //can use d3.extent(), returns min/max of data
      .range([margin.left, w]);

    container
      .selectAll(".x_axis_g")
      .data([0])
      .join('g')
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));

    // X-axis label
    d3.select(".child1_svg")
      .selectAll(".my_title")
      .data([0]).join('text')
      .attr("class", ".my_title")
      .attr('x', w / 2 + margin.left - 5)
      .attr("y", h + margin.top + 40) // Adjusts position from bottom
      .text("Total Bill")

    // Add Y-axis
    var y_data = data.map(item => item.tip);
    const y_scale = d3
      .scaleLinear()
      .domain([0, d3.max(y_data)])
      .range([h, 0 + 30]);

    container
      .selectAll(".y_axis_g")
      .data([0])
      .join('g')
      .attr("class", "y_axis_g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y_scale));

    // Y-axis label
    d3.select(".child1_svg")
      .append("text")
      .attr("class", "y_label")
      .attr("x", -(h / 2) - margin.top)
      .attr("y", margin.left)
      .attr("transform", "rotate(-90)")
      .style("font-size", "20px")
      .text("Tips");

    container
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", function (d) {
        return x_scale(d.total_bill);
      })
      .attr("cy", function (d) {
        return y_scale(d.tip);
      })
      .attr("r", 3)
      .style("fill", "#69b3a2");

  }
  render() {
    return (
      <svg className="child1_svg">
        <g className="g_1"></g>
      </svg>
    );
  }
}

export default Child1;
