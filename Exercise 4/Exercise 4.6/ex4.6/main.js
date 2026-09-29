// Exercise 4.3 & 4.6: Responsive SVG container setup with adjusted viewBox
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 600 600")
    .style("border", "1px solid black");

// Exercise 4.4: Load and process data from CSV
d3.csv("./data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count // Convert string count to numeric value
    };
}).then(data => {
    // Log loaded and processed data
    console.log("Loaded Raw Data:", data);
    console.log("Data Length:", data.length);
    console.log("Max Count:", d3.max(data, d => d.count));
    console.log("Min Count:", d3.min(data, d => d.count));
    console.log("Extent (Min & Max):", d3.extent(data, d => d.count));

    // Sort data in descending order based on count
    data.sort((a, b) => b.count - a.count);
    console.log("Sorted Data (Descending):", data);

    // Call drawBarChart function for Exercise 4.6
    drawBarChart(data);
}).catch(error => {
    console.error("Error loading CSV file. Check file path or Live Server status:", error);
});

// Exercise 4.5 & 4.6: Bind data and draw bar chart with D3 Scales
function drawBarChart(data) {
    // 1. Step 1: Linear Scale for X-axis (Quantitative data: count)
    const xScale = d3.scaleLinear()
        .domain([0, 1200]) // Input domain includes max count value with padding
        .range([0, 400]);  // Output range in SVG pixels (leaving space for labels)

    // 2. Step 3: Band Scale for Y-axis (Categorical data: brand)
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand)) // Array of brand names
        .range([0, 500])               // Total height reserved for bars
        .paddingInner(0.2);            // Automatic spacing/gap between bars

    // 3. Step 2 & 3: Bind data and update rect attributes using Scales
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        
        // Use xScale to calculate width
        .attr("width", d => xScale(d.count))
        
        // Use yScale.bandwidth() to automatically determine bar thickness
        .attr("height", yScale.bandwidth())
        
        .attr("fill", "blue")
        
        .attr("x", 0)
        
        // Use yScale(d.brand) to position bars along the vertical axis
        .attr("y", d => yScale(d.brand));
}