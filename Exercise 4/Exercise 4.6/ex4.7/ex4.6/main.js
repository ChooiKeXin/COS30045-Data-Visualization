// Exercise 4.3 & 4.6: Responsive SVG container setup with adjusted viewBox
// (Exercise 4.6 makes the canvas smaller than the raw data so scales are needed)
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 600 600")
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

    // Exercise 4.5 & 4.6: Call the chart function with the imported data
    drawBarChart(data);
}).catch(error => {
    console.error("Error loading CSV file. Check file path or Live Server status:", error);
});

// Exercise 4.5 & 4.6: Bind data and draw the bar chart using D3 scales
function drawBarChart(data) {
    // Exercise 4.6 (Step 1): Linear scale for the quantitative data (TV count -> bar width)
    const xScale = d3.scaleLinear()
        .domain([0, 1200]) // Input: from 0 up to a value above the largest count
        .range([0, 400]);  // Output: pixels, leaving room for labels on the canvas

    // Exercise 4.6 (Step 2): Band scale for the categorical data (brand -> bar position and thickness)
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand)) // One band per brand
        .range([0, 500])                // Total height available for the bars
        .paddingInner(0.2);             // Automatic gap between bars

    // Exercise 4.5: Bind the data to <rect> elements
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`)

        // Exercise 4.6: Bar width is calculated by the linear scale
        .attr("width", d => xScale(d.count))

        // Exercise 4.6: Bar thickness is calculated by the band scale
        .attr("height", yScale.bandwidth())

        .attr("fill", "blue")
        .attr("x", 0)

        // Exercise 4.6: Vertical position of each bar is looked up by brand name
        .attr("y", d => yScale(d.brand));
}
