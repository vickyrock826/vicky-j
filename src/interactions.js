/* ==========================================================================
   VIGNESH J — INTERACTIONS v2
   ========================================================================== */

export function initInteractions() {
  // 1. Clipboard copy buttons
  const copyBtns = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toast-notice');

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || '';
      try {
        await navigator.clipboard.writeText(text);
        showToast(`${label} copied to clipboard`);
      } catch {
        window.prompt('Copy:', text);
      }
    });
  });

  // 2. Skill cards — subtle tilt on desktop
  const skillCards = document.querySelectorAll('.skill-card, .edu-card');
  if (window.matchMedia('(hover: hover)').matches) {
    skillCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-3px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
}
