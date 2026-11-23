# PLATEPILOT – NUTRININJA CUP
## Eat Smart. Spend Less. Grow Strong.
### Premium Frontend-Only Student Nutrition & Budget Web Application

---

## 🏆 Project Overview

**PlatePilot** is an award-winning, commercial-grade, frontend-only nutrition tech application designed specifically for college students living in hostels, PGs, and shared apartments across India. It solves the classic student dilemma: balancing limited daily budgets (₹80–₹150/day) with high protein targets (100g–120g/day) without resorting to expensive food delivery apps.

> **Zero Backend Requirement**: Built strictly with HTML5, CSS3, Vanilla ES6+ JavaScript, Chart.js, GSAP 3.12, Lucide Icons, and browser `localStorage`. No Node.js, Express, databases, or API keys needed. Works 100% locally in any browser.

---

## 🎨 Design System & Brand Identity

- **Primary Forest Green**: `#163D32` (Health, Vitality, Authority)
- **Deep Green**: `#102C25` (Sidebar Background, Premium Contrast)
- **Secondary Green**: `#245B45` (Subtle UI borders, hover states)
- **Lime Accent**: `#B8E986` (High-energy accents, progress bars, active indicators)
- **Cream Surface**: `#F6F7F1` (Natural background, paper texture)
- **Dark Text**: `#182A24` (High contrast, modern readability)
- **Muted Text**: `#7B877F` (Labels, metadata, auxiliary notes)
- **Typography**: `Plus Jakarta Sans`, `Manrope`, `Inter` (Google Fonts)
- **Themes**: Seamless Light and Dark mode with live CSS variable switching and local persistence.

---

## 📂 Project Architecture

```
PLATEPILOT – NUTRININJA CUP/
│
├── index.html              # High-conversion startup landing page
├── dashboard.html          # Personalized daily hub & live analytics
├── meal-planner.html       # 7-day weekly calendar & day regenerator
├── recipes.html            # 52+ authentic Indian student recipe catalog
├── grocery.html            # Smart consolidated grocery list & budget tracker
├── nutrition.html          # Advanced nutrition visualizer & fitness log
├── hostel-mess.html        # Dedicated Hostel Mess Alternative & Rescue Mode
├── pantry.html             # Pantry Leftover Optimizer (₹0-₹15 extra spend)
├── community.html          # Student Community Recipe Board
├── profile.html            # Profile configuration, BMR/TDEE & Demo loader
│
├── css/
│   ├── style.css           # Brand palette, CSS variables, resets, app shell
│   ├── components.css      # SaaS cards, buttons, badges, modals, toasts
│   ├── dashboard.css       # KPI widgets, doughnut layout, meal cards
│   └── animations.css      # Shimmer skeletons, floating keyframes, transitions
│
├── js/
│   ├── storage.js          # Persistent localStorage manager & demo state
│   ├── meal-optimizer.js   # Greedy & knapsack multi-objective meal planner
│   ├── charts.js           # Chart.js instances (macros, trends, weight)
│   ├── animations.js       # GSAP ScrollTrigger, counters, confetti
│   ├── pdf-exporter.js     # Client-side 7-day meal plan & grocery PDF generator
│   ├── app.js              # Global theme toggle, toasts, notifications, search
│   ├── dashboard.js        # Dashboard controller, meal cards, completion
│   ├── meal-planner.js     # 7-day calendar controller & day copier
│   ├── recipes-page.js     # 52 recipe explorer, filters, cost breakdown modal
│   ├── grocery.js          # Grocery aggregator, checkbox tracker, custom items
│   ├── nutrition-page.js   # Target vs Actual, weight log, efficiency matrix
│   ├── hostel-mess.js      # Mess diagnostic engine & booster recommendations
│   ├── pantry.js           # Leftover matcher & lowest-cost recipe finder
│   ├── community.js        # Community post creator & like upvoting system
│   └── profile-page.js     # Mifflin-St Jeor calculator, goal settings
│
└── js/data/
    ├── ingredients.js      # Realistic 2024-2026 Indian kirana ingredient pricing catalog
    └── recipes.js          # 52 authentic Indian student recipes with itemized costs
```

