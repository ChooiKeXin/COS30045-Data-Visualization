// Exercise 4.2: Manipulate and add elements to a webpage with D3

// Exercise 4.2 (Step 2): Select an existing HTML element (h1) and change its style
d3.select("h1")
  .style("color", "green");

// Exercise 4.2 (Step 3): Select the container div and append a new <p> element with text
d3.select(".container")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!");

// Exercise 4.2 (Step 4): Append a <rect> into the existing <svg> and give it visible attributes
d3.select("svg")
  .append("rect")
  .attr("x", 50)          // Left edge of the rectangle
  .attr("y", 50)          // Top edge of the rectangle
  .attr("width", 100)     // Rectangle width in SVG units
  .attr("height", 30)     // Rectangle height in SVG units
  .style("fill", "green");
