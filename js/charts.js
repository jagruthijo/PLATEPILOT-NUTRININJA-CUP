/**
 * PlatePilot - Chart.js Visualizations & Analytics
 * Renders interactive macro doughnut charts, weekly nutrition/spending bars, 
 * and weight progression line charts. Seamlessly adapts to light and dark themes.
 */

const AppCharts = {
  macroChartInstance: null,
  weeklyChartInstance: null,
  weightChartInstance: null,

  isDarkMode() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  },

  getThemeColors() {
    const isDark = this.isDarkMode();
    return {
      textColor: isDark ? '#EDF3EF' : '#182A24',
      mutedTextColor: isDark ? '#95A69D' : '#7B877F',
      gridColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
      proteinColor: '#2E7D32',
      carbsColor: '#0288D1',
      fatColor: '#F57C00',
      limeColor: '#B8E986',
      forestGreen: '#163D32'
    };
  },

  /**
   * Render Macro Breakdown Doughnut Chart (Protein, Carbs, Fats)
   */
  renderMacroDoughnut(canvasId, proteinG, carbsG, fatG) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return;

    if (this.macroChartInstance) {
      this.macroChartInstance.destroy();
    }

    const colors = this.getThemeColors();

    const data = {
      labels: ['Protein (g)', 'Carbohydrates (g)', 'Fats (g)'],
      datasets: [{
        data: [proteinG, carbsG, fatG],
        backgroundColor: [
          '#2E7D32', // Forest Green / Green
          '#0288D1', // Cyan / Blue
          '#F57C00'  // Amber / Orange
        ],
        hoverBackgroundColor: [
          '#388E3C',
          '#039BE5',
          '#FB8C00'
        ],
        borderWidth: 3,
        borderColor: colors.textColor === '#EDF3EF' ? '#13241D' : '#FFFFFF',
        hoverOffset: 6
      }]
    };

    const config = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '74%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(16, 44, 37, 0.9)',
            titleFont: { family: 'Plus Jakarta Sans', size: 13 },
            bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const val = context.raw || 0;
                return ` ${label}: ${val}g`;
              }
            }
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 900
        }
      }
    };

    this.macroChartInstance = new Chart(canvas, config);
  },

  /**
   * Render Weekly Spending & Protein Analytics (Combined Bar + Line Chart)
   */
  renderWeeklyTrends(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return;

    if (this.weeklyChartInstance) {
      this.weeklyChartInstance.destroy();
    }

    const colors = this.getThemeColors();

    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    // Realistic weekly student data
    const dailySpend = [118, 115, 122, 110, 125, 130, 118];
    const dailyProtein = [108, 112, 115, 105, 114, 120, 110];

    const config = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Daily Cost (₹)',
            data: dailySpend,
            backgroundColor: 'rgba(22, 61, 50, 0.75)',
            hoverBackgroundColor: '#245B45',
            borderRadius: 6,
            yAxisID: 'yCost',
            order: 2
          },
          {
            label: 'Protein (g)',
            data: dailyProtein,
            type: 'line',
            borderColor: '#B8E986',
            backgroundColor: '#B8E986',
            borderWidth: 3,
            pointBackgroundColor: '#163D32',
            pointBorderColor: '#B8E986',
            pointBorderWidth: 2,
            pointRadius: 4,
            tension: 0.35,
            yAxisID: 'yProtein',
            order: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: colors.textColor,
              font: { family: 'Plus Jakarta Sans', weight: '600', size: 12 },
              usePointStyle: true,
              boxWidth: 8
            }
          },
          tooltip: {
            backgroundColor: 'rgba(16, 44, 37, 0.9)',
            padding: 12,
            cornerRadius: 8
          }
        },
        scales: {
          x: {
            grid: { color: colors.gridColor },
            ticks: { color: colors.mutedTextColor, font: { family: 'Plus Jakarta Sans', size: 11 } }
          },
          yCost: {
            type: 'linear',
            position: 'left',
            grid: { color: colors.gridColor },
            ticks: {
              color: colors.mutedTextColor,
              callback: value => `₹${value}`
            },
            min: 50,
            max: 160
          },
          yProtein: {
            type: 'linear',
            position: 'right',
            grid: { display: false },
            ticks: {
              color: colors.mutedTextColor,
              callback: value => `${value}g`
            },
            min: 60,
            max: 150
          }
        }
      }
    };

    this.weeklyChartInstance = new Chart(canvas, config);
  },

  /**
   * Render Historical Weight Progression Line Chart
   */
  renderWeightHistory(canvasId, weightData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return;

    if (this.weightChartInstance) {
      this.weightChartInstance.destroy();
    }

    const colors = this.getThemeColors();
    const labels = weightData.map(d => d.date);
    const weights = weightData.map(d => d.weight);

    const config = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Body Weight (kg)',
          data: weights,
          borderColor: '#245B45',
          backgroundColor: 'rgba(36, 91, 69, 0.1)',
          fill: true,
          borderWidth: 3,
          pointBackgroundColor: '#B8E986',
          pointBorderColor: '#163D32',
          pointRadius: 5,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(16, 44, 37, 0.9)',
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: context => ` ${context.raw} kg`
            }
          }
        },
        scales: {
          x: {
            grid: { color: colors.gridColor },
            ticks: { color: colors.mutedTextColor }
          },
          y: {
            grid: { color: colors.gridColor },
            ticks: {
              color: colors.mutedTextColor,
              callback: value => `${value} kg`
            }
          }
        }
      }
    };

    this.weightChartInstance = new Chart(canvas, config);
  },

  // Refresh charts when theme toggles
  refreshAll() {
    if (this.macroChartInstance) {
      const colors = this.getThemeColors();
      this.macroChartInstance.data.datasets[0].borderColor = colors.textColor === '#EDF3EF' ? '#13241D' : '#FFFFFF';
      this.macroChartInstance.update();
    }
    if (this.weeklyChartInstance) {
      const colors = this.getThemeColors();
      this.weeklyChartInstance.options.scales.x.grid.color = colors.gridColor;
      this.weeklyChartInstance.options.scales.yCost.grid.color = colors.gridColor;
      this.weeklyChartInstance.options.scales.x.ticks.color = colors.mutedTextColor;
      this.weeklyChartInstance.options.scales.yCost.ticks.color = colors.mutedTextColor;
      this.weeklyChartInstance.options.plugins.legend.labels.color = colors.textColor;
      this.weeklyChartInstance.update();
    }
  }
};

window.AppCharts = AppCharts;
