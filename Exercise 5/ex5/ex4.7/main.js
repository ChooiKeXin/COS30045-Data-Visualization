// Exercise 4.3 & 4.6: Responsive SVG container setup with adjusted viewBox
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

    // Exercise 4.5 - 4.7: Call the chart function with the imported data
    drawBarChart(data);
}).catch(error => {
    console.error("Error loading CSV file. Check file path or Live Server status:", error);
});

// Exercise 4.7: Draw the bar chart with grouped bars and labels
function drawBarChart(data) {
    // Exercise 4.6 (Step 1): Linear scale for bar width (TV count)
    const xScale = d3.scaleLinear()
        .domain([0, 1200])
        .range([0, 400]);

    // Exercise 4.6 (Step 2): Band scale for bar position and thickness (brand)
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 500])
        .paddingInner(0.2);

    // Exercise 4.7 (Step 2): One <g> group per brand keeps each bar and its labels together,
    // and the group is moved down the chart using the band scale
    const barAndLabel = svg.selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    // Exercise 4.7 (Step 3): Add the bar rectangle inside each group
    barAndLabel.append("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("x", 100)                          // Exercise 4.7 (Step 1): Leave 100px on the left for brand labels
        .attr("y", 0)                            // y is relative to the group, so it starts at 0
        .attr("width", d => xScale(d.count))     // Exercise 4.6: width from the linear scale
        .attr("height", yScale.bandwidth())      // Exercise 4.6: thickness from the band scale
        .attr("fill", "blue");

    // Exercise 4.7 (Step 4): Brand name label, right-aligned against the left edge of the bar
    barAndLabel.append("text")
        .text(d => d.brand)
        .attr("x", 90)
        .attr("y", yScale.bandwidth() / 2 + 4)   // Vertically centred on the bar
        .attr("text-anchor", "end")              // Text ends at x, giving a right-justified look
        .style("font-size", "12px");

    // Exercise 4.7 (Step 5): Count label placed just after the end of each bar
    barAndLabel.append("text")
        .text(d => d.count)
        .attr("x", d => 100 + xScale(d.count) + 5)
        .attr("y", yScale.bandwidth() / 2 + 4)
        .style("font-size", "12px")
        .style("fill", "black");
}
