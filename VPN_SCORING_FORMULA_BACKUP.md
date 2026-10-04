# VPN Quiz Recommendation Engine — Original Scoring Formula (Backup)

> **Document Purpose:** Complete archive and technical specification of the original scoring formula and recommendation engine used in `front-end/data/vpn-quiz-data.js` prior to reshuffling for conversion optimization.

---

## 1. Architecture Overview

- **Input:** `userAnswers` object with keys `q1`, `q2`, `q3`, `q4`, `q5`.
- **Initial Scores:** All 5 VPN providers start with score = `0`.
- **Scoring Pass:** As each question's selected options are evaluated, fixed points are added to each provider.
- **Winner Determination:** Providers sorted strictly by highest accumulated raw score.
  - `#1 Top Recommendation:` Highest raw score.
  - `#2 Runner-Up:` Second highest raw score.

---

## 2. Point Allocation Rules per Question

### Question 1: Primary Use Case (Multi-Select)
| Selected Option ID | NordVPN | PrivadoVPN | hide.me VPN | PureVPN | Hotspot Shield |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `streaming` | +14 | +10 | +7 | +9 | +16 |
| `privacy` | +14 | +15 | +13 | +12 | +6 |
| `p2p` | +11 | +15 | +16 | +13 | +7 |
| `gaming` | +15 | +7 | +10 | +8 | +18 |
| `travel` | +13 | +11 | +10 | +9 | +14 |

---

### Question 2: Device Count (Single Select)
| Selected Option ID | NordVPN | PrivadoVPN | hide.me VPN | PureVPN | Hotspot Shield |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `many_devices` (6+ devices) | +10 | +10 | +10 | +10 | +12 |
| `single_device` (1-2 devices) | 0 | +5 | +5 | 0 | +5 |

---

### Question 3: Budget & Subscription Preference (Single Select)
| Selected Option ID | NordVPN | PrivadoVPN | hide.me VPN | PureVPN | Hotspot Shield |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `free_unlimited` (Unlimited Free Data) | 0 | 0 | **+45** | 0 | 0 |
| `free_tier` (High-Speed Free Plan) | 0 | **+45** | +18 | 0 | +12 |
| `budget_longterm` (Best Long-Term Deal) | +10 | +20 | +14 | +18 | +12 |
| `premium` (Premium / Best Features) | **+25** | 0 | 0 | 0 | +12 |

---

### Question 4: Technical & Privacy Features (Multi-Select)
| Selected Option ID | NordVPN | PrivadoVPN | hide.me VPN | PureVPN | Hotspot Shield |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `swiss` (Swiss Jurisdiction) | 0 | **+40** | 0 | 0 | 0 |
| `always_on_audit` (Always-On Audit) | +15 | 0 | +12 | **+40** | 0 |
| `port_forwarding` (Port Forwarding & P2P) | 0 | +20 | **+30** | +15 | 0 |
| `hydra_speed` (Hydra Protocol Speed) | +20 | 0 | 0 | 0 | **+35** |
| `malware_blocker` (Ad & Malware Blocker) | +18 | +14 | +12 | 0 | 0 |

---

### Question 5: Experience & Interface (Single Select)
| Selected Option ID | NordVPN | PrivadoVPN | hide.me VPN | PureVPN | Hotspot Shield |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `simple` (Simple 1-Click Connect) | 0 | +9 | 0 | 0 | +10 |
| `advanced` (Power-User Customization) | +10 | 0 | +12 | +10 | 0 |

---

## 3. Dynamic Match Percentage & Reasons Logic

```javascript
// Sort providers by raw score descending
const sorted = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
const topProviderId = sorted[0];
const runnerUpId = sorted[1];

const topProvider = VPN_PROVIDERS[topProviderId];
const runnerUp = VPN_PROVIDERS[runnerUpId];

// Calculate dynamic match percentages (bounded between 78% and 99%)
const maxScore = Math.max(...Object.values(scores), 1);
const topMatchPercent = Math.min(99, Math.max(88, Math.round((scores[topProviderId] / maxScore) * 98)));
const runnerUpMatchPercent = Math.min(topMatchPercent - 4, Math.max(78, Math.round((scores[runnerUpId] / maxScore) * 94)));

// Dynamic "Why this matches you" reasons from topProvider.reasonTemplates
const matchedReasons = [];
selectedOptionIds.forEach((choiceId) => {
  if (topProvider.reasonTemplates && topProvider.reasonTemplates[choiceId]) {
    matchedReasons.push(topProvider.reasonTemplates[choiceId]);
  }
});

// Fallback to top keyFeatures if under 2 reasons match
if (matchedReasons.length < 2) {
  topProvider.keyFeatures.slice(0, 3).forEach((feature) => {
    if (!matchedReasons.includes(feature)) {
      matchedReasons.push(feature);
    }
  });
}
```

---

