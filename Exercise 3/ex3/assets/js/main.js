/* =========================================================
   Power Watch — main.js
   Handles:
   1. Footer current year (runs on every page)
   2. FAQ accordion (Home page)
   3. Appliance Energy Calculator (Televisions page)
   ========================================================= */

/* ---------------------------------------------------------
   1. FOOTER YEAR
   Runs on every page that includes an element with id="year".
   --------------------------------------------------------- */
(function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

/* ---------------------------------------------------------
   2. FAQ ACCORDION
   Each question is a <button aria-expanded="false"> that
   controls a sibling answer panel. Clicking toggles the
   panel open/closed and updates aria-expanded for
   accessibility. Only runs if FAQ markup exists on the page.
   --------------------------------------------------------- */
(function initFaqAccordion() {
  const questions = document.querySelectorAll(".faq-question");
  if (questions.length === 0) return;

  questions.forEach((button) => {
    button.addEventListener("click", () => {
      const answer = document.getElementById(button.getAttribute("aria-controls"));
      const isOpen = button.getAttribute("aria-expanded") === "true";

      // Toggle this item
      button.setAttribute("aria-expanded", String(!isOpen));

      if (!isOpen) {
        // Opening: set max-height to the content's actual height
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        // Closing
        answer.style.maxHeight = "0px";
      }
    });
  });
})();

/* ---------------------------------------------------------
   3. APPLIANCE ENERGY CALCULATOR
   Only runs on pages that include the calculator markup
   (id="calculator-form"). Demonstrates:
     - reading values from the DOM
     - event handling
     - client-side calculation
     - dynamic, non-duplicating results update
     - input validation with inline feedback
   --------------------------------------------------------- */
(function initCalculator() {
  const form = document.getElementById("calculator-form");
  if (!form) return;

  // A small made-up dataset of TV models and their typical
  // power draw in watts. Figures are illustrative placeholders
  // for this exercise, not verified manufacturer data.
  const TV_MODELS = {
    "32-led": { label: "32\" LED TV", watts: 60 },
    "43-led": { label: "43\" LED TV", watts: 90 },
    "55-led4k": { label: "55\" 4K LED TV", watts: 110 },
    "65-oled": { label: "65\" OLED TV", watts: 150 },
    "75-qled": { label: "75\" QLED TV", watts: 205 },
  };

  const modelSelect = document.getElementById("tv-model");
  const customWattField = document.getElementById("custom-watt-field");
  const customWattInput = document.getElementById("custom-watt");
  const hoursInput = document.getElementById("hours-per-day");
  const priceInput = document.getElementById("price-per-kwh");

  const errorModel = document.getElementById("error-model");
  const errorHours = document.getElementById("error-hours");
  const errorPrice = document.getElementById("error-price");

  const results = document.getElementById("meter-results");

  // Show/hide the custom wattage field depending on model choice.
  modelSelect.addEventListener("change", () => {
    const showCustom = modelSelect.value === "custom";
    customWattField.classList.toggle("is-visible", showCustom);
    if (!showCustom) {
      customWattInput.value = "";
      errorModel.textContent = "";
    }
  });

  // Recalculate on submit, and live-update as inputs change so
  // results never feel stale or require a second click.
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    calculateAndRender();
  });
  [modelSelect, customWattInput, hoursInput, priceInput].forEach((el) => {
    el.addEventListener("input", calculateAndRender);
    el.addEventListener("change", calculateAndRender);
  });

  function getWattage() {
    errorModel.textContent = "";

    if (modelSelect.value === "") {
      errorModel.textContent = "Choose a TV model or \u201cCustom wattage\u201d.";
      return null;
    }

    if (modelSelect.value === "custom") {
      const value = parseFloat(customWattInput.value);
      if (isNaN(value) || value <= 0) {
        errorModel.textContent = "Enter a wattage greater than 0.";
        return null;
      }
      return value;
    }

    return TV_MODELS[modelSelect.value].watts;
  }

  function getHours() {
    errorHours.textContent = "";
    const value = parseFloat(hoursInput.value);
    if (isNaN(value) || value < 0 || value > 24) {
      errorHours.textContent = "Enter hours between 0 and 24.";
      return null;
    }
    return value;
  }

  function getPrice() {
    errorPrice.textContent = "";
    const value = parseFloat(priceInput.value);
    if (isNaN(value) || value <= 0) {
      errorPrice.textContent = "Enter a price greater than 0.";
      return null;
    }
    return value;
  }

  function calculateAndRender() {
    const watts = getWattage();
    const hours = getHours();
    const priceCentsPerKwh = getPrice();

    // If any input is invalid, clear the results panel back to
    // its placeholder state rather than showing stale numbers.
    if (watts === null || hours === null || priceCentsPerKwh === null) {
      renderPlaceholder();
      return;
    }

    // --- Calculation logic ---
    const dailyKwh = (watts * hours) / 1000;
    const monthlyKwh = dailyKwh * 30;
    const yearlyKwh = dailyKwh * 365;

    const priceDollarsPerKwh = priceCentsPerKwh / 100;
    const monthlyCost = monthlyKwh * priceDollarsPerKwh;
    const yearlyCost = yearlyKwh * priceDollarsPerKwh;

    renderResults({
      dailyKwh,
      monthlyKwh,
      yearlyKwh,
      monthlyCost,
      yearlyCost,
    });
  }

  function renderPlaceholder() {
    results.innerHTML = `
      <p class="meter__hint" style="margin-top:0;">
        Fill in every field above to see an estimate.
      </p>
    `;
  }

  // Renders (and replaces, never appends) the results panel.
  function renderResults(data) {
    results.innerHTML = `
      <div class="meter__row">
        <span class="meter__label">Daily use</span>
        <span class="meter__value">${data.dailyKwh.toFixed(2)} kWh</span>
      </div>
      <div class="meter__row">
        <span class="meter__label">Monthly use</span>
        <span class="meter__value">${data.monthlyKwh.toFixed(1)} kWh</span>
      </div>
      <div class="meter__row">
        <span class="meter__label">Yearly use</span>
        <span class="meter__value">${data.yearlyKwh.toFixed(0)} kWh</span>
      </div>
      <div class="meter__row">
        <span class="meter__label">Estimated monthly cost</span>
        <span class="meter__value">$${data.monthlyCost.toFixed(2)}</span>
      </div>
      <div class="meter__row">
        <span class="meter__label">Estimated yearly cost</span>
        <span class="meter__value">$${data.yearlyCost.toFixed(2)}</span>
      </div>
    `;
  }

  // Initial state on page load / after refresh.
  renderPlaceholder();
})();
