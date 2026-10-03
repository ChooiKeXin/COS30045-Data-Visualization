// Exercise 5.3: Donut Chart

d3.csv("assets/data/Data exercise 5.3.csv").then(data => {
    // Convert Count to numeric type
    data.forEach(d => {
        d.Count = +d.Count;
    });

    console.log("Loaded Donut Chart Data:", data);

    drawDonutChart(data);
}).catch(error => {
    console.error("Error loading CSV file:", error);
});

const drawDonutChart = data => {
    // Set up chart dimensions
    const width = 1000;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 20; // Leave padding

    // Create SVG container
    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // Center innerChart (<g>) inside SVG
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create color scale (d3.scaleOrdinal with d3.schemeSet2)
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.Screensize_Category))
        .range(d3.schemeSet2);

    // Calculate angles for each slice using d3.pie()
    const pie = d3.pie()
        .value(d => d.Count)
        .sort(null); // Disable sorting to maintain original data order

    // Set up arc generator with inner and outer radius
    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6)  // Inner radius = 60% of available radius (donut hole)
        .outerRadius(radius * 1.0); // Outer radius = 100% of available radius

    // Bind data and draw paths (donut slices)
    innerChart
        .selectAll("path")
        .data(pie(data))
        .join("path")
        .attr("d", arcGenerator)
        .attr("fill", d => color(d.data.Screensize_Category)) // Color by category
        .attr("stroke", "white")
        .attr("stroke-width", 2);

    // Add labels positioned at the centroid of each slice
    innerChart
        .selectAll("text")
        .data(pie(data))
        .join("text")
        .text(d => d.data.Screensize_Category)
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-family", "sans-serif")
        .style("fill", "black");
};
