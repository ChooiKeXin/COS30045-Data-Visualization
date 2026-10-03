// js/histogram.js
// Exercise 6.1: Histogram of labelled energy consumption (kWh/year)
const drawHistogram = data => {
    // Create a responsive SVG using a viewBox
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // Create the inner chart group and shift it by the margins
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Group the data into bins with the shared bin generator
    const bins = binGenerator(data);

    // Lower bound of the first bin and upper bound of the last bin (x domain)
    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;
    // Length of the biggest bin (y domain)
    const binsMaxLength = d3.max(bins, d => d.length);

    // Set the domains and ranges of the shared scales
    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice(); // Round the y-axis to clean values

    // Draw one bar per bin
    innerChart.selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor) // Creates the gap between bars
        .attr("stroke-width", 2);

    // Set up the axes
    const bottomAxis = d3.axisBottom(xScale);
    const leftAxis = d3.axisLeft(yScale);

    // Draw the x-axis
    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Draw the y-axis
    innerChart.append("g")
        .call(leftAxis);

    // X-axis label
    innerChart.append("text")
        .attr("class", "axis-label")
        .text("Labeled Energy Consumption (kWh/year)")
        .attr("x", innerWidth)
        .attr("y", innerHeight + 40)
        .attr("text-anchor", "end");

    // Y-axis label
    innerChart.append("text")
        .attr("class", "axis-label")
        .text("Frequency")
        .attr("x", -margin.left + 10)
        .attr("y", -15)
        .attr("text-anchor", "start");
};
