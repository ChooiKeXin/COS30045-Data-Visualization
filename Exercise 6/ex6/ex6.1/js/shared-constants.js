// js/shared-constants.js
// Constants shared by every chart and interaction on the page.
// Exercise 6.1 (histogram), 6.2 (filters), 6.3 (scatterplot) and 6.4 (tooltips) all read from this file.

// ---- Exercise 6.1: Chart dimensions and margins ----
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;  // Total width of the chart
const height = 400; // Total height of the chart
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// ---- Exercise 6.1: Colours used by the histogram (also reused by the 6.4 tooltip) ----
const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

// ---- Exercise 6.1: Histogram scales (domains and ranges are set in histogram.js) ----
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// ---- Exercise 6.1: Bin generator (kept here so Exercise 6.2 can reuse it when a filter changes) ----
const binGenerator = d3.bin()
    .value(d => d.energyConsumption); // Accessor for energyConsumption
