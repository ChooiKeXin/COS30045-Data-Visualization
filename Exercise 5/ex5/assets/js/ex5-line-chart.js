// Exercise 5.2: Scatter Plot and Line Chart

d3.csv("assets/data/ARE Spot Prices.csv").then(data => {
    // Parse data types
    data.forEach(d => {
        d.year = +d["Year"];
        d.averagePrice = +d["Average Price (notTas-Snowy)"];
    });

    console.log("Loaded ARE Spot Prices data:", data);

    drawLineChart(data);
}).catch(error => {
    console.error("Error loading CSV data:", error);
});

const drawLineChart = data => {
    // Margins and Dimensions (matching Exercise 5.1)
    const margin = { top: 40, right: 30, bottom: 40, left: 50 };
    const width = 800;
    const height = 450;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create Scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice)])
        .range([innerHeight, 0]);

    // Setup Axes
    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d")); // Format ticks as integers

    const leftAxis = d3.axisLeft(yScale);

    // Append Axes to innerChart
    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    innerChart.append("g")
        .call(leftAxis);

    // Add Y-axis Label
    innerChart.append("text")
        .text("Average Price ($ per mWh)")
        .attr("x", -margin.left)
        .attr("y", -15)
        .attr("text-anchor", "start")
        .style("font-size", "14px")
        .style("font-family", "sans-serif");

    // Setup Line Generator
    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice));

    // Draw Line (Path)
    innerChart.append("path")
        .attr("d", lineGenerator(data))
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 1.2);

    // Draw Scatter Plot Points (Circles)
    innerChart.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.averagePrice))
        .attr("r", 4)
        .attr("fill", "green");
};
