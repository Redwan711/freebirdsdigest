# VPN Quiz Recommendation Engine — Conversion-Optimized Scoring System (Backup)

> **Document Purpose:** Complete archive of the conversion-optimized probabilistic recommendation engine used in `front-end/data/vpn-quiz-data.js` prior to upgrading to the 5-Question Hybrid Scoring Engine.

---

## 1. Overview of the Logic

This engine was designed to maximize affiliate revenue by routing users based primarily on their budget answer (Question 3):
- **Ignored Inputs:** Questions 1, 2, 4, and 5 had no impact on selecting the winner or runner-up.
- **Budget Branching:**
  1. **`budget_longterm` ($1.11 - $2.69/mo):** NordVPN ($3.09/mo) was strictly excluded from #1 to prevent pricing friction. Traffic was split:
     - `hide.me` ($2.69/mo): 60%
     - `PrivadoVPN` ($1.11/mo): 40%
     - Runner-up: PrivadoVPN/hide.me (50%), PureVPN (35%), Hotspot Shield (15%).
  2. **`premium` ($3+/mo):**
     - `NordVPN`: 85%
     - `hide.me`: 15%
     - Runner-up: hide.me (35%), PrivadoVPN (35%), PureVPN (15%), Hotspot Shield (15%).
  3. **`free_trial` (100% Free Plan or Risk-Free Trial):**
     - `NordVPN`: 50%
     - `hide.me`: 30%
     - `PrivadoVPN`: 20%
     - Runner-up: hide.me (45%), PrivadoVPN (45%), Hotspot Shield (10%).
  4. **Default / Global Fallback:**
     - `NordVPN`: 50%
     - `hide.me`: 30%
     - `PrivadoVPN`: 20%
     - Runner-up: hide.me (30%), PrivadoVPN (30%), PureVPN (20%), Hotspot Shield (20%).

- **Match Percentages:**
  - Top Match: `95 + Math.floor(Math.random() * 5)` (95% – 99%)
  - Runner-up: `Math.min(topMatchPercent - 4, 88 + Math.floor(Math.random() * 5))` (88% – 92%)

- **Reasons Justification:**
  - Pulled up to 4 reasons from `topProvider.reasonTemplates` matching the user's selected choice IDs, with fallback to `topProvider.keyFeatures`.

---

## 2. Complete JavaScript Implementation

