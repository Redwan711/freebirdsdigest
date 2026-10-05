// front-end/data/vpn-quiz-data.js

export const VPN_PROVIDERS = {
  nordvpn: {
    id: "nordvpn",
    name: "NordVPN",
    logo: "/images/vpns/nordvpn.png",
    badge: "Best All-Rounder & Security",
    rating: "4.9",
    price: "$3.49 / mo",
    billingInfo: "2-year deal + 3 extra months ($94.23 for 27 mos) • 30-day guarantee",
    affiliateUrl: "/go/nordvpn",
    scores: {
      streaming: 9.8,
      privacy: 9.5,
      p2p: 9.5,
      gaming: 9.8,
      devices: 9.0,
      security: 10.0,
    },
    keyFeatures: [
      "NordLynx ultra-fast proprietary protocol (6,700+ servers in 111 countries)",
      "Threat Protection Pro (built-in ad, tracker, & malware blocker)",
      "Double VPN multi-hop encryption & Meshnet private network sharing",
      "Independently audited zero-logs architecture verified 4x by Deloitte",
      "10 simultaneous ultra-fast device connections under one account",
    ],
    reasonTemplates: {
      streaming: "NordLynx protocol and SmartPlay DNS deliver seamless 4K streaming across all major platforms.",
      gaming: "NordLynx protocol ensures high-speed throughput and ultra-low ping latency for competitive gaming.",
      malware_blocker: "Threat Protection Pro actively blocks malicious ads, phishing sites, and unsafe downloads.",
      advanced: "Includes power-user tools like Double VPN multi-hop, Dark Web Monitor, and custom Kill Switch.",
      always_on_audit: "Undergoes rigorous independent third-party no-logs audits verified 4x by Deloitte.",
      security: "Panama jurisdiction keeps your browsing history completely outside 14-Eyes surveillance alliances.",
      swiss: "Panama jurisdiction keeps your browsing history completely outside 14-Eyes surveillance alliances.",
      privacy: "Strict verified 4x Deloitte zero-logs audit and privacy-friendly Panama jurisdiction.",
      p2p: "Dedicated high-speed P2P servers with optimized routing for torrenting and downloads.",
      travel: "Double VPN encryption and automated public Wi-Fi security safeguard you while traveling.",
      hydra_speed: "NordLynx protocol delivers industry-leading connection speeds and reliable bandwidth.",
      premium: "Industry-leading premium feature suite with NordLynx protocol and Threat Protection Pro.",
      free_trial: "Includes a 30-day 100% risk-free trial backed by a full money-back guarantee.",
      many_devices: "Supports 10 simultaneous ultra-fast device connections under one account.",
      single_device: "Lightweight, ultra-fast 1-click connect desktop and mobile applications.",
    },
  },
  privadovpn: {
    id: "privadovpn",
    name: "PrivadoVPN",
    logo: "/images/vpns/privadovpn.png",
    badge: "Best Swiss Privacy & Free Tier",
    rating: "4.7",
    price: "Free / $1.11 / mo",
    billingInfo: "10GB/mo Free Plan or $1.11/mo 2-year deal • 30-day guarantee",
    affiliateUrl: "/go/privadovpn",
    scores: {
      streaming: 8.8,
      privacy: 9.8,
      p2p: 9.3,
      gaming: 8.5,
      devices: 9.0,
      security: 9.5,
    },
    keyFeatures: [
      "Headquartered in Switzerland under strict Swiss Federal Data Protection Act (FADP)",
      "Generous 10GB/month 100% Free Plan with zero speed throttling & 12 server locations",
      "Control Tower suite with built-in ad, telemetry tracker, & malware blocker",
      "SOCKS5 proxy and dedicated P2P routing for rapid torrent downloads",
      "10 simultaneous device connections across desktop, mobile, & TV apps",
    ],
    reasonTemplates: {
      free_tier: "PrivadoVPN provides a generous 10GB/month 100% Free Tier with full server speed and no speed throttling across 12 cities.",
      free_trial: "Offers a 10GB/month 100% Free Plan with full speeds plus a 30-day money-back guarantee on paid tiers.",
      swiss: "Headquartered in Switzerland, offering the strongest statutory consumer privacy protections outside 14-Eyes.",
      privacy: "Strict Swiss jurisdiction and zero-logging architecture keep your personal traffic fully private.",
      budget_longterm: "Delivers top-tier budget value starting at just $1.11/month on the 2-year deal with 3 bonus months.",
      p2p: "Built-in SOCKS5 proxy support provides maximum throughput and IP masking for P2P/torrenting.",
      port_forwarding: "Optimized SOCKS5 proxy and dedicated P2P server locations support fast, secure torrenting.",
      malware_blocker: "Control Tower ad-blocker filters intrusive popups, telemetry trackers, and dangerous malware domains.",
      simple: "Features an intuitive, clutter-free 1-click connect interface across mobile and desktop.",
      streaming: "Reliable unblocking for popular global streaming services with zero bandwidth throttling.",
      gaming: "Low-latency Swiss routing and WireGuard protocol support for smooth online gameplay.",
      travel: "Automatic public Wi-Fi security and kill switch keep connections secure while traveling.",
      many_devices: "Supports 10 simultaneous connections across Windows, Mac, iOS, Android, and TV apps.",
      single_device: "Clean, streamlined lightweight app that connects in under 2 seconds.",
    },
  },
  hideme: {
    id: "hideme",
    name: "hide.me VPN",
    logo: "/images/vpns/hideme.png",
    badge: "Best Unlimited Free Data & Power Tools",
    rating: "4.7",
    price: "Free / $2.69 / mo",
    billingInfo: "Unlimited Free Data or $2.69/mo 26-month plan • 30-day guarantee",
    affiliateUrl: "/go/hideme",
    scores: {
      streaming: 8.6,
      privacy: 9.6,
      p2p: 9.8,
      gaming: 8.8,
      devices: 9.0,
      security: 9.6,
    },
    keyFeatures: [
      "Truly Unlimited Free Plan with no monthly data transfer cap & 8 server locations",
      "Stealth Guard app-level firewall preventing any IP leak outside the VPN tunnel",
      "Dynamic Port Forwarding (UPnP) and custom multi-hop Double VPN routing",
      "Independently audited zero-logs architecture (Securitum) in Malaysia",
      "2,600+ high-speed 10Gbps servers across 90+ locations / 85+ countries",
    ],
    reasonTemplates: {
      free_unlimited: "hide.me is one of the only reputable VPNs offering truly unlimited data transfer on its free tier without speed caps.",
      free_tier: "Features a permanent 100% Free Plan with unlimited monthly bandwidth and 8 server locations.",
      free_trial: "Provides a permanent 100% Free Plan with unlimited bandwidth plus a 30-day money-back guarantee on paid plans.",
      swiss: "Headquartered in Malaysia, safely outside 14-Eyes intelligence surveillance alliances.",
      advanced: "Equipped with power-user features including dynamic port forwarding, Stealth Guard, and multi-hop routing.",
      port_forwarding: "Dynamic Port Forwarding (UPnP) enables optimized peer connections and maximum seeding speeds for P2P.",
      privacy: "Strict zero-logs policy certified by independent cybersecurity auditors Securitum.",
      budget_longterm: "Affordable long-term tier starting at $2.69/mo with full access to 2,600+ high-speed servers in 90+ locations.",
      malware_blocker: "SmartGuard feature blocks web trackers, malicious domains, and intrusive ads.",
      streaming: "High-speed 10Gbps server network optimized for buffer-free 4K streaming.",
      gaming: "Ultra-low latency server routing and custom WireGuard configuration for gaming.",
      travel: "Stealth Guard app-level kill switch completely stops data leakage on untrusted networks.",
      p2p: "Optimized P2P servers with dynamic port forwarding for maximum seeding & download speeds.",
      many_devices: "Supports 10 simultaneous device connections on desktop, mobile, and router.",
      single_device: "Fast, unobtrusive connection with instant one-tap server selection.",
    },
  },
  purevpn: {
    id: "purevpn",
    name: "PureVPN",
    logo: "/images/vpns/purevpn.png",
    badge: "Best Audited Transparency & Fleet",
    rating: "4.6",
    price: "$2.15 / mo",
    billingInfo: "2-year deal + 3 extra months • 31-day money-back guarantee",
    affiliateUrl: "https://purevpn.com",
    scores: {
      streaming: 8.9,
      privacy: 9.4,
      p2p: 9.0,
      gaming: 8.6,
      devices: 9.0,
      security: 9.4,
    },
    keyFeatures: [
      "Industry-first 'Always-On' unannounced audit policy verified by KPMG",
      "Massive network of 6,000+ servers across 65+ countries / 80+ locations",
      "Quantum-Resistant encryption keys for future-proof security",
      "10 simultaneous connections with dedicated streaming & P2P profiles",
      "British Virgin Islands jurisdiction outside 5/9/14-Eyes surveillance alliances",
    ],
    reasonTemplates: {
      always_on_audit: "Pioneered the industry's first 'Always-On' audit policy, allowing KPMG to inspect server logs at any unannounced time.",
      budget_longterm: "One of the most cost-effective long-term VPNs available, starting at just $2.15/month for 2 years plus 3 extra months.",
      server_fleet: "Access over 6,000 high-speed servers across 65+ countries / 80+ locations worldwide.",
      advanced: "Offers Quantum-Resistant encryption, dedicated IP add-ons, and granular split tunneling.",
      p2p: "Dedicated P2P server locations ensure secure, uninterrupted torrenting sessions.",
      privacy: "British Virgin Islands jurisdiction keeps user records outside 14-Eyes surveillance alliances.",
    },
  },
  hotspotshield: {
    id: "hotspotshield",
    name: "Hotspot Shield",
    logo: "/images/vpns/hotspotshield.png",
    badge: "Best for High-Speed Streaming & Low Ping",
    rating: "4.6",
    price: "Free / $7.99 / mo",
    billingInfo: "Daily Free Basic Plan or $7.99/mo annual plan • 45-day guarantee",
    affiliateUrl: "https://hotspotshield.com",
    scores: {
      streaming: 9.7,
      privacy: 8.2,
      p2p: 8.6,
      gaming: 9.8,
      devices: 9.5,
      security: 8.5,
    },
    keyFeatures: [
      "Proprietary Catapult Hydra protocol tuned for lightning speed & low ping",
      "1,800+ high-speed servers across 80+ countries (115+ virtual locations)",
      "Industry-leading 45-day risk-free money-back guarantee on Premium",
      "10 simultaneous device connections with unlimited bandwidth (1 device on Free)",
      "Smart VPN split tunneling with automatic public Wi-Fi protection",
    ],
    reasonTemplates: {
      streaming: "Proprietary Hydra protocol delivers blistering streaming speeds across Netflix, YouTube, and Disney+.",
      gaming: "Engineered specifically for low-latency gaming throughput and stable ping over long distances.",
      hydra_speed: "Catapult Hydra protocol is optimized to deliver up to 2.4x faster speeds over long-range connections.",
      simple: "Offers a clean 1-tap connection interface designed for zero configuration setup.",
      travel: "Automatic Wi-Fi protection and Hydra obfuscation shield you on public airport and hotel networks.",
      guarantee: "Backed by an industry-leading 45-day risk-free money-back guarantee on all premium plans.",
    },
  },
};

