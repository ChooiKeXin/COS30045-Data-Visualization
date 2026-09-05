# Exercise 3 – Data Story: TV Energy Consumption

## Overview

This project turns the TV energy consumption dataset explored in Exercise 2 into a data story for a general audience. It builds on the Power Watch website from Exercise 0.2 by adding a new **Data Story** page (`story.html`) with three short chapters, each backed by an interactive chart.

**Data story page:** `story.html`

---

## Data Story

### Audience

This story is written for three groups:

- **Consumers** shopping for a new TV who want to understand running costs
- **Policymakers and regulators** interested in energy consumption trends
- **Researchers** studying energy efficiency in consumer electronics

All three care about the same underlying question, just for different reasons: *how much does screen size really affect a TV's energy use?*

### The question

Based on **Exercise 2, Data Question 2** — *How does screen size impact energy consumption?*

### The three chapters

1. **Bigger Screen, Bigger Bill** — a scatter plot of all 4,508 available TV models shows a strong relationship (correlation 0.86) between screen size and yearly energy use.
2. **The Hidden Cost of Going Big** — translates that relationship into estimated yearly running cost in dollars, comparing small, medium, and large TVs.
3. **Diminishing Returns — Is Bigger Always Worse?** — shows the relationship isn't perfectly linear (it steepens after ~75") and that energy use varies more widely within the "large" category, so not every big TV is equally inefficient.

Each chapter pairs a chart with plain-language text so a non-technical reader can follow the story without needing to read a graph cold.

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

The story aims to represent the data honestly:

- Charts use real, unmodified aggregate figures — no exaggerated axes or misleading scales
- Assumptions (like the electricity price) are stated clearly rather than hidden
- Chapter 3 deliberately shows variability within categories, rather than only the tidy small/medium/large averages, to avoid implying every large TV is automatically wasteful

---

## AI Declaration

Generative AI (Claude) was used to assist with this exercise, including:

- Reviewing the workflow and suggesting which data question would tell the clearest story
- Drafting the three chapter narratives and page copy
- Writing the HTML/CSS for the new `story.html` page (kept visually consistent with the existing Power Watch site)
- Writing the JavaScript (Chart.js) code that renders the four charts
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
exercise0_2/
├── index.html            # Home page
├── televisions.html      # TV energy calculator
├── story.html            # NEW — Data Story page (Exercise 3)
├── about.html            # About page
├── assets/
│   ├── css/
│   │   ├── style.css      # Original site styles
│   │   └── story.css      # NEW — styles for the Data Story page
│   ├── js/
│   │   ├── main.js         # Original site scripts
│   │   ├── story.js         # NEW — chart rendering logic
│   │   ├── story-data.js    # NEW — pre-computed chart data
│   │   └── vendor/          # NEW — locally hosted Chart.js library
│   ├── data/
│   │   └── tv_2026_02_15.csv
│   └── img/
```
