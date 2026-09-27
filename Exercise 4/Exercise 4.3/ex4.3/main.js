// Exercise 4.3: D3 Set Up

// Step 2: 使用 D3 选择响应式容器，追加带有 viewBox 的 SVG 画板并设置黑框
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");

// Step 3: 添加一个测试用的蓝色矩形（验证画布与坐标系是否工作）
svg.append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");