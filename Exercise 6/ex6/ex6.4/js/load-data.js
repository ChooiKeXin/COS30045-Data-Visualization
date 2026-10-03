// js/load-data.js
// Exercise 6.1: Load the CSV file with a row conversion function
d3.csv("data/W6_TVdata.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize, // Convert screenSize to a number
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption, // Convert energyConsumption to a number
    star: +d.star // Convert star rating to a number
})).then(data => {
    // Log the processed data to the console
    console.log("Loaded W6 TV Data:", data);

    // Exercise 6.1: Draw the histogram once the data has loaded
    drawHistogram(data);
    // Exercise 6.2: Build the filter buttons (they update the histogram)
    populateFilters(data);
    // Exercise 6.3: Draw the scatterplot with the same data
    drawScatterplot(data);
    // Exercise 6.4: Create the tooltip and attach the mouse events.
    // Called after the charts are drawn so the circles already exist.
    createTooltip();
    handleMouseEvents();
}).catch(error => {
    console.error("Error loading the CSV file:", error);
});