---

## ⚡ Core Features & Innovation

### 1. Smart Budget Knapsack Optimizer (`js/meal-optimizer.js`)
Instead of displaying random recipes, PlatePilot employs a **multi-objective greedy knapsack algorithm**:
- **Constraint**: Daily Budget $\le$ Target (e.g. ₹120). Plans exceeding budget are penalized heavily.
- **Objective 1**: Maximize daily protein intake ($\ge 110\text{g}$).
- **Objective 2**: Match Mifflin-St Jeor TDEE caloric target ($\approx 2,100\text{ kcal}$).
- **Objective 3**: Strict adherence to dietary preferences (`veg`, `non-veg`, `vegan`) and allergen exclusions.
- **Objective 4**: Variety enforcement (penalizes repeated dishes or consecutive ingredients).
- **Graceful Strain Handling**: If budget is too tight for the target, explains the constraint and generates the closest feasible plan.

### 2. 52 Authentic Indian Student Recipes (`js/data/recipes.js`)
Every recipe includes:
- Realistic 2024–2026 Indian kirana market pricing (e.g., Eggs ₹7/ea, Soya Chunks ₹12/100g, Paneer ₹38/100g, Rice ₹45/kg).
- Itemized ingredient cost breakdown table (e.g., Egg Bhurji: Eggs ₹14, Onion ₹2, Tomato ₹2, Oil ₹1, Spices ₹2, 2 Rotis ₹12 = ₹35 total).
- Accurate macros: Calories, Protein, Carbohydrates, Fats, Fiber.
- Cooking time and step-by-step instructions.
- Dedicated **Hostel Room Hack** (electric kettle, single induction pan, zero-cooking shortcuts).

### 3. One-Click Meal Swap System
Every meal card has a **Swap** button. Opening the modal presents intelligent alternatives for that slot, calculating the exact price difference (+₹5, -₹10) and protein difference (+6g). Clicking "Select" instantly updates the daily totals, remaining budget, and re-renders the Chart.js doughnut chart without page reload!

### 4. Hostel Mess Alternative & Rescue Mode (`hostel-mess.html`)
Hostel students who have already paid mandatory mess fees can input their daily mess menu. PlatePilot diagnoses the nutritional deficit (typically high-carb, low-protein: ~38g protein) and recommends pocket-friendly **₹8–₹25 student boosters**:
- 2–3 Hard Boiled Eggs (+19g protein, ₹21)
- 50g Bhuna Chana (+11g protein, ₹8)
- Chana Sattu Buttermilk Shake (+18g protein, ₹15)
- Pan-Roasted Soya Chunks (+26g protein, ₹6)

### 5. Pantry Leftover Optimizer (`pantry.html`)
Students add whatever ingredients are sitting in their hostel room (oats, peanuts, eggs, onions). The matching engine scans all 52 recipes and ranks meals by **Minimum Additional Kirana Spend** (recipes requiring ₹0 to ₹15 extra to cook).

### 6. Smart Grocery Aggregator (`grocery.html`)
Aggregates ingredients across the 7-day meal plan, combines duplicate quantities (e.g. 50g soya chunks across 3 meals = 150g total), sorts them by Indian grocery category, tracks purchase checkboxes, supports adding custom items, and exports a clean checklist to the clipboard or PDF.

### 7. Indian Protein-per-Rupee Efficiency Matrix (`nutrition.html`)
A data-backed benchmark table showing which foods yield the most protein per ₹1 spent in India:
1. **🥇 Soya Chunks**: 4.33g protein / ₹1 spent
2. **🥈 Roasted Bhuna Chana**: 1.38g protein / ₹1 spent
3. **🥉 Moong Dal / Sprouts**: 1.33g protein / ₹1 spent
4. **Chana Sattu**: 1.25g protein / ₹1 spent
5. **Farm Fresh Eggs**: 0.93g protein / ₹1 spent
6. **Chicken Breast**: 0.84g protein / ₹1 spent
7. **Dairy Paneer**: 0.47g protein / ₹1 spent