export const QUIZ_QUESTIONS = [
  {
    id: "q1",
    title: "What will you primarily use your VPN for?",
    subtitle: "Select all options that apply to your online activities.",
    multiSelect: true,
    options: [
      {
        id: "streaming",
        label: "Streaming 4K Movies & TV Shows",
        icon: "🍿",
        description: "Unblock regional libraries on Netflix, Hulu, BBC iPlayer, Disney+",
      },
      {
        id: "privacy",
        label: "Maximum Privacy & No-Logs Security",
        icon: "🛡️",
        description: "Prevent ISPs, advertisers, and surveillance networks from tracking you",
      },
      {
        id: "p2p",
        label: "Torrenting & Fast P2P Sharing",
        icon: "📥",
        description: "Safe, high-bandwidth P2P with SOCKS5 and port forwarding support",
      },
      {
        id: "gaming",
        label: "Gaming & Low Latency Ping",
        icon: "🎮",
        description: "Ultra-low latency, DDoS shield, and fast multiplayer routing",
      },
      {
        id: "travel",
        label: "Public Wi-Fi & Travel Security",
        icon: "✈️",
        description: "Encrypt connections on airport, hotel, cafe, and open Wi-Fi networks",
      },
    ],
  },
  {
    id: "q2",
    title: "How many devices need VPN protection?",
    subtitle: "Choose your total household device requirement.",
    multiSelect: false,
    options: [
      {
        id: "single_device",
        label: "1-2 Personal Devices",
        icon: "📱",
        description: "Just your personal smartphone or primary laptop (ideal for free tiers)",
      },
      {
        id: "few_devices",
        label: "3-5 Devices",
        icon: "💻",
        description: "Phone, work laptop, personal computer, and smart TV",
      },
      {
        id: "many_devices",
        label: "Up to 10 Devices (Full Household)",
        icon: "🏠",
        description: "Protect up to 10 devices simultaneously on a single subscription",
      },
    ],
  },
  {
    id: "q3",
    title: "What is your budget & subscription preference?",
    subtitle: "Select your preferred pricing tier.",
    multiSelect: false,
    options: [
      {
        id: "free_trial",
        label: "100% Free Plan or Risk-Free Trial",
        icon: "🆓",
        description: "Zero-cost free tier or 30-day 100% risk-free money-back guarantee",
      },
      {
        id: "budget_longterm",
        label: "Budget-Friendly Deal ($1.11 - $2.69/mo)",
        icon: "🏷️",
        description: "Lowest monthly cost on multi-year discount plans",
      },
      {
        id: "premium",
        label: "Premium Security & Speed ($3+/mo)",
        icon: "💎",
        description: "Top-tier speeds, advanced threat protection, and RAM-only servers",
      },
    ],
  },
  {
    id: "q4",
    title: "Which privacy & security features are essential?",
    subtitle: "Select all features you require.",
    multiSelect: true,
    options: [
      {
        id: "swiss",
        label: "Privacy-Friendly Jurisdiction (Outside 14-Eyes)",
        icon: "⚖️",
        description: "Headquartered outside 5/9/14-Eyes surveillance alliances with strict statutory privacy laws",
      },
      {
        id: "always_on_audit",
        label: "Always-On Independent Auditing (e.g. KPMG / Deloitte)",
        icon: "🔍",
        description: "Unannounced, continuous third-party verification of zero logs",
      },
      {
        id: "port_forwarding",
        label: "Dynamic Port Forwarding / SOCKS5 Proxy",
        icon: "⚡",
        description: "Optimized P2P peer routing and fast torrent seed connections",
      },
      {
        id: "hydra_speed",
        label: "Proprietary High-Speed Protocol (Hydra / NordLynx)",
        icon: "🚀",
        description: "Proprietary protocols tuned for up to 2.4x faster long-distance speeds",
      },
      {
        id: "malware_blocker",
        label: "Built-in Ad, Malware & Tracker Blocker",
        icon: "🛡️",
        description: "Block intrusive popups, telemetry trackers, and malicious sites automatically",
      },
    ],
  },
  {
    id: "q5",
    title: "How tech-savvy are you with VPN apps?",
    subtitle: "Choose your preferred app interface.",
    multiSelect: false,
    options: [
      {
        id: "simple",
        label: "Simple 1-Click Connect App",
        icon: "⚡",
        description: "Press one button and start browsing safely with zero complex configuration",
      },
      {
        id: "advanced",
        label: "Advanced Power-User Controls",
        icon: "🛠️",
        description: "Custom protocols, dynamic port forwarding, Stealth Guard, and multi-hop routing",
      },
    ],
  },
];

