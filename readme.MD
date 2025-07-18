# Buy vs. Rent Calculator

A modern, minimalist web app that helps users decide whether to buy or rent a home by modeling **7 key variables** and comparing total wealth after a chosen holding period.

---

## 1 ️⃣ Core Inputs

| Variable                | Description                                              | Typical Default |
| ----------------------- | -------------------------------------------------------- | --------------- |
| **Purchase Price**      | Listing price of the home.                               | `\$750 000`     |
| **Down Payment %**      | Cash paid upfront as a % of price.                       | `20 %`          |
| **Mortgage Rate %**     | Annual interest rate (fixed‑rate loan).                  | `6.0 %`         |
| **Mortgage Term**       | Length of loan in years.                                 | `30`            |
| **Monthly Rent**        | Current rent for an equivalent property.                 | `\$3 500`       |
| **Investment Return %** | Expected annual return on invested cash (e.g. S\&P 500). | `7.0 %`         |
| **Home Appreciation %** | Annual price growth of the property.                     | `3.0 %`         |

### Fixed Assumptions (edit in `lib/constants.ts`)

* Property tax + insurance + maintenance: **1.5 %** of home value per year.
* Rent growth: **3 %** per year (≈ inflation +1 %).
* Closing costs: **2 %** on purchase, **6 %** on sale.
* Analysis period: **10 years** (adjustable in UI).

---

## 2 ️⃣ Calculation Logic (high‑level)

1. **Mortgage Payment**
   `M = P  ·  r  ·  (1+r)^n  /  ((1+r)^n – 1)`
   where `P` = loan principal, `r` = monthly interest, `n` = total payments.
2. **Annual Owner Cash‑Out** = mortgage payments + taxes + maintenance – equity build.
3. **Annual Renter Cash‑Out** = rent × (1 + rentGrowth)^t.
4. **Opportunity Cost** = investable cash × (1 + returnRate)^t.
5. **Net Wealth Buy** = equity + opportunityCostRemainingCash – sellingCosts.
6. **Net Wealth Rent** = opportunityCost(Down Payment + delta cash flow).
7. Highlight **Break‑Even Year** & **Cumulative \$ Difference**.

All math lives in **pure functions** inside `lib/calc.ts` for easy unit testing.

---

## 3 ️⃣ Tech Stack

* **Next.js 14** (App Router, TypeScript)
* **React 18**
* **Tailwind CSS ^3.4** (utility‑first styling)
* **Inter** font via `@next/font/google`
* **Recharts** for interactive cost‑difference chart
* **Lucide‑react** icons for clean visuals

---

## 4 ️⃣ Project Structure

```
/
├─ app/
│  ├─ page.tsx          # main form + results
│  └─ components/
│     ├─ InputField.tsx # reusable input w/ label & tooltip
│     ├─ ResultsCard.tsx
│     └─ CostChart.tsx  # bar/line chart (Recharts)
├─ lib/
│  ├─ calc.ts           # financial formulas
│  └─ constants.ts
├─ styles/
│  └─ globals.css       # Tailwind base + custom CSS vars
├─ tailwind.config.js
└─ README.md
```

---

## 5 ️⃣ Design Guidelines

* **Typography** — Inter, `font-sans`, weight 400–700.
* **Layout** — `max-w-3xl mx-auto p-6 md:p-10`, generous whitespace.
* **Components** — rounded‑2xl cards (`shadow-lg`), 1‑px subtle borders.
* **Color** — neutral canvas (#f9fafb) with primary Indigo 600 accents.
* **Accessibility** — use `aria-label` on inputs; ensure WCAG AA contrast.
* **Responsive** — CSS Grid/Flex with `gap‑6`; stack ↔ two‑column forms.

---
