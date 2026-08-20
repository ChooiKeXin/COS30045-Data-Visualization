# Appliance Energy Consumption Website

A small multi-page demonstration website built for **Exercise 0.2**, showing basic use of HTML,
CSS and JavaScript, and regular commits to a GitHub repository.

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Placeholder content on Australian appliance energy use, an FAQ accordion, and an appliance energy calculator |
| Televisions | `televisions.html` | A worked example: a table of indicative TV power ratings |
| About Us | `about.html` | Information about the project and the author |

## Folder Structure

```
/
  index.html
  televisions.html
  about.html
  README.md
  assets/
    css/
      style.css
    js/
      main.js
    img/
      PowerIcon.png
    data/
      tv_2026_02_15.csv
```

## Features

- **Top navigation** on every page: shows the logo (click to return Home), a hover effect,
  and highlights the current page (`.active` class, applied via `main.js` based on the URL).
- **FAQ accordion** on the Home page — hidden by default, toggled open/closed with JavaScript
  (`aria-expanded` is used for accessibility as well as styling).
- **Appliance Energy Calculator** (optional JS extension) — lets the user pick a preset appliance
  or type their own wattage, hours of use per day, and electricity price (c/kWh). It validates the
  input, then calculates and displays daily, monthly and yearly energy use (kWh) and estimated
  yearly cost, updating the results panel in place rather than using `alert()`.
- **External CSS only** — all styling lives in `assets/css/style.css`; colours (cream `#f8e8a5`,
  brown `#7d6744`, orange `#eba746`) were sampled directly from the provided `PowerIcon.png` logo.
- **Footer** on every page with the current year (set dynamically via JavaScript), the author's
  name, and a Generative AI acknowledgement.

## How to run / view the website

This site is hosted on Swinburne's Mercury server. It was uploaded via WinSCP into the
`www/htdocs` folder and can be viewed at:

(https://mercury.swin.edu.au/cos30045/s105952915/exercise0_2/index.html)

---

## Generative AI Reflection

**Tool(s) used:** Claude (Anthropic).

**What I used it for:** 

For scaffolding the initial HTML/CSS/JS structure.

**What I changed or adapted after generation:** 

I modified the text content, font style, color, and size, and added answers to the "Frequently Asked Questions" section 
to ensure the content aligned with the assignment requirements. I also updated the file path so that the page could be 
opened using the correct web address in WinSCP.

**What I learned:** 

I learnt how CSS custom properties (`:root` variables) keep a colour palette consistent across pages, how `aria-expanded` 
is used for both accessibility and styling hooks,how to validate form input and update the DOM without using `alert()`. 
I also gained insight into specific CSS design requirements. In addition, I also learned about implementing energy consumption 
calculations, including converting watts and hours of use into daily, monthly and yearly kWh figures and estimated cost. I 
learned how to use JavaScript to add interactivity to the page such as creating a power consumption calculator and processing 
user input.

**Limitations or issues encountered:** 

It is a path-related issue. For instance, when a webpage fails to load in WinSCP. It takes time to make changes and check the 
details carefully to avoid overlooking errors.

