// js/interactions.js
// Exercise 6.2: Filters

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
