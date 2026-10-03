// assets/js/ex6-interactions.js (home page copy of ex6.4/js/interactions.js)
// Exercise 6.2: Filters (below), Exercise 6.4: Tooltips (further below)

// Exercise 6.2: Build the filter buttons and react to clicks
const populateFilters = data => {
    // 1. Create one button per entry in filters_screen
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (e, d) => {
            console.log("Clicked filter:", d);

            // 2. Only react if the clicked filter is not already active
            if (!d.isActive) {
                // Mark the clicked filter as the only active one
                filters_screen.forEach(filter => {
                    filter.isActive = (filter.id === d.id);
                });

                // Update the "active" class on the buttons
                d3.selectAll("#filters_screen .filter")
                    .classed("active", filter => filter.id === d.id);

                // 3. Update the histogram for the selected filter
                updateHistogram(d.id, data);
            }
        });
};

// Exercise 6.2: Update the histogram bars with an animated transition
const updateHistogram = (filterId, data) => {
    // 1. Filter the data by screenTech (or keep everything for "all")
    const updatedData = filterId === "all"
        ? data
        : data.filter(tv => tv.screenTech === filterId);

    // 2. Generate new bins from the filtered data
    const updatedBins = binGenerator(updatedData);

    // 3. Animate the bars to their new heights
    d3.selectAll("#histogram rect")
        .data(updatedBins)
        .transition()
        .duration(500)
        .ease(d3.easeCubicInOut)
        .attr("y", d => yScale(d.length))
        .attr("height", d => innerHeight - yScale(d.length));
};

// Exercise 6.4: Create the tooltip elements inside the scatterplot's innerChartS
const createTooltip = () => {
    // Tooltip group, hidden at first (opacity set with .style to override other formatting)
    const tooltip = innerChartS
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Background rectangle (rounded corners, slightly transparent)
    tooltip
        .append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", barColor)
        .attr("fill-opacity", 0.75);

    // Tooltip text (placeholder until a circle is hovered)
    tooltip
        .append("text")
        .text("NA")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2 + 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .style("font-weight", 900);
};

// Exercise 6.4: Show and hide the tooltip when the mouse enters or leaves a circle
const handleMouseEvents = () => {
    innerChartS.selectAll("circle")
        .on("mouseenter", (e, d) => {
            console.log("Mouse entered circle", d);

            // Fill the tooltip text with the screen size
            d3.select(".tooltip text")
                .text(d.screenSize);

            // Read the circle centre from the hovered element
            const cx = e.target.getAttribute("cx");
            const cy = e.target.getAttribute("cy");

            // Move the tooltip above the circle and fade it in
            d3.select(".tooltip")
                .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
                .transition()
                .duration(200)
                .style("opacity", 1);
        })
        .on("mouseleave", (e, d) => {
            console.log("Mouse left circle", d);

            // Hide the tooltip and move it out of the way
            d3.select(".tooltip")
                .style("opacity", 0)
                .attr("transform", "translate(0, 500)");
        });
};
