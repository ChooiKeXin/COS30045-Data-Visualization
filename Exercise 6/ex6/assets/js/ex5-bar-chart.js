// Exercise 5.1: Vertical Bar Chart with Axis

// Load and process dataset from CSV
d3.csv("assets/data/Data exercise 5.1.csv", d => {
    return {
        Screen_Tech: d.Screen_Tech.toUpperCase(), // Convert screen technology labels to uppercase (LCD, LED, OLED)
        Energy_Consumption: +d["Mean (Labelled energy consumption (kWh/year))"] || +d.Energy_Consumption
    };
}).then(data => {
    // Sort energy consumption in descending order (LED -> OLED -> LCD)
    data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);
    console.log("Loaded & Processed Data:", data);

    // Call function to draw vertical bar chart
    drawBarChart(data);
}).catch(error => {
    console.error("Error loading CSV file:", error);
});

// Function to construct and render the bar chart
const drawBarChart = data => {
    // 1. Set up inner chart margins and dimensions following D3 margin convention
    const margin = { top: 40, right: 30, bottom: 25, left: 40 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // 2. Append responsive SVG container with viewBox
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // 3. Create inner chart group (<g>) and shift it by top and left margins
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 4. Create scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([0, innerWidth])
        .padding(0.1);

    // Set Y-axis upper domain limit to 400 (leaves top padding so 369 kWh label doesn't collide with Y-title)
    const yScale = d3.scaleLinear()
        .domain([0, 400])
        .range([innerHeight, 0]);

    // 5. Define bottom and left axes generators
    const bottomAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const leftAxis = d3.axisLeft(yScale);

    // Render X-axis (translated to the bottom of innerChart)
    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis)
        .style("font-size", "12px");

    // Render Y-axis
    innerChart.append("g")
        .call(leftAxis)
        .style("font-size", "12px");

    // Add Y-axis title label positioned nicely above the Y axis
    innerChart.append("text")
        .text("Energy Consumption (kWh)")
        .attr("x", -margin.left)
        .attr("y", -15)
        .attr("text-anchor", "start")
        .style("font-size", "14px")
        .style("font-family", "sans-serif");

    // 6. Draw vertical bars
    innerChart.selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
        .attr("x", d => xScale(d.Screen_Tech))
        .attr("y", d => yScale(d.Energy_Consumption))
        .attr("fill", "green");

    // 7. Draw value text labels above each bar (e.g. 369 kWh)
    innerChart.selectAll(".bar-label")
        .data(data)
        .join("text")
        .attr("class", "bar-label")
        .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.Energy_Consumption) - 8)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-family", "sans-serif")
        .text(d => `${Math.round(d.Energy_Consumption)} kWh`);
};
