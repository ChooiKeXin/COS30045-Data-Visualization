// Exercise 4.3: Responsive SVG container setup
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");

// Exercise 4.4: Load and process data from CSV
d3.csv("./data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count // Convert count string to number type
    };
}).then(data => {
    // 1. Log the loaded raw data array
    console.log("Loaded Raw Data:", data);

    // 2. Output data length and statistics using D3 statistical functions
    console.log("Data Length:", data.length);
    console.log("Max Count:", d3.max(data, d => d.count));
    console.log("Min Count:", d3.min(data, d => d.count));
    console.log("Extent (Min & Max):", d3.extent(data, d => d.count));

    // 3. Sort the data array in descending order based on count
    data.sort((a, b) => b.count - a.count);
    console.log("Sorted Data (Descending):", data);

    // 4. Call drawBarChart function to render bars for Exercise 4.5
    drawBarChart(data);
}).catch(error => {
    console.error("Error loading CSV file. Check file path or Live Server status:", error);
});

// Exercise 4.5: Bind data and draw bar chart
function drawBarChart(data) {
    const barHeight = 20;  // Height of each individual bar
    const spacing = 5;     // Vertical gap between bars

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        // Step 1: Assign class attribute associated with count value
        .attr("class", d => `bar bar-${d.count}`)
        
        // Step 2: Set rectangle width based on count data and height based on barHeight
        .attr("width", d => d.count)
        .attr("height", barHeight)
        .attr("fill", "blue")
        
        // Step 3: Set x and y coordinates to space out the bars vertically
        .attr("x", 0)
        .attr("y", (d, i) => i * (barHeight + spacing));
}