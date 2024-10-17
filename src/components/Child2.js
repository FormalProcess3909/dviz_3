import React, { Component } from "react";
import * as d3 from "d3";

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  renderChart() {
    // Save data to variable
    const data = this.props.data2; // Data passed via props

    const rolledData = d3.flatRollup(
      data,
      v => d3.mean(v, d => d.tip),
      d => d.day
    );

    // Set the dimensions and margins of the graph
    const margin = { top: 10, right: 10, bottom: 50, left: 30 },
      w = 500 - margin.left - margin.right,
      h = 400 - margin.top - margin.bottom;

    // Selecting the child2_svg and set width and height
    var container = d3
      .select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_2")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Clear any previous content
    container.selectAll("*").remove();

    // Graph title
    d3.select(".child2_svg")
      .append("text")
      .attr("class", "chart_title")
      .attr("x", w / 2 + margin.left) // Center the title horizontally
      .attr("y", margin.top + 10) // Position the title relative to the top margin
      .attr("text-anchor", "middle") // Center the text
      .style("font-size", "20px") // Set the font size
      .text("Average Tip by Day"); // The actual title text

    // X scale
    const x_scale = d3
      .scaleBand()
      .domain(rolledData.map(d => d[0]))
      .range([margin.left, w])
      .padding(0.2);

    // Add X axis
    container
      .append("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(x_scale));

    // Add X-axis label
    d3.select(".child2_svg")
    .selectAll(".my_title")
    .data([0]).join('text')
    .attr("class",".my_title")
    .attr('x', (w + margin.left + margin.right) / 2)
    .attr('y', h+ margin.top + 40)
    .text("Day")

    // Y scale
    const y_scale = d3
      .scaleLinear()
      .domain([0, d3.max(rolledData, d => d[1])])
      .range([h, 0 + 40])

    // Y-axis
    container
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y_scale))

    // Y-axis label
    d3.select(".child2_svg")
    .append("text")
    .attr("class", "y_label")
    .attr("x", -(h / 2) - 47)
    .attr("y", margin.left)
    .attr("transform", "rotate(-90)")
    .style("font-size", "20px")
    .text("Average Tip")

    container
    .selectAll("mybar")
    .data(rolledData)
    .enter()
    .append("rect")
    .attr("x", d => x_scale(d[0]))
    .attr("y", d => y_scale(d[1]))
    .attr("width", x_scale.bandwidth()) // Set the width of each bar
    .attr("height", d => h - y_scale(d[1])) // Height of the bar
    .style("fill", "#69b3a2");
  }

  render() {
    return <svg className="child2_svg">
      <g className="g_2"></g>
    </svg>;
  }
}

export default Child2;
