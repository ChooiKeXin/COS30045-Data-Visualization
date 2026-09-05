/* =========================================================
   Power Watch — story.js
   Renders the four charts on story.html using Chart.js
   (loaded from CDN in story.html) and the pre-computed
   dataset in assets/js/story-data.js (window.STORY_DATA).

   The numbers in STORY_DATA were derived from
   assets/data/tv_2026_02_15.csv, filtered to TVs currently
   "Available" and sold in Australia, following the same
   steps used in the Exercise 2 KNIME workflow (Data
   Question 2): convert screensize cm -> inch, then group by
   exact size and by small/medium/large category.

   Only runs on pages that contain the relevant canvases, so
   it has no effect on index.html / televisions.html / about.html.
   ========================================================= */

(function () {
  if (typeof window.STORY_DATA === "undefined" || typeof Chart === "undefined") {
    // Fail visibly rather than leaving silent blank boxes, so any
    // future loading problem is obvious instead of looking like a
    // missing/broken chart.
    document.querySelectorAll(".chart-card__canvas-wrap").forEach((wrap) => {
      wrap.innerHTML =
        '<p style="padding:16px;color:#B3341C;font-family:\'IBM Plex Mono\',monospace;font-size:0.85rem;">' +
        "Chart could not load (missing chart.js or story-data.js). " +
        "Check the browser console and that assets/js/vendor/chart.umd.js loaded correctly." +
        "</p>";
    });
    return;
  }

  const DATA = window.STORY_DATA;

  // Pull a few CSS custom properties so charts match the site's
  // existing colour palette exactly (defined in style.css :root).
  const rootStyles = getComputedStyle(document.documentElement);
  const colour = (name, fallback) => (rootStyles.getPropertyValue(name) || fallback).trim();

  const COLORS = {
    brownDeep: colour("--color-brown-deep", "#362A18"),
    brown: colour("--color-brown", "#5C4A2E"),
    orange: colour("--color-orange", "#E8A33D"),
    orangeDeep: colour("--color-orange-deep", "#C97C1F"),
    success: colour("--color-success", "#3C6B3E"),
    error: colour("--color-error", "#B3341C"),
    ink: colour("--color-ink", "#2B2318"),
  };

  Chart.defaults.font.family = "'Work Sans', 'Segoe UI', sans-serif";
  Chart.defaults.color = COLORS.brownDeep;

  const gridColor = "rgba(92, 74, 46, 0.12)";

  function withAlpha(hex, alpha) {
    // hex like #E8A33D -> rgba(...)
    const clean = hex.replace("#", "");
    const bigint = parseInt(clean, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  /* ---------------------------------------------------------
     Chapter 1: Scatter — screen size (inch) vs energy (kWh/yr)
     --------------------------------------------------------- */
  const scatterCanvas = document.getElementById("scatterChart");
  if (scatterCanvas) {
    new Chart(scatterCanvas, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "TV model",
            data: DATA.scatterPoints,
            backgroundColor: withAlpha(COLORS.orangeDeep, 0.55),
            borderColor: withAlpha(COLORS.brownDeep, 0.4),
            borderWidth: 0.5,
            pointRadius: 3,
            pointHoverRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.parsed.x}" screen → ${ctx.parsed.y.toLocaleString()} kWh/year`,
            },
          },
        },
        scales: {
          x: {
            title: { display: true, text: "Screen size (inches)" },
            grid: { color: gridColor },
          },
          y: {
            title: { display: true, text: "Labelled energy consumption (kWh/year)" },
            grid: { color: gridColor },
            beginAtZero: true,
          },
        },
      },
    });
  }

  /* ---------------------------------------------------------
     Chapter 2: Bar — average yearly kWh (and $ cost) by category
     --------------------------------------------------------- */
  const costCanvas = document.getElementById("costChart");
  if (costCanvas) {
    const price = DATA.meta.pricePerKwh;
    const catColors = [COLORS.success, COLORS.orange, COLORS.error];

    new Chart(costCanvas, {
      type: "bar",
      data: {
        labels: DATA.categoryLabels.map((l) => l[0].toUpperCase() + l.slice(1)),
        datasets: [
          {
            label: "Average energy use",
            data: DATA.categoryValues,
            backgroundColor: catColors.map((c) => withAlpha(c, 0.85)),
            borderColor: COLORS.brownDeep,
            borderWidth: 1.5,
            borderRadius: 6,
            maxBarThickness: 90,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const kwh = ctx.parsed.y;
                const dollars = (kwh * price).toFixed(0);
                return [`${kwh.toLocaleString()} kWh/year`, `≈ $${dollars} per year to run`];
              },
            },
          },
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            title: { display: true, text: "Average kWh / year" },
            grid: { color: gridColor },
            beginAtZero: true,
          },
        },
      },
    });
  }

  /* ---------------------------------------------------------
     Chapter 3a: Line — average kWh by exact screen size
     --------------------------------------------------------- */
  const sizeLineCanvas = document.getElementById("sizeLineChart");
  if (sizeLineCanvas) {
    new Chart(sizeLineCanvas, {
      type: "line",
      data: {
        labels: DATA.sizeLabels,
        datasets: [
          {
            label: "Average kWh / year",
            data: DATA.sizeValues,
            borderColor: COLORS.orangeDeep,
            backgroundColor: withAlpha(COLORS.orange, 0.25),
            fill: true,
            tension: 0.35,
            pointRadius: 2,
            pointBackgroundColor: COLORS.brownDeep,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}" → ${ctx.parsed.y.toLocaleString()} kWh/year (avg)`,
            },
          },
        },
        scales: {
          x: {
            title: { display: true, text: "Screen size (inches)" },
            grid: { display: false },
            ticks: { maxTicksLimit: 12 },
          },
          y: {
            title: { display: true, text: "Average kWh / year" },
            grid: { color: gridColor },
            beginAtZero: true,
          },
        },
      },
    });
  }

  /* ---------------------------------------------------------
     Chapter 3b: Floating bar — spread (mean ± 1 std) per category
     Shows that variability grows with screen size: not every
     large TV is equally hungry.
     --------------------------------------------------------- */
  const spreadCanvas = document.getElementById("spreadChart");
  if (spreadCanvas) {
    const catColors = [COLORS.success, COLORS.orange, COLORS.error];
    const ranges = DATA.categoryLabels.map((label, i) => {
      const mean = DATA.categoryValues[i];
      const std = DATA.categoryStd[i];
      return [Math.max(0, mean - std), mean + std];
    });

    new Chart(spreadCanvas, {
      type: "bar",
      data: {
        labels: DATA.categoryLabels.map((l) => l[0].toUpperCase() + l.slice(1)),
        datasets: [
          {
            label: "Typical range (±1 std dev)",
            data: ranges,
            backgroundColor: catColors.map((c) => withAlpha(c, 0.35)),
            borderColor: catColors,
            borderWidth: 2,
            borderRadius: 6,
            maxBarThickness: 70,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const [lo, hi] = ctx.raw;
                return `Typically ${Math.round(lo).toLocaleString()}–${Math.round(hi).toLocaleString()} kWh/year`;
              },
            },
          },
        },
        scales: {
          x: {
            title: { display: true, text: "kWh / year" },
            grid: { color: gridColor },
            beginAtZero: true,
          },
          y: { grid: { display: false } },
        },
      },
    });
  }
})();