### 8. Client-Side PDF Exporter (`js/pdf-exporter.js`)
Uses `html2pdf.js` to compile the 7-day meal schedule, student profile metadata, nutritional targets, and consolidated grocery list into an executive, printable PDF document formatted for student desk pin-boards.

---

## 🚀 How to Run the Application

Since PlatePilot is a **100% frontend-only** web application, you do **not** need to install or run any backend servers, Node modules, or databases!

### Option 1: Double-Click (Direct Browser Open)
1. Open File Explorer to:
   `C:\Users\yella\OneDrive\.vscode\PLATEPILOT – NUTRININJA CUP`
2. Double-click `index.html` (or `dashboard.html`).
3. It will open instantly in your default web browser (Chrome, Edge, Firefox, Brave, Safari).

### Option 2: Live Server in VS Code
1. Open this folder in VS Code.
2. Right-click `index.html` and click **"Open with Live Server"**.
3. The application will launch at `http://127.0.0.1:5500/index.html`.

---

## 🎯 NutriNinja Cup Demo Walkthrough

The application comes pre-loaded with the official **NutriNinja Cup Demo Profile**:
- **Student**: Aarav Sharma (IIT Delhi, Hostel 7)
- **Daily Food Budget**: ₹120 / day
- **Fitness Goal**: Muscle Gain (Surplus +300 kcal)
- **Dietary Preference**: Non-Vegetarian
- **Targets**: ~2,100 kcal, 110g Protein

### 9-Step Judge & Evaluation Flow:
1. **Open Landing Page (`index.html`)**: Review the startup hero, floating macro cards, problem comparison table, and 4-step workflow.
2. **Click "Start Your Journey"**: Enters the personalized dashboard (`dashboard.html`).
3. **Review Dashboard KPIs**:
   - Daily Budget: ₹118 spent of ₹120 (₹2 remaining under budget).
   - Calories: 1,990 of 2,100 kcal ring.
   - Protein: 108g of 110g goal progress bar.
   - Interactive Chart.js Macro Doughnut & Weekly Spending Trend chart.
4. **Inspect Ingredient Cost Breakdown**: Click "Swap" or navigate to `recipes.html` and click "Cost Breakdown" on *Egg Bhurji with 2 Rotis* to see the itemized ₹35 breakdown and hostel kettle hack.
5. **Perform a 1-Click Meal Swap**: On the dashboard, click "Swap" on Breakfast. Choose a vegetarian alternative (*Moong Dal Chilla*). Notice that total daily spending, remaining budget, and macros instantly recalculate!
6. **Test the Mess Rescue Mode (`hostel-mess.html`)**: Click "Load Typical Indian Mess Menu" and click "Analyze". Watch the diagnostic show a -72g protein deficit and recommend ₹8–₹21 pocket boosters to hit 110g protein!
7. **Inspect the Smart Grocery List (`grocery.html`)**: Notice ingredients are aggregated from the 7-day meal plan, consolidated by category, and priced. Click checkboxes to mark items as bought.
8. **Test the Pantry Optimizer (`pantry.html`)**: View room items (Oats, Eggs, Peanuts) and see recipes you can cook right now for ₹0 extra.
9. **Export PDF**: Click "Export 7-Day PDF" on the dashboard or meal planner to download the printable 7-day plan and grocery checklist!

---

## 📱 Responsive & Accessible
- Designed for mobile phones, tablets, and high-resolution desktop screens.
- Includes smooth GSAP animations and micro-interactions.
- Full `@media (prefers-reduced-motion)` accessibility support.
- Fully local persistence: your preferences, checked grocery items, and weight logs are preserved across browser restarts.
