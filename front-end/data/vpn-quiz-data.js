// front-end/data/vpn-quiz-data.js

export const VPN_PROVIDERS = {
  nordvpn: {
    id: "nordvpn",
    name: "NordVPN",
    logo: "/images/vpns/nordvpn.png",
    badge: "Best All-Rounder & Security",
    rating: "4.9",
    price: "$3.09 / mo",
    billingInfo: "2-year deal + 3 extra months",
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
      "NordLynx ultra-fast proprietary protocol (6,400+ servers in 111 countries)",
      "Threat Protection Pro (built-in ad, tracker, & malware blocker)",
      "Double VPN encryption & Meshnet private network sharing",
      "Independently audited zero-logs architecture verified by Deloitte",
    ],
    reasonTemplates: {
      streaming: "NordLynx protocol and SmartPlay DNS deliver seamless 4K streaming across all major platforms.",
      gaming: "NordLynx protocol ensures high-speed throughput and ultra-low ping latency for competitive gaming.",
      malware_blocker: "Threat Protection Pro actively blocks malicious ads, phishing sites, and unsafe downloads.",
      advanced: "Includes power-user tools like Double VPN multi-hop, Dark Web Monitor, and custom Kill Switch.",
      always_on_audit: "Undergoes rigorous independent third-party no-logs audits verified by Deloitte.",
      security: "Panama jurisdiction keeps your browsing history completely outside 14-Eyes surveillance alliances.",
      privacy: "Strict verified Deloitte zero-logs audit and privacy-friendly Panama jurisdiction.",
      p2p: "Dedicated high-speed P2P servers with optimized routing for torrenting and downloads.",
      travel: "Double VPN encryption and automated public Wi-Fi security safeguard you while traveling.",
      hydra_speed: "NordLynx protocol delivers industry-leading connection speeds and reliable bandwidth.",
      premium: "Industry-leading premium feature suite with NordLynx protocol and Threat Protection Pro.",
      budget_longterm: "Exceptional long-term value on 2-year subscriptions including bonus warranty.",
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
    billingInfo: "10GB/mo Free Plan or $1.11/mo 2-year deal",
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
      "Headquartered in Switzerland under strict Swiss Federal Data Protection laws",
      "Generous 10GB/month 100% Free Plan with zero speed throttling",
      "Control Tower suite with built-in ad, tracker, and malicious site blocker",
      "SOCKS5 proxy and dedicated P2P routing for rapid torrent downloads",
    ],
    reasonTemplates: {
      free_tier: "PrivadoVPN provides a generous 10GB/month 100% Free Tier with full server speed and no speed throttling.",
      swiss: "Headquartered in Switzerland, offering the strongest statutory consumer privacy protections outside 14-Eyes.",
      privacy: "Strict Swiss jurisdiction and zero-logging architecture keep your personal traffic fully private.",
      budget_longterm: "Delivers top-tier budget value starting at just $1.11/month on the 2-year plan.",
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
    billingInfo: "Unlimited Free Data or $2.69/mo 2-year plan",
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
      "Truly Unlimited Free Plan with no monthly data transfer cap",
      "Stealth Guard app-level firewall preventing any IP leak outside VPN",
      "Dynamic Port Forwarding and custom multi-hop routing",
      "Independently audited no-logs architecture (Securitum) in Malaysia",
    ],
    reasonTemplates: {
      free_unlimited: "hide.me is one of the only reputable VPNs offering truly unlimited data transfer on its free tier.",
      free_tier: "Features a permanent 100% Free Plan with unlimited monthly bandwidth.",
      advanced: "Equipped with power-user features including dynamic port forwarding, Stealth Guard, and multi-hop routing.",
      port_forwarding: "Dynamic Port Forwarding enables optimized peer connections and maximum seeding speeds for P2P.",
      privacy: "Strict zero-logs policy certified by independent cybersecurity auditors Securitum.",
      budget_longterm: "Affordable long-term tier with full access to 2,600+ high-speed servers in 90+ countries.",
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
    price: "$2.14 / mo",
    billingInfo: "2-year plan • 31-day money-back guarantee",
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
    ],
    reasonTemplates: {
      always_on_audit: "Pioneered the industry's first 'Always-On' audit policy, allowing KPMG to inspect server logs at any unannounced time.",
      budget_longterm: "One of the most cost-effective long-term VPNs available, starting at just $2.14/month.",
      server_fleet: "Access over 6,000 high-speed servers across 65+ countries worldwide.",
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
    price: "Free / $2.99 / mo",
    billingInfo: "Daily Free Plan or $2.99/mo annual plan",
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
      "Specialized streaming and gaming modes for lag-free 4K playback",
      "Generous 45-day money-back guarantee (longest in the industry)",
      "Smart VPN split tunneling with automatic public Wi-Fi protection",
    ],
    reasonTemplates: {
      streaming: "Proprietary Hydra protocol delivers blistering streaming speeds across Netflix, YouTube, and Disney+.",
      gaming: "Engineered specifically for low-latency gaming throughput and stable ping over long distances.",
      hydra_speed: "Catapult Hydra protocol is optimized to deliver up to 2.4x faster speeds over long-range connections.",
      simple: "Offers a clean 1-tap connection interface designed for zero configuration setup.",
      travel: "Automatic Wi-Fi protection and Hydra obfuscation shield you on public airport and hotel networks.",
      guarantee: "Backed by an industry-leading 45-day risk-free money-back guarantee.",
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
        id: "free_unlimited",
        label: "100% Free Plan with Unlimited Data",
        icon: "♾️",
        description: "Zero-cost tier with no monthly bandwidth limits",
      },
      {
        id: "free_tier",
        label: "100% Free Plan with High-Speed Data (10GB/mo)",
        icon: "🆓",
        description: "Zero-cost tier with access to fast global server locations",
      },
      {
        id: "budget_longterm",
        label: "Best Value Long-Term Deal ($1.11 - $2.69/mo)",
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
        label: "Swiss Jurisdiction (Strict Data Privacy Laws)",
        icon: "🇨🇭",
        description: "Protected by strict Swiss Federal Data Protection outside 14-Eyes",
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

  // =========================================================================
  // STEP 1: Determine #1 Top Recommendation
  // Priority Distribution:
  // - NordVPN: 50%
  // - hide.me VPN: 30%
  // - PrivadoVPN: 20%
  // =========================================================================
  const topRoll = Math.random();
  let topProviderId;

  if (topRoll < 0.50) {
    topProviderId = "nordvpn";
  } else if (topRoll < 0.80) {
    topProviderId = "hideme";
  } else {
    topProviderId = "privadovpn";
  }

  // =========================================================================
  // STEP 2: Determine #2 Runner-Up
  // Target Overall Distribution across all quizzes:
  // - NordVPN: 50% (Whenever hide.me or Privado is #1, Nord is ALWAYS runner-up: 30% + 20% = 50%)
  // - hide.me VPN: 15% (30% of Nord's runner-up pool = 15% overall)
  // - PrivadoVPN: 15% (30% of Nord's runner-up pool = 15% overall)
  // - PureVPN: 10% (20% of Nord's runner-up pool = 10% overall)
  // - Hotspot Shield: 10% (20% of Nord's runner-up pool = 10% overall)
  // =========================================================================
  let runnerUpId;

  if (topProviderId === "hideme" || topProviderId === "privadovpn") {
    runnerUpId = "nordvpn";
  } else {
    const runnerRoll = Math.random();
    if (runnerRoll < 0.30) {
      runnerUpId = "hideme";
    } else if (runnerRoll < 0.60) {
      runnerUpId = "privadovpn";
    } else if (runnerRoll < 0.80) {
      runnerUpId = "purevpn";
    } else {
      runnerUpId = "hotspotshield";
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
