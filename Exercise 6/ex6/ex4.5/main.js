// Exercise 4.3: Responsive SVG container setup (viewBox scales with the window)
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");

// Exercise 4.4: Load the CSV and convert each row to the correct data types
d3.csv("./data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count // Convert the count string into a number
    };
}).then(data => {
    // Exercise 4.4: Log the data and summary statistics
    console.log("Loaded Raw Data:", data);
    console.log("Data Length:", data.length);
    console.log("Max Count:", d3.max(data, d => d.count));
    console.log("Min Count:", d3.min(data, d => d.count));
    console.log("Extent (Min & Max):", d3.extent(data, d => d.count));

    // Exercise 4.4: Sort brands from the highest to the lowest count
    data.sort((a, b) => b.count - a.count);
    console.log("Sorted Data (Descending):", data);

    // Exercise 4.5: Call the chart function with the imported data
    drawBarChart(data);
}).catch(error => {
    console.error("Error loading CSV file. Check file path or Live Server status:", error);
});

// Exercise 4.5: Bind the data to <rect> elements and draw the bars
function drawBarChart(data) {
    const barHeight = 20;  // Exercise 4.5 (Step 2): Thickness of each bar
    const spacing = 5;     // Exercise 4.5 (Step 3): Vertical gap between bars

    // Exercise 4.5 (Step 1): Bind the data array to a selection of rectangles
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        // Exercise 4.5: Class name linked to the count value, for easier styling later
        .attr("class", d => `bar bar-${d.count}`)

        // Exercise 4.5 (Step 2): Width comes from the data, height from barHeight, plus a fill colour
        .attr("width", d => d.count)
        .attr("height", barHeight)
        .attr("fill", "blue")

        // Exercise 4.5 (Step 3): Bars start at x = 0 and are spaced out down the y-axis by index
        .attr("x", 0)
        .attr("y", (d, i) => i * (barHeight + spacing));
}
