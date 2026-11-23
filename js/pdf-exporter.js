/**
 * PlatePilot - PDF Exporter Engine
 * Generates an executive, print-ready 7-Day Meal Plan and Grocery List PDF
 * formatted for college students with user profile, nutrition targets, and cost breakdowns.
 */

const PDFExporter = {
  export7DayPlan() {
    const profile = window.PlatePilotStorage ? window.PlatePilotStorage.getProfile() : {};
    const allRecipes = window.RECIPES_DATA || [];
    
    // Grab or generate weekly plan
    let weeklyPlan = window.PlatePilotStorage ? window.PlatePilotStorage.get('platepilot_weekly_plan') : null;
    if (!weeklyPlan) {
      // Auto build 7-day plan using optimizer
      weeklyPlan = {};
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      days.forEach(day => {
        const generated = window.MealOptimizer.generateDailyPlan();
        weeklyPlan[day] = generated.mealObjects;
      });
      if (window.PlatePilotStorage) {
        window.PlatePilotStorage.set('platepilot_weekly_plan', weeklyPlan);
      }
    }

    // Build temporary printable container
    const printContainer = document.createElement('div');
    printContainer.id = 'platepilot-pdf-content';
    printContainer.style.padding = '30px';
    printContainer.style.background = '#FFFFFF';
    printContainer.style.color = '#182A24';
    printContainer.style.fontFamily = 'Helvetica, Arial, sans-serif';
    printContainer.style.maxWidth = '800px';

    let weeklyCostTotal = 0;
    let daysHtml = '';

    Object.keys(weeklyPlan).forEach(day => {
      const dayMeals = weeklyPlan[day];
      const b = dayMeals.breakfast;
      const l = dayMeals.lunch;
      const s = dayMeals.snack;
      const d = dayMeals.dinner;

      const dayCost = (b.price || 0) + (l.price || 0) + (s.price || 0) + (d.price || 0);
      const dayProtein = (b.protein || 0) + (l.protein || 0) + (s.protein || 0) + (d.protein || 0);
      const dayCalories = (b.calories || 0) + (l.calories || 0) + (s.calories || 0) + (d.calories || 0);
      weeklyCostTotal += dayCost;

      daysHtml += `
        <div style="margin-bottom: 20px; border: 1px solid #E2E8E0; border-radius: 8px; padding: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #163D32; padding-bottom: 8px; margin-bottom: 10px;">
            <h3 style="margin: 0; color: #163D32; font-size: 16px;">${day}</h3>
            <span style="font-size: 13px; font-weight: bold; color: #245B45;">Cost: ₹${dayCost} | Protein: ${dayProtein}g | Calories: ${dayCalories} kcal</span>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <tr style="background: #F6F7F1;">
              <th style="padding: 6px; text-align: left; width: 22%;">Meal Slot</th>
              <th style="padding: 6px; text-align: left; width: 45%;">Recipe</th>
              <th style="padding: 6px; text-align: right; width: 15%;">Macros</th>
              <th style="padding: 6px; text-align: right; width: 18%;">Estimated Cost</th>
            </tr>
            <tr>
              <td style="padding: 6px; font-weight: bold; border-bottom: 1px solid #EEE;">Breakfast (8:00 AM)</td>
              <td style="padding: 6px; border-bottom: 1px solid #EEE;">${b.name}</td>
              <td style="padding: 6px; text-align: right; border-bottom: 1px solid #EEE;">${b.protein}g P | ${b.calories} cal</td>
              <td style="padding: 6px; text-align: right; font-weight: bold; border-bottom: 1px solid #EEE;">₹${b.price}</td>
            </tr>
            <tr>
              <td style="padding: 6px; font-weight: bold; border-bottom: 1px solid #EEE;">Lunch (1:30 PM)</td>
              <td style="padding: 6px; border-bottom: 1px solid #EEE;">${l.name}</td>
              <td style="padding: 6px; text-align: right; border-bottom: 1px solid #EEE;">${l.protein}g P | ${l.calories} cal</td>
              <td style="padding: 6px; text-align: right; font-weight: bold; border-bottom: 1px solid #EEE;">₹${l.price}</td>
            </tr>
            <tr>
              <td style="padding: 6px; font-weight: bold; border-bottom: 1px solid #EEE;">Snack (5:00 PM)</td>
              <td style="padding: 6px; border-bottom: 1px solid #EEE;">${s.name}</td>
              <td style="padding: 6px; text-align: right; border-bottom: 1px solid #EEE;">${s.protein}g P | ${s.calories} cal</td>
              <td style="padding: 6px; text-align: right; font-weight: bold; border-bottom: 1px solid #EEE;">₹${s.price}</td>
            </tr>
            <tr>
              <td style="padding: 6px; font-weight: bold;">Dinner (8:00 PM)</td>
              <td style="padding: 6px;">${d.name}</td>
              <td style="padding: 6px; text-align: right;">${d.protein}g P | ${d.calories} cal</td>
              <td style="padding: 6px; text-align: right; font-weight: bold;">₹${d.price}</td>
            </tr>
          </table>
        </div>
      `;
    });

    printContainer.innerHTML = `
      <div style="border-bottom: 3px solid #163D32; padding-bottom: 16px; margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h1 style="margin: 0; color: #163D32; font-size: 26px; font-weight: 800;">PLATEPILOT</h1>
            <p style="margin: 3px 0 0; color: #245B45; font-size: 13px; font-weight: bold;">Eat Smart. Spend Less. Grow Strong.</p>
          </div>
          <div style="text-align: right;">
            <div style="background: #163D32; color: #B8E986; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 4px; display: inline-block;">
              NUTRININJA CUP EDITION
            </div>
            <p style="margin: 4px 0 0; font-size: 11px; color: #666;">Generated on: ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <!-- User Profile Header -->
      <div style="background: #F6F7F1; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px; display: flex; justify-content: space-between;">
        <div>
          <strong style="color: #163D32; font-size: 14px;">Student:</strong> ${profile.name || 'Aarav Sharma'} (${profile.college || 'Hostel Campus'})<br>
          <span style="font-size: 12px; color: #555;">Diet: <strong>${profile.dietPreference || 'Non-Vegetarian'}</strong> | Goal: <strong>${profile.fitnessGoal || 'Muscle Gain'}</strong></span>
        </div>
        <div style="text-align: right;">
          <strong style="color: #163D32; font-size: 14px;">Budget Target:</strong> ₹${profile.dailyBudget || 120}/day (Est. ₹${weeklyCostTotal}/week)<br>
          <span style="font-size: 12px; color: #555;">Targets: <strong>${profile.targetCalories || 2100} kcal</strong> | <strong>${profile.targetProtein || 110}g Protein</strong></span>
        </div>
      </div>

      <!-- 7-Day Meal Plan Schedule -->
      <h2 style="color: #163D32; font-size: 18px; margin-bottom: 14px;">7-Day Comprehensive Meal Schedule</h2>
      ${daysHtml}

      <div style="margin-top: 30px; padding-top: 14px; border-top: 1px solid #CCC; text-align: center; font-size: 11px; color: #777;">
        PlatePilot • Frontend-only nutrition & budget optimizer built for student wellness • All prices are realistic Indian kirana estimates.
      </div>
    `;

    document.body.appendChild(printContainer);

    // If html2pdf is available
    if (typeof html2pdf !== 'undefined') {
      window.App.showToast('Preparing your 7-Day Meal Plan PDF...', 'info');
      const opt = {
        margin: 10,
        filename: `PlatePilot_7Day_MealPlan_${profile.name ? profile.name.replace(/\s+/g, '_') : 'Student'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(printContainer).save().then(() => {
        printContainer.remove();
        window.App.showToast('PDF downloaded successfully!', 'success');
      }).catch(err => {
        console.error('PDF generation error', err);
        window.print();
        printContainer.remove();
      });
    } else {
      // Fallback to browser print window
      window.print();
      printContainer.remove();
    }
  }
};

window.PDFExporter = PDFExporter;