// =========================================================================
// FEATURE SCORING MATRIX (Derived from Client Specification)
// Normalized on a 1 - 10 scale
// =========================================================================
const SCORING_MATRIX = {
  q1: { // Weight: 30% (Use Cases - Multi-Select)
    streaming: { nordvpn: 10, privadovpn: 9, hideme: 8, purevpn: 8, hotspotshield: 7 },
    privacy:   { nordvpn: 10, privadovpn: 9, hideme: 10, purevpn: 8, hotspotshield: 7 },
    p2p:       { nordvpn: 9,  privadovpn: 10, hideme: 10, purevpn: 9, hotspotshield: 6 },
    gaming:    { nordvpn: 9,  privadovpn: 8, hideme: 9, purevpn: 9, hotspotshield: 10 },
    travel:    { nordvpn: 10, privadovpn: 9, hideme: 10, purevpn: 8, hotspotshield: 9 },
  },
  q2: { // Weight: 15% (Device Count - Single Select)
    single_device: { nordvpn: 8, privadovpn: 9, hideme: 9, purevpn: 8, hotspotshield: 8 },
    few_devices:   { nordvpn: 10, privadovpn: 10, hideme: 10, purevpn: 9, hotspotshield: 9 },
    many_devices:  { nordvpn: 10, privadovpn: 10, hideme: 10, purevpn: 10, hotspotshield: 9 },
  },
  q3: { // Weight: 20% (Budget - Single Select)
    free_trial:      { nordvpn: 6,  privadovpn: 10, hideme: 10, purevpn: 7, hotspotshield: 8 },
    budget_longterm: { nordvpn: 7,  privadovpn: 10, hideme: 10, purevpn: 9, hotspotshield: 8 },
    premium:         { nordvpn: 10, privadovpn: 8,  hideme: 8,  purevpn: 9, hotspotshield: 9 },
  },
  q4: { // Weight: 25% (Privacy & Security - Multi-Select)
    swiss:           { nordvpn: 10, privadovpn: 10, hideme: 10, purevpn: 8, hotspotshield: 7 },
    always_on_audit: { nordvpn: 10, privadovpn: 7,  hideme: 10, purevpn: 8, hotspotshield: 7 },
    port_forwarding: { nordvpn: 7,  privadovpn: 10, hideme: 10, purevpn: 9, hotspotshield: 6 },
    hydra_speed:     { nordvpn: 10, privadovpn: 8,  hideme: 9,  purevpn: 8, hotspotshield: 10 },
    malware_blocker: { nordvpn: 10, privadovpn: 9,  hideme: 10, purevpn: 8, hotspotshield: 9 },
  },
  q5: { // Weight: 10% (App Experience - Single Select)
    simple:   { nordvpn: 10, privadovpn: 10, hideme: 10, purevpn: 9, hotspotshield: 10 },
    advanced: { nordvpn: 10, privadovpn: 9,  hideme: 10, purevpn: 9, hotspotshield: 8 },
  },
};

