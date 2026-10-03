// Exercise 4.3: Responsive SVG container setup (viewBox scales with the window)
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");

// Exercise 4.4 (Steps 1-2): Load the CSV and use a row conversion function
// so that each column is given the correct data type
d3.csv("./data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count // Convert the count string into a number
    };
}).then(data => {
    // Exercise 4.4: Log the loaded data array to the console
    console.log("Loaded Raw Data:", data);

    // Exercise 4.4 (Step 3): Inspect the data set using D3 statistical helpers
    console.log("Data Length:", data.length);
    console.log("Max Count:", d3.max(data, d => d.count));
    console.log("Min Count:", d3.min(data, d => d.count));
    console.log("Extent (Min & Max):", d3.extent(data, d => d.count));

    // Exercise 4.4: Sort brands from the highest to the lowest count
    data.sort((a, b) => b.count - a.count);
    console.log("Sorted Data (Descending):", data);

    // Exercise 4.4: Pass the prepared data on to the chart function (drawn in Exercise 4.5)
    drawBarChart(data);
}).catch(error => {
    console.error("Error loading CSV file. Check file path or Live Server status:", error);
});

// Exercise 4.4: Placeholder chart function, replaced by the real bar chart in Exercise 4.5
function drawBarChart(data) {
    console.log("drawBarChart function received data successfully! Ready for Exercise 4.5.");
}
