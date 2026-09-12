/* ==========================================================================
   VIGNESH J — OPERATIONS & UNIT ECONOMICS SIMULATOR
   Demonstrating BA Economics Analysis + F&B Store P&L Leadership
   ========================================================================== */

export function initSimulator() {
  const coversInput = document.getElementById('sim-covers');
  const ticketInput = document.getElementById('sim-ticket');
  const foodCostInput = document.getElementById('sim-cogs');
  const varianceInput = document.getElementById('sim-variance');

  if (!coversInput || !ticketInput || !foodCostInput || !varianceInput) return;

  const coversVal = document.getElementById('val-covers');
  const ticketVal = document.getElementById('val-ticket');
  const foodCostVal = document.getElementById('val-cogs');
  const varianceVal = document.getElementById('val-variance');

  const outRevenue = document.getElementById('out-revenue');
  const outVarianceSavings = document.getElementById('out-variance-savings');
  const outProfit = document.getElementById('out-profit');
  const outMargin = document.getElementById('out-margin');
  const outVerdict = document.getElementById('out-verdict');

  function formatINR(val) {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  }

  function update() {
    const covers = parseInt(coversInput.value, 10);
    const ticket = parseInt(ticketInput.value, 10);
    const cogsPct = parseFloat(foodCostInput.value);
    const variancePct = parseFloat(varianceInput.value);

    // Update text labels
    coversVal.textContent = covers.toLocaleString() + ' covers';
    ticketVal.textContent = '₹' + ticket;
    foodCostVal.textContent = cogsPct.toFixed(1) + '%';
    varianceVal.textContent = variancePct.toFixed(1) + '%';

    // Economic & Operations Formulas
    const daysInMonth = 30;
    const monthlyGrossRevenue = covers * ticket * daysInMonth;
    const monthlyCOGS = monthlyGrossRevenue * (cogsPct / 100);
    
    // Labor + Utilities + Overhead benchmarks for physical retail/F&B operations (~28%)
    const overheadPct = 28.0;
    const monthlyOverhead = monthlyGrossRevenue * (overheadPct / 100);

    // Cost leakage saved by Vignesh's F&B audit & inventory control (1 Year F&B Manager + Cashier Precision)
    const leakageSaved = monthlyGrossRevenue * (variancePct / 100);

    // Net operating profit with inventory discipline
    const baseProfit = monthlyGrossRevenue - monthlyCOGS - monthlyOverhead;
    const finalProfit = baseProfit + (leakageSaved * 0.7); // 70% captured directly to EBITDA
    const finalMarginPct = (finalProfit / monthlyGrossRevenue) * 100;

    // Render outputs
    if (outRevenue) outRevenue.textContent = formatINR(monthlyGrossRevenue);
    if (outVarianceSavings) outVarianceSavings.textContent = '+' + formatINR(leakageSaved) + '/mo';
    if (outProfit) outProfit.textContent = formatINR(finalProfit);
    if (outMargin) outMargin.textContent = finalMarginPct.toFixed(1) + '% EBITDA';

    // Dynamic executive verdict
    if (outVerdict) {
      if (finalMarginPct >= 35) {
        outVerdict.innerHTML = `
          <strong>[STATUS: HIGH-YIELD OPERATION]</strong>
          With ${cogsPct}% food cost control and stringent FIFO inventory audits, your branch captures maximum unit contribution. Vignesh's dual economics & store management background ensures zero cash leakage at checkout.
        `;
      } else if (finalMarginPct >= 20) {
        outVerdict.innerHTML = `
          <strong>[STATUS: BALANCED STABLE OPERATION]</strong>
          Standard commercial margins. By recovering ${formatINR(leakageSaved)}/mo in preventable waste, the operation defends net profit against fluctuating commodity prices.
        `;
      } else {
        outVerdict.innerHTML = `
          <strong>[STATUS: HIGH INVENTORY SENSITIVITY]</strong>
          Tight margins require aggressive portion-control audits and upselling at the counter. Vignesh's frontline sales experience (6 mos) directly accelerates ticket sizes to offset high supplier costs.
        `;
      }
    }
  }

  [coversInput, ticketInput, foodCostInput, varianceInput].forEach(slider => {
    slider.addEventListener('input', update);
  });

  update();
}
