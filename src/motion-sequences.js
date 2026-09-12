/* ==========================================================================
   VIGNESH J — KINETIC MOTION SEQUENCES
   Generated & Validated with motion-dev MCP
   ========================================================================== */

export function runMotionSequences() {
  // Staggered reveal for Hero elements
  const sequenceElements = [
    { selector: '.badge-tactical', delay: 80 },
    { selector: '.hero-title', delay: 200 },
    { selector: '.hero-lead', delay: 350 },
    { selector: '.hero-cta-group', delay: 480 },
    { selector: '.hero-stats', delay: 620 },
    { selector: '.hero-3d-wrapper', delay: 300 }
  ];

  sequenceElements.forEach(({ selector, delay }) => {
    const el = document.querySelector(selector);
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';

      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0px)';
      }, delay);
    }
  });

  // Intersection Observer for scroll sections
  const scrollElements = document.querySelectorAll('.section, .tactile-card, .simulator-container, .contact-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  scrollElements.forEach(el => {
    observer.observe(el);
  });
}
