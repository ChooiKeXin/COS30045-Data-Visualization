// Exercise 4.3: D3 Set Up

// Exercise 4.3 (Step 2): Create a responsive SVG canvas inside the container div.
// The viewBox keeps the drawing scaled correctly on any screen size;
// the black border is only there to show the canvas boundaries while developing.
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");

// Exercise 4.3 (Step 3): Add a hard-coded test rectangle to confirm the canvas and coordinates work
svg.append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");
