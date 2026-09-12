# Exercise 3 – Data Story: TV Energy Consumption

## Overview

This project turns the TV energy consumption dataset explored in Exercise 2
into three separate data stories, each for a different audience. It builds
on the Power Watch website from Exercise 0.2 by adding a new **Data Story**
page (`story.html`). Each story was planned as its own six-panel storyboard
(issue → demonstrate issue → idea → describe → evidence → recommendation)
before any chart was built, then presented on the page as: storyboard →
short narrative → its own chart.

**Data story page:** `story.html`

---

## Data Story

### Audience

Three separate stories are told from the same dataset, each for a
different reader:

- **Story 1 — Consumers.** TV shoppers comparing models before they buy,
  who check the price tag but rarely the running cost.
- **Story 2 — Policymakers & regulators.** People deciding where energy
  efficiency standards would have the biggest impact on national
  consumption.
- **Story 3 — Researchers & analysts.** People studying energy efficiency
  in consumer electronics, who want the nuance behind a headline
  correlation, not just the average.

All three are based on **Exercise 2, Data Question 2** — *how does screen
size impact energy consumption?* — but each asks a different follow-up
question of the same numbers.

### The three storyboards

1. **Does a bigger TV really cost more to run?** (Consumers) — a scatter
   plot of all 4,508 available TV models shows a strong relationship
   (correlation 0.86) between screen size and yearly energy use, translated
   into an estimated yearly running cost in dollars for small, medium and
   large TVs.
2. **Where should energy efficiency rules focus?** (Policymakers) — a line
   chart shows the relationship isn't linear: energy use accelerates
   sharply past ~75", so efficiency standards aimed at the largest screens
   would have an outsized effect on national energy use.
3. **Is screen size the whole story?** (Researchers) — a floating-bar chart
   shows the typical range of energy use widening sharply with screen size,
   so a strong correlation still hides real variability within each
   category.

Each storyboard uses the same six-panel structure shown in class (issue,
demonstrate issue, idea, describe, evidence, recommendation), hand-planned
before building the matching chart, so the chart always answers the
question the storyboard sets up.

---

## About the Data

### Data source

The [Australian Government energy rating dataset](https://data.gov.au/data/dataset/energy-rating-for-household-appliances) for televisions (`tv_2026_02_15.csv`), the same file used in Exercises 1 and 2.

### Data processing

- Filtered to models marked **"Available"** and **sold in Australia**
- Converted screen size from cm to inches
- Grouped models into **small** (<43"), **medium** (44"–65"), and **large** (66"+) categories
- Aggregated (mean, count, standard deviation) by exact screen size and by category

This mirrors the KNIME workflow built in Exercise 2 (Column Filter → Expression → GroupBy/Pivot).

### Privacy

The dataset contains no personal or sensitive information — it's entirely product specifications (brand, model, screen size, energy use) for televisions sold in Australia.

### Accuracy and limitations

- The dataset is a snapshot from **15 Feb 2026** and is updated regularly, so current listings may differ
- "Labelled energy consumption" is a standardised test figure, not a guarantee of real-world usage
- The **30¢/kWh** electricity price used to estimate dollar costs is an indicative average, not a specific plan or region — actual bills vary by state, provider, and usage pattern
- The dataset doesn't cover every TV model on the Australian market

### Ethics

The stories aim to represent the data honestly:

- Charts use real, unmodified aggregate figures — no exaggerated axes or misleading scales
- Assumptions (like the electricity price) are stated clearly rather than hidden
- Story 3 deliberately shows variability within categories, rather than only the tidy small/medium/large averages, to avoid implying every large TV is automatically wasteful

---

## AI Declaration

Generative AI (Claude) was used to assist with this exercise, including:

- Reviewing the workflow and suggesting which data questions would tell the clearest stories
- Drafting the stories narratives and page copy
- Writing the HTML/CSS for the new `story.html` page (kept visually consistent with the existing Power Watch site)
- Writing the JavaScript (Chart.js) code that renders the three charts
- Drafting this README

All AI-assisted code and text were checked before being added to the site.

---

## How to run / view the website

This site is hosted on Swinburne's Mercury server. It was uploaded via WinSCP into the
`www/htdocs` folder and can be viewed at:

(https://mercury.swin.edu.au/cos30045/s105952915/ex3/story.html)

---

## Website Structure

```
ex3/
├── index.html            # Home page
├── televisions.html      # TV energy calculator
├── story.html            # NEW — Data Story page (Exercise 3): 3 stories, each with its own storyboard + chart
├── about.html            # About page
├── README.md
├── assets/
│   ├── css/
│   │   ├── style.css      # Original site styles
│   │   └── story.css      # NEW — storyboard + story layout styles
│   ├── js/
│   │   ├── main.js         # Original site scripts
│   │   ├── story.js         # NEW — chart rendering logic (3 charts)
│   │   ├── story-data.js    # NEW — pre-computed chart data
│   │   └── vendor/          # NEW — locally hosted Chart.js library
│   ├── data/
│   │   └── tv_2026_02_15.csv
│   └── img/
│   │   └── PowerIcon.png
```