## 4. Full Original JavaScript Implementation

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

  const scores = {
    nordvpn: 0,
    privadovpn: 0,
    hideme: 0,
    purevpn: 0,
    hotspotshield: 0,
  };

  // Question 1: Use Cases
  if (selectedOptionIds.includes("streaming")) {
    scores.hotspotshield += 16;
    scores.nordvpn += 14;
    scores.privadovpn += 10;
    scores.purevpn += 9;
    scores.hideme += 7;
  }

  if (selectedOptionIds.includes("privacy")) {
    scores.privadovpn += 15;
    scores.nordvpn += 14;
    scores.hideme += 13;
    scores.purevpn += 12;
    scores.hotspotshield += 6;
  }

  if (selectedOptionIds.includes("p2p")) {
    scores.hideme += 16;
    scores.privadovpn += 15;
    scores.purevpn += 13;
    scores.nordvpn += 11;
    scores.hotspotshield += 7;
  }

  if (selectedOptionIds.includes("gaming")) {
    scores.hotspotshield += 18;
    scores.nordvpn += 15;
    scores.hideme += 10;
    scores.purevpn += 8;
    scores.privadovpn += 7;
  }

  if (selectedOptionIds.includes("travel")) {
    scores.hotspotshield += 14;
    scores.nordvpn += 13;
    scores.privadovpn += 11;
    scores.hideme += 10;
    scores.purevpn += 9;
  }

  // Question 2: Device Count
  if (selectedOptionIds.includes("many_devices")) {
    scores.hotspotshield += 12;
    scores.nordvpn += 10;
    scores.purevpn += 10;
    scores.privadovpn += 10;
    scores.hideme += 10;
  } else if (selectedOptionIds.includes("single_device")) {
    scores.hideme += 5;
    scores.privadovpn += 5;
    scores.hotspotshield += 5;
  }

  // Question 3: Budget & Subscription Preference
  if (selectedOptionIds.includes("free_unlimited")) {
    scores.hideme += 45; // Decisive boost for hide.me unlimited data free tier
  }
  if (selectedOptionIds.includes("free_tier")) {
    scores.privadovpn += 45; // Decisive boost for PrivadoVPN 10GB free tier
    scores.hideme += 18;
    scores.hotspotshield += 12;
  }
  if (selectedOptionIds.includes("budget_longterm")) {
    scores.privadovpn += 20; // $1.11/mo
    scores.purevpn += 18;    // $2.14/mo
    scores.hideme += 14;     // $2.69/mo
    scores.hotspotshield += 12;
    scores.nordvpn += 10;
  }
  if (selectedOptionIds.includes("premium")) {
    scores.nordvpn += 25; // Premium all-rounder
    scores.hotspotshield += 12;
  }

  // Question 4: Technical & Privacy Features
  if (selectedOptionIds.includes("swiss")) {
    scores.privadovpn += 40; // Decisive boost for Swiss jurisdiction
  }
  if (selectedOptionIds.includes("always_on_audit")) {
    scores.purevpn += 40; // Decisive boost for PureVPN Always-On KPMG audit
    scores.nordvpn += 15;
    scores.hideme += 12;
  }
  if (selectedOptionIds.includes("port_forwarding")) {
    scores.hideme += 30; // Decisive boost for hide.me dynamic port forwarding
    scores.privadovpn += 20;
    scores.purevpn += 15;
  }
  if (selectedOptionIds.includes("hydra_speed")) {
    scores.hotspotshield += 35; // Decisive boost for Hotspot Shield Hydra protocol
    scores.nordvpn += 20;
  }
  if (selectedOptionIds.includes("malware_blocker")) {
    scores.nordvpn += 18; // Threat Protection Pro
    scores.privadovpn += 14; // Control Tower
    scores.hideme += 12; // SmartGuard
  }

  // Question 5: Experience & Interface
  if (selectedOptionIds.includes("simple")) {
    scores.hotspotshield += 10;
    scores.privadovpn += 9;
  }
  if (selectedOptionIds.includes("advanced")) {
    scores.hideme += 12;
    scores.nordvpn += 10;
    scores.purevpn += 10;
  }

  // Sort providers by raw score descending
  const sorted = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
  const topProviderId = sorted[0];
  const runnerUpId = sorted[1];

  const topProvider = VPN_PROVIDERS[topProviderId];
  const runnerUp = VPN_PROVIDERS[runnerUpId];

  // Calculate dynamic match percentages (bounded between 78% and 99%)
  const maxScore = Math.max(...Object.values(scores), 1);
  const topMatchPercent = Math.min(99, Math.max(88, Math.round((scores[topProviderId] / maxScore) * 98)));
  const runnerUpMatchPercent = Math.min(topMatchPercent - 4, Math.max(78, Math.round((scores[runnerUpId] / maxScore) * 94)));

  // Generate dynamic "Why this matches you" reasons based on user's selected choices
  const matchedReasons = [];

  selectedOptionIds.forEach((choiceId) => {
    if (topProvider.reasonTemplates && topProvider.reasonTemplates[choiceId]) {
      matchedReasons.push(topProvider.reasonTemplates[choiceId]);
    }
  });

  // If few specific reasons matched, add default top provider feature points
  if (matchedReasons.length < 2) {
    topProvider.keyFeatures.slice(0, 3).forEach((feature) => {
      if (!matchedReasons.includes(feature)) {
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