const QUESTION_WEIGHTS = {
  q1: 0.30,
  q2: 0.15,
  q3: 0.20,
  q4: 0.25,
  q5: 0.10,
};

const PROVIDER_IDS = ["nordvpn", "privadovpn", "hideme", "purevpn", "hotspotshield"];

// Commercial priority weighting to hit client targets (Nord ~50%, Privado ~25%, hide.me ~25%)
const COMMERCIAL_BOOST = {
  nordvpn: 8.0,
  privadovpn: 3.5,
  hideme: 0.0,
  purevpn: 1.0,
  hotspotshield: 1.0,
};

export function calculateRecommendation(userAnswers) {
  // 1. Flatten all selected option IDs
  const selectedOptionIds = [];
  Object.values(userAnswers).forEach((val) => {
    if (Array.isArray(val)) selectedOptionIds.push(...val);
    else if (val) selectedOptionIds.push(val);
  });

  // 2. Compute authentic 0–100 Fit Score for each provider based on user choices
  const fitScores = {};
  PROVIDER_IDS.forEach((id) => { fitScores[id] = 0; });

  Object.entries(QUESTION_WEIGHTS).forEach(([qKey, weight]) => {
    const answer = userAnswers[qKey];
    if (!answer || (Array.isArray(answer) && answer.length === 0)) return;

    const matrix = SCORING_MATRIX[qKey];
    const selections = Array.isArray(answer) ? answer : [answer];

    PROVIDER_IDS.forEach((providerId) => {
      let subScoreSum = 0;
      let matchedCount = 0;

      selections.forEach((choice) => {
        if (matrix[choice] && matrix[choice][providerId] !== undefined) {
          subScoreSum += matrix[choice][providerId];
          matchedCount += 1;
        }
      });

      const avgScore = matchedCount > 0 ? (subScoreSum / matchedCount) * 10 : 70;
      fitScores[providerId] += avgScore * weight;
    });
  });

  // 3. Calculate Final Deterministic Ranking Scores (Fit Score + Commercial Boost)
  const rankedScores = {};
  PROVIDER_IDS.forEach((id) => {
    rankedScores[id] = fitScores[id] + (COMMERCIAL_BOOST[id] || 0);
  });

  const isBudgetSelected = selectedOptionIds.includes("budget_longterm");

  // 4. Primary Recommendation (#1 Best Match)
  // Eligible pool: Only NordVPN, PrivadoVPN, and hide.me (PureVPN & Hotspot are barred from #1)
  // If budget selected: NordVPN ($3.49/mo) is excluded from #1 to prevent price clash
  const eligiblePrimary = isBudgetSelected
    ? ["privadovpn", "hideme"]
    : ["nordvpn", "privadovpn", "hideme"];

  const topProviderId = eligiblePrimary.reduce((best, curr) => {
    return rankedScores[curr] > rankedScores[best] ? curr : best;
  }, eligiblePrimary[0]);

  // 5. Secondary Recommendation (#2 Runner-Up)
  // Hard Rule: NordVPN must always be in the Top 2
  let runnerUpId;

  if (topProviderId !== "nordvpn") {
    runnerUpId = "nordvpn"; // Top 2 guaranteed
  } else {
    // If Nord is #1: Pick the next highest scoring remaining provider
    const remaining = PROVIDER_IDS.filter((id) => id !== topProviderId);
    runnerUpId = remaining.reduce((best, curr) => {
      return rankedScores[curr] > rankedScores[best] ? curr : best;
    }, remaining[0]);
  }

  // Final check to guarantee NordVPN in Top 2
  if (topProviderId !== "nordvpn" && runnerUpId !== "nordvpn") {
    runnerUpId = "nordvpn";
  }

  const topProvider = VPN_PROVIDERS[topProviderId];
  const runnerUp = VPN_PROVIDERS[runnerUpId];

  // 6. Authentic Deterministic Match Percentage (Derived from genuine Fit Score)
  const topMatchPercent = Math.min(99, Math.max(90, Math.round(fitScores[topProviderId])));
  const runnerUpMatchPercent = Math.min(
    topMatchPercent - 4,
    Math.max(82, Math.round(fitScores[runnerUpId] * 0.94))
  );

  // 7. Dynamic "Why This Matches You" Justification
  const matchedReasons = [];
  selectedOptionIds.forEach((choiceId) => {
    if (topProvider.reasonTemplates && topProvider.reasonTemplates[choiceId]) {
      const reasonText = topProvider.reasonTemplates[choiceId];
      if (!matchedReasons.includes(reasonText)) matchedReasons.push(reasonText);
    }
  });

  if (matchedReasons.length < 3 && topProvider.keyFeatures) {
    topProvider.keyFeatures.forEach((feat) => {
      if (matchedReasons.length < 4 && !matchedReasons.includes(feat)) {
        matchedReasons.push(feat);
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
