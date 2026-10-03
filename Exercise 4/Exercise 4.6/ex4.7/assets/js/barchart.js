/* =========================================================
   Power Watch — barchart.js (Home page)
   D3 bar chart of TV counts per brand, built up over
   Exercises 4.2 - 4.7. Requires the D3 v7 library.
   ========================================================= */

(function initBrandBarChart() {
  // Exercise 4.2: Only run when the chart container exists on the page
  const container = d3.select("#brand-chart");
  if (container.empty()) return;

  // Exercise 4.3 & 4.6: Responsive SVG canvas with an adjusted viewBox
  // (the black border from the exercise is dropped here because the card already frames the chart)
  const svg = container
    .append("svg")
    .attr("viewBox", "0 0 600 520")
    .attr("role", "img")
    .attr("aria-label", "Horizontal bar chart of the number of television models per brand, sorted from highest to lowest");

  // Exercise 4.4: Load the CSV and convert each row to the correct data types
  d3.csv("assets/data/tvBrandCount.csv", d => {
    return {
      brand: d.brand,
      count: +d.count // Convert the count string into a number
    };
  }).then(data => {
    // Exercise 4.4: Sort brands from the highest to the lowest count
    data.sort((a, b) => b.count - a.count);

    // Exercise 4.5 - 4.7: Call the chart function with the imported data
    drawBarChart(data);
  }).catch(error => {
    // Exercise 4.4: Report loading problems (wrong path, or file opened without a server)
    console.error("Error loading CSV file. Check file path or Live Server status:", error);
    container.append("p")
      .attr("class", "d3-chart__note")
      .text("The chart could not be loaded. Please view this page through a web server.");
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

    // Exercise 4.7 (Step 2): One <g> group per brand keeps the bar and its labels together
    const barAndLabel = svg.selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    // Exercise 4.5 & 4.7 (Step 3): Bar rectangle inside each group
    barAndLabel.append("rect")
      .attr("class", d => `bar bar-${d.count}`)
      .attr("x", 100)                        // Exercise 4.7 (Step 1): 100px of room for brand labels
      .attr("y", 0)                          // y is relative to the group
      .attr("width", d => xScale(d.count))   // Exercise 4.6: width from the linear scale
      .attr("height", yScale.bandwidth())    // Exercise 4.6: thickness from the band scale
      .attr("fill", "blue");

    // Exercise 4.7 (Step 4): Brand name label, right-aligned against the bar
    barAndLabel.append("text")
      .text(d => d.brand)
      .attr("x", 90)
      .attr("y", yScale.bandwidth() / 2 + 4)
      .attr("text-anchor", "end")
      .style("font-size", "12px");

    // Exercise 4.7 (Step 5): Count label just after the end of each bar
    barAndLabel.append("text")
      .text(d => d.count)
      .attr("x", d => 100 + xScale(d.count) + 5)
      .attr("y", yScale.bandwidth() / 2 + 4)
      .style("font-size", "12px")
      .style("fill", "black");
  }
})();
