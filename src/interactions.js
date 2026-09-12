/* ==========================================================================
   VIGNESH J — TACTILE INTERACTIONS & SPECULAR 3D TILT
   Zero Glassmorphism | Pure Solid Physical Interactions
   ========================================================================== */

export function initInteractions() {
  // 1. 3D Card Tilt & Specular Sheen (Physics-driven CSS transforms)
  const cards = document.querySelectorAll('.tactile-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max 6deg tilt to maintain executive brutality and readability
      const rotateX = ((y - centerY) / centerY) * -5.5;
      const rotateY = ((x - centerX) / centerX) * 5.5;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.setProperty('--sheen-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--sheen-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 2. Clipboard Quick Actions (Phone & Email)
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toast-notice');

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Details';
      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`COPIED ${label.toUpperCase()} TO CLIPBOARD`);
        playHapticTick();
      } catch (err) {
        // Fallback prompt
        window.prompt('Copy to clipboard: Ctrl+C, Enter', textToCopy);
      }
    });
  });

  // 3. Synthesized Mechanical Audio Feedback (Web Audio API)
  let audioCtx = null;

  function playHapticTick() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      // Audio not supported or blocked, silently pass
    }
  }

  // Bind mechanical sound to primary buttons
  const interactiveBtns = document.querySelectorAll('.btn, .stat-cell, .ticker-strip');
  interactiveBtns.forEach(el => {
    el.addEventListener('mousedown', () => {
      playHapticTick();
    });
  });
}
