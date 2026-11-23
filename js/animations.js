/**
 * PlatePilot - GSAP & Advanced Animation Controller
 * Handles hero entrance, counters, scroll triggers, modal animations, and micro-interactions.
 */

const AppAnimations = {
  init() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
      console.warn('GSAP is not loaded. Falling back to CSS transitions.');
      return;
    }

    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    this.initCounters();
    this.initHeroEntrance();
    this.initScrollReveals();
  },

  // Animate numeric counters (e.g. calories, budget, protein)
  animateValue(element, start, end, duration = 1000, prefix = '', suffix = '') {
    if (!element) return;
    const startTime = performance.now();
    const diff = end - start;

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + diff * ease);

      element.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = `${prefix}${end.toLocaleString()}${suffix}`;
      }
    }

    requestAnimationFrame(step);
  },

  initCounters() {
    document.querySelectorAll('[data-counter-target]').forEach(el => {
      const target = parseFloat(el.getAttribute('data-counter-target')) || 0;
      const prefix = el.getAttribute('data-counter-prefix') || '';
      const suffix = el.getAttribute('data-counter-suffix') || '';
      this.animateValue(el, 0, target, 1200, prefix, suffix);
    });
  },

  // Landing Page Hero entrance animation
  initHeroEntrance() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCtas = document.querySelector('.hero-cta-group');
    const heroVisual = document.querySelector('.hero-visual-card');

    if (heroTitle && typeof gsap !== 'undefined') {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(heroTitle, { y: 35, opacity: 0, duration: 0.8, delay: 0.1 })
        .from(heroSubtitle, { y: 25, opacity: 0, duration: 0.7 }, '-=0.5')
        .from(heroCtas, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(heroVisual, { scale: 0.92, opacity: 0, duration: 0.9, ease: 'back.out(1.4)' }, '-=0.6');
    }
  },

  // Scroll Trigger reveals
  initScrollReveals() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.utils.toArray('.reveal-on-scroll').forEach(section => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  },

  // Staggered card entrance for dashboard and planner
  animateCardGrid(selector) {
    if (typeof gsap === 'undefined') return;
    const cards = document.querySelectorAll(selector);
    if (!cards.length) return;

    gsap.from(cards, {
      y: 20,
      opacity: 0,
      duration: 0.45,
      stagger: 0.08,
      ease: 'power2.out'
    });
  },

  // Confetti celebration when student hits daily targets
  celebrateGoal() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#B8E986', '#163D32', '#245B45', '#FFFFFF']
      });
    }
  }
};

window.AppAnimations = AppAnimations;
document.addEventListener('DOMContentLoaded', () => AppAnimations.init());
