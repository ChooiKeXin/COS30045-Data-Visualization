// assets/js/ex6-scatterplot.js (home page copy of ex6.4/js/scatterplot.js)
// Exercise 6.3: Scatterplot of energy consumption by star rating, coloured by screen type
const drawScatterplot = data => {
    // Create a responsive SVG using a viewBox
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // Inner chart group (innerChartS is declared in shared-constants.js)
    innerChartS = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // X scale: star rating from 0 to the maximum rating
    const maxStar = d3.max(data, d => d.star);
    xScales
        .domain([0, maxStar])
        .range([0, innerWidth])
        .nice();

    // Y scale: energy consumption from 0 to the maximum value
    const maxEnergy = d3.max(data, d => d.energyConsumption);
    yScales
        .domain([0, maxEnergy])
        .range([innerHeight, 0])
        .nice();

    // Colour scale: one colour per screen technology
    colorScale
        .domain(data.map(d => d.screenTech))
        .range(d3.schemeCategory10);

    // Draw one circle per TV model
    innerChartS.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScales(d.star))
        .attr("cy", d => yScales(d.energyConsumption))
        .attr("r", 4)
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.6);

    // Set up the axes
    const bottomAxis = d3.axisBottom(xScales);
    const leftAxis = d3.axisLeft(yScales);

    // Draw the x-axis
    innerChartS.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Draw the y-axis
    innerChartS.append("g")
        .call(leftAxis);

    // X-axis label
    innerChartS.append("text")
        .attr("class", "axis-label")
        .text("Star Rating")
        .attr("x", innerWidth)
        .attr("y", innerHeight + 40)
        .attr("text-anchor", "end");

    // Y-axis label
    innerChartS.append("text")
        .attr("class", "axis-label")
        .text("Labeled Energy Consumption (kWh/year)")
        .attr("x", -margin.left + 10)
        .attr("y", -15)
        .attr("text-anchor", "start");

    // Exercise 6.3: Colour legend for screen type
    const legend = svg.append("g")
        .attr("transform", `translate(${width - 100}, ${margin.top})`);

    colorScale.domain().forEach((screenTech, i) => {
        const legendRow = legend.append("g")
            .attr("transform", `translate(0, ${i * 25})`);

        // Colour swatch
        legendRow.append("rect")
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", colorScale(screenTech));

        // Label
        legendRow.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .attr("text-anchor", "start")
            .style("alignment-baseline", "middle")
            .style("font-size", "14px")
            .style("font-family", "'Roboto', sans-serif")
            .style("fill", "#5a3e2b")
            .text(screenTech);
    });
};