```javascript
export function calculateRecommendation(userAnswers) {
  // Extract all selected option IDs from user answers object
  const selectedOptionIds = [];
  Object.values(userAnswers).forEach((val) => {
    if (Array.isArray(val)) {
      selectedOptionIds.push(...val);
    } else if (val) {
      selectedOptionIds.push(val);
    }
  });

  const isBudgetOption = selectedOptionIds.includes("budget_longterm");
  const isPremiumOption = selectedOptionIds.includes("premium");
  const isFreeTrialOption = selectedOptionIds.includes("free_trial");

  let topProviderId;
  let runnerUpId;

  if (isBudgetOption) {
    // =========================================================================
    // CASE 1: User explicitly requested Budget-Friendly Deal ($1.11 - $2.69/mo)
    // NordVPN ($3.09/mo) is STRICTLY EXCLUDED from #1 to prevent pricing conflicts.
    // Top #1 is distributed between our budget-fitting affiliate partners:
    // - hide.me ($2.69/mo): 60%
    // - PrivadoVPN ($1.11/mo): 40%
    // =========================================================================
    const roll = Math.random();
    if (roll < 0.60) {
      topProviderId = "hideme";
      const rRoll = Math.random();
      if (rRoll < 0.50) runnerUpId = "privadovpn";
      else if (rRoll < 0.85) runnerUpId = "purevpn";
      else runnerUpId = "hotspotshield";
    } else {
      topProviderId = "privadovpn";
      const rRoll = Math.random();
      if (rRoll < 0.50) runnerUpId = "hideme";
      else if (rRoll < 0.85) runnerUpId = "purevpn";
      else runnerUpId = "hotspotshield";
    }
  } else if (isPremiumOption) {
    // =========================================================================
    // CASE 2: User explicitly requested Premium Security & Speed ($3+/mo)
    // NordVPN ($3.09/mo) is the prime $3+ provider.
    // - NordVPN: 85%
    // - hide.me: 15%
    // =========================================================================
    const roll = Math.random();
    if (roll < 0.85) {
      topProviderId = "nordvpn";
      const rRoll = Math.random();
      if (rRoll < 0.35) runnerUpId = "hideme";
      else if (rRoll < 0.70) runnerUpId = "privadovpn";
      else if (rRoll < 0.85) runnerUpId = "purevpn";
      else runnerUpId = "hotspotshield";
    } else {
      topProviderId = "hideme";
      runnerUpId = "nordvpn";
    }
  } else if (isFreeTrialOption) {
    // =========================================================================
    // CASE 3: User requested 100% Free Plan or Risk-Free Trial
    // NordVPN qualifies with its 30-day risk-free money-back guarantee & 7-day trial.
    // hide.me qualifies with its unlimited free plan.
    // PrivadoVPN qualifies with its 10GB/mo free plan.
    // - NordVPN: 50%
    // - hide.me: 30%
    // - PrivadoVPN: 20%
    // =========================================================================
    const roll = Math.random();
    if (roll < 0.50) {
      topProviderId = "nordvpn";
      const rRoll = Math.random();
      if (rRoll < 0.45) runnerUpId = "hideme";
      else if (rRoll < 0.90) runnerUpId = "privadovpn";
      else runnerUpId = "hotspotshield";
    } else if (roll < 0.80) {
      topProviderId = "hideme";
      runnerUpId = "nordvpn";
    } else {
      topProviderId = "privadovpn";
      runnerUpId = "nordvpn";
    }
  } else {
    // =========================================================================
    // DEFAULT / GLOBAL DISTRIBUTION
    // - NordVPN: 50%
    // - hide.me: 30%
    // - PrivadoVPN: 20%
    // =========================================================================
    const topRoll = Math.random();
    if (topRoll < 0.50) {
      topProviderId = "nordvpn";
      const runnerRoll = Math.random();
      if (runnerRoll < 0.30) runnerUpId = "hideme";
      else if (runnerRoll < 0.60) runnerUpId = "privadovpn";
      else if (runnerRoll < 0.80) runnerUpId = "purevpn";
      else runnerUpId = "hotspotshield";
    } else if (topRoll < 0.80) {
      topProviderId = "hideme";
      runnerUpId = "nordvpn";
    } else {
      topProviderId = "privadovpn";
      runnerUpId = "nordvpn";
    }
  }

  const topProvider = VPN_PROVIDERS[topProviderId];
  const runnerUp = VPN_PROVIDERS[runnerUpId];

  // Dynamic realistic match percentages (Top: 95%-99%, Runner-up: 88%-92%)
  const topMatchPercent = 95 + Math.floor(Math.random() * 5);
  const runnerUpMatchPercent = Math.min(topMatchPercent - 4, 88 + Math.floor(Math.random() * 5));

  // Dynamic "Why this matches you" reasons matching the user's specific answers
  const matchedReasons = [];

  selectedOptionIds.forEach((choiceId) => {
    if (topProvider.reasonTemplates && topProvider.reasonTemplates[choiceId]) {
      const reasonText = topProvider.reasonTemplates[choiceId];
      if (!matchedReasons.includes(reasonText)) {
        matchedReasons.push(reasonText);
      }
    }
  });

  // If fewer than 3 specific reasons matched, populate with top provider's key features
  if (matchedReasons.length < 3 && topProvider.keyFeatures) {
    topProvider.keyFeatures.forEach((feature) => {
      if (matchedReasons.length < 4 && !matchedReasons.includes(feature)) {
        matchedReasons.push(feature);
      }
    });
  }

  return {
    topMatch: {
      ...topProvider,
      matchPercentage: topMatchPercent,
      reasons: matchedReasons.slice(0, 4),
    },
    runnerUp: {
      ...runnerUp,
      matchPercentage: runnerUpMatchPercent,
    },
  };
}
```
