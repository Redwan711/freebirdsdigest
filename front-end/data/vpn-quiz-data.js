// front-end/data/vpn-quiz-data.js

export const VPN_PROVIDERS = {
  expressvpn: {
    id: "expressvpn",
    name: "ExpressVPN",
    logo: "/images/vpns/expressvpn.png",
    badge: "Best for 4K Streaming",
    rating: "4.9",
    price: "$6.67 / mo",
    billingInfo: "12 months + 3 months free",
    affiliateUrl: "https://www.expressvpn.com",
    scores: {
      streaming: 10.0,
      privacy: 8.0,
      p2p: 9.5,
      gaming: 9.5,
      devices: 6.0,
      security: 9.0,
    },
    keyFeatures: [
      "Lightway protocol for Ultra-HD 4K streaming",
      "High-speed servers in 105 countries",
      "TrustedServer RAM-only architecture",
      "24/7 Live chat support & 30-day money-back guarantee",
    ],
    reasonTemplates: {
      streaming: "ExpressVPN is globally recognized as the top choice for unblocking 4K streaming platforms (Netflix, Hulu, BBC iPlayer).",
      gaming: "Lightway protocol provides low ping latency and stable connections for competitive multiplayer gaming.",
      travel: "Obfuscated servers bypass restrictive hotel, coffee shop, and country Wi-Fi firewalls.",
      simple: "Features an intuitive 1-click Quick Connect app across all desktop and mobile platforms.",
    },
  },
  mullvad: {
    id: "mullvad",
    name: "Mullvad VPN",
    logo: "/images/vpns/mullvad.png",
    badge: "Best for 100% Anonymity",
    rating: "4.8",
    price: "€5.00 / mo",
    billingInfo: "Flat rate • No recurring subscription trap",
    affiliateUrl: "https://mullvad.net",
    scores: {
      streaming: 5.0,
      privacy: 10.0,
      p2p: 9.0,
      gaming: 8.5,
      devices: 5.0,
      security: 9.5,
    },
    keyFeatures: [
      "No email, username, or personal info required (16-digit account ID)",
      "Flat rate €5/month with zero price increases or long contracts",
      "Fully open-source client applications with public security audits",
      "Cash & cryptocurrency payment options supported",
    ],
    reasonTemplates: {
      no_email: "Mullvad requires zero personal information — you sign up with an anonymous 16-digit account code without an email address.",
      flat_rate: "Fixed flat rate of €5/month with no hidden auto-renewals or long-term subscription traps.",
      privacy: "100% open-source software backed by frequent independent third-party security audits.",
      audited_nologs: "Strict, mathematically verified zero-logs policy operating transparently in Sweden.",
    },
  },
  nordvpn: {
    id: "nordvpn",
    name: "NordVPN",
    logo: "/images/vpns/nordvpn.png",
    badge: "Best All-Rounder & Security",
    rating: "4.9",
    price: "$3.09 / mo",
    billingInfo: "2-year plan + 3 extra months",
    affiliateUrl: "https://nordvpn.com",
    scores: {
      streaming: 9.5,
      privacy: 9.0,
      p2p: 9.5,
      gaming: 10.0,
      devices: 6.0,
      security: 10.0,
    },
    keyFeatures: [
      "NordLynx ultra-fast proprietary protocol (6,300+ servers)",
      "Built-in Threat Protection (blocks ads, malware & web trackers)",
      "Double VPN encryption & Meshnet private network sharing",
      "P2P-optimized dedicated torrenting servers",
    ],
    reasonTemplates: {
      gaming: "NordLynx protocol delivers ultra-fast speed benchmarks and low latency for gaming.",
      malware_blocker: "Built-in Threat Protection automatically blocks malicious ads, web trackers, and unsafe downloads.",
      p2p: "Dedicated P2P-optimized server network ensures maximum download speeds for torrenting.",
      advanced: "Includes advanced power-user features like Double VPN, Kill Switch, and Meshnet routing.",
    },
  },
  protonvpn: {
    id: "protonvpn",
    name: "Proton VPN",
    logo: "/images/vpns/protonvpn.png",
    badge: "Best Swiss Privacy & Free Option",
    rating: "4.7",
    price: "Free Tier / €4.99 mo",
    billingInfo: "Unlimited Free Plan available",
    affiliateUrl: "https://protonvpn.com",
    scores: {
      streaming: 8.0,
      privacy: 9.5,
      p2p: 8.5,
      gaming: 8.0,
      devices: 6.0,
      security: 9.5,
    },
    keyFeatures: [
      "Headquartered in Switzerland (protected by strict Swiss privacy laws)",
      "Truly unlimited 100% Free Plan with no data caps",
      "Secure Core double-hop architecture routing traffic through privacy-friendly nations",
      "Created by CERN scientists with open-source audited code",
    ],
    reasonTemplates: {
      free_tier: "Proton VPN offers a genuine 100% Free Plan with unlimited bandwidth and zero data limits.",
      swiss: "Headquartered in Switzerland and protected by the strongest privacy legislation in the world.",
      privacy: "Developed by CERN scientists with 100% open-source apps and published security audits.",
      audited_nologs: "Independently audited zero-logs policy under Swiss jurisdiction outside 14-Eyes surveillance.",
    },
  },
  surfshark: {
    id: "surfshark",
    name: "Surfshark",
    logo: "/images/vpns/surfshark.png",
    badge: "Best for Unlimited Devices",
    rating: "4.8",
    price: "$2.19 / mo",
    billingInfo: "2-year deal • Unlimited connections",
    affiliateUrl: "https://surfshark.com",
    scores: {
      streaming: 9.0,
      privacy: 8.0,
      p2p: 8.5,
      gaming: 8.5,
      devices: 10.0,
      security: 8.5,
    },
    keyFeatures: [
      "Unlimited simultaneous device connections on a single account",
      "CleanWeb feature blocks ads, pop-ups, and phishing attempts",
      "Camouflage Mode (obfuscation) and Bypasser (split-tunneling)",
      "Unbeatable budget value starting at just $2.19/month",
    ],
    reasonTemplates: {
      unlimited_devices: "Allows unlimited simultaneous device connections under a single subscription for your entire family.",
      budget_longterm: "Delivers unbeatable long-term pricing value starting as low as $2.19/month.",
      streaming: "Reliably unblocks 30+ regional streaming services with fast WireGuard speeds.",
      malware_blocker: "CleanWeb suite blocks intrusive ads, cookies, and malware attempts automatically.",
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
        description: "Unblock regional content on Netflix, Hulu, BBC iPlayer, Disney+",
      },
      {
        id: "privacy",
        label: "Maximum Privacy & Hidden IP",
        icon: "🛡️",
        description: "Prevent ISPs, advertisers, and governments from tracking you",
      },
      {
        id: "p2p",
        label: "Torrenting & P2P File Sharing",
        icon: "📥",
        description: "Fast, safe torrenting with high bandwidth and security",
      },
      {
        id: "gaming",
        label: "Gaming & Low Latency Ping",
        icon: "🎮",
        description: "Low latency, DDoS protection, fast multiplayer connections",
      },
      {
        id: "travel",
        label: "Public Wi-Fi & Travel Security",
        icon: "✈️",
        description: "Encrypt connections on airport, hotel, and cafe Wi-Fi",
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
        description: "Just your personal smartphone or primary laptop",
      },
      {
        id: "few_devices",
        label: "3-5 Devices",
        icon: "💻",
        description: "Phone, laptop, tablet, and smart TV",
      },
      {
        id: "unlimited_devices",
        label: "Unlimited Household Devices (6+)",
        icon: "🏠",
        description: "Protect all devices across your entire family & home network",
      },
    ],
  },
  {
    id: "q3",
    title: "What is your budget & subscription preference?",
    subtitle: "Select your preferred payment structure.",
    multiSelect: false,
    options: [
      {
        id: "free_tier",
        label: "100% Free Plan Option Needed",
        icon: "🆓",
        description: "I need a genuine zero-cost plan with unlimited data",
      },
      {
        id: "flat_rate",
        label: "Flat Monthly Rate (No Contract)",
        icon: "💶",
        description: "Pay month-to-month (€5/mo) without subscription traps",
      },
      {
        id: "budget_longterm",
        label: "Best Value Long-Term Discount Plan",
        icon: "🏷️",
        description: "Lowest monthly cost on 2-year plans ($2-$3/mo)",
      },
      {
        id: "premium",
        label: "Best Performance (Price does not matter)",
        icon: "💎",
        description: "Top speeds & features regardless of subscription cost",
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
        id: "no_email",
        label: "No Email or Personal Info Required",
        icon: "🔒",
        description: "Sign up 100% anonymously with a random account number",
      },
      {
        id: "swiss",
        label: "Swiss Jurisdiction (Outside 14-Eyes)",
        icon: "🇨🇭",
        description: "Protected by strict Swiss privacy laws",
      },
      {
        id: "audited_nologs",
        label: "Independently Audited Zero-Logs Policy",
        icon: "🔍",
        description: "Verified by third-party security audits",
      },
      {
        id: "malware_blocker",
        label: "Built-in Ad, Malware & Tracker Blocker",
        icon: "🛡️",
        description: "Block intrusive ads and malicious sites automatically",
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
        label: "Simple 1-Click App",
        icon: "⚡",
        description: "Just press Quick Connect and start browsing safely",
      },
      {
        id: "advanced",
        label: "Advanced Power-User Controls",
        icon: "🛠️",
        description: "Custom protocols, kill switches, split tunneling, and double VPN",
      },
    ],
  },
];

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
    expressvpn: 0,
    mullvad: 0,
    nordvpn: 0,
    protonvpn: 0,
    surfshark: 0,
  };

  // Base scoring from criteria
  if (selectedOptionIds.includes("streaming")) {
    scores.expressvpn += 15;
    scores.nordvpn += 13;
    scores.surfshark += 12;
    scores.protonvpn += 9;
    scores.mullvad += 4;
  }

  if (selectedOptionIds.includes("privacy")) {
    scores.mullvad += 15;
    scores.protonvpn += 14;
    scores.nordvpn += 12;
    scores.expressvpn += 10;
    scores.surfshark += 10;
  }

  if (selectedOptionIds.includes("p2p")) {
    scores.nordvpn += 12;
    scores.expressvpn += 12;
    scores.mullvad += 11;
    scores.surfshark += 10;
    scores.protonvpn += 9;
  }

  if (selectedOptionIds.includes("gaming")) {
    scores.nordvpn += 15;
    scores.expressvpn += 14;
    scores.surfshark += 11;
    scores.mullvad += 10;
    scores.protonvpn += 9;
  }

  if (selectedOptionIds.includes("travel")) {
    scores.expressvpn += 12;
    scores.nordvpn += 11;
    scores.surfshark += 10;
    scores.protonvpn += 9;
    scores.mullvad += 8;
  }

  // Question 2: Device Count
  if (selectedOptionIds.includes("unlimited_devices")) {
    scores.surfshark += 35; // Major boost for Surfshark
  } else if (selectedOptionIds.includes("few_devices")) {
    scores.surfshark += 5;
    scores.nordvpn += 5;
    scores.expressvpn += 5;
    scores.protonvpn += 5;
  }

  // Question 3: Pricing
  if (selectedOptionIds.includes("free_tier")) {
    scores.protonvpn += 45; // Massive boost for Proton VPN free plan
  }
  if (selectedOptionIds.includes("flat_rate")) {
    scores.mullvad += 40; // Massive boost for Mullvad flat €5 rate
  }
  if (selectedOptionIds.includes("budget_longterm")) {
    scores.surfshark += 15;
    scores.nordvpn += 12;
  }
  if (selectedOptionIds.includes("premium")) {
    scores.expressvpn += 15;
    scores.nordvpn += 12;
  }

  // Question 4: Technical Features
  if (selectedOptionIds.includes("no_email")) {
    scores.mullvad += 45; // Major boost for Mullvad no-email sign-up
  }
  if (selectedOptionIds.includes("swiss")) {
    scores.protonvpn += 40; // Major boost for Proton VPN Swiss jurisdiction
  }
  if (selectedOptionIds.includes("audited_nologs")) {
    scores.mullvad += 10;
    scores.protonvpn += 10;
    scores.nordvpn += 10;
    scores.expressvpn += 10;
  }
  if (selectedOptionIds.includes("malware_blocker")) {
    scores.nordvpn += 12;
    scores.surfshark += 12;
  }

  // Question 5: Experience
  if (selectedOptionIds.includes("simple")) {
    scores.expressvpn += 8;
    scores.surfshark += 7;
  }
  if (selectedOptionIds.includes("advanced")) {
    scores.nordvpn += 8;
    scores.mullvad += 8;
    scores.protonvpn += 8;
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
  const runnerUpMatchPercent = Math.min(topMatchPercent - 4, Math.max(78, Math.round((scores[runnerUpId] / maxScore) * 95)));

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
