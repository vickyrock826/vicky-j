import { init3DScene } from './scene3d.js';
import { initSimulator } from './simulator.js';
import { initInteractions } from './interactions.js';
import { runMotionSequences } from './motion-sequences.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Initialize Core Systems
  init3DScene();
  initSimulator();
  initInteractions();
  runMotionSequences();

  // Print console branding
  console.log(
    '%c [VIGNESH J — EXECUTIVE PORTFOLIO] \n%c Operations Leadership • BA Economics • Pursuing MBA \n Direct: +91 7639743256 | vickyvji1104@gmail.com ',
    'background: #D4A359; color: #0B0C0E; font-weight: bold; padding: 4px 8px;',
    'background: #151820; color: #F7F5F0; padding: 4px 8px;'
  );
});
