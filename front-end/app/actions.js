"use server";

import { headers } from "next/headers";
import { QUIZ_QUESTIONS } from "@/data/vpn-quiz-data";

/**
 * Helper function to send email via Resend HTTP REST API
 * (No external npm package dependency required)
 */
async function sendViaResend({ from, to, subject, reply_to, html }) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(
      "⚠️ RESEND_API_KEY environment variable is missing in process.env.",
    );
    console.log(
      "💡 TIP: Please restart your 'npm run dev' terminal server to reload .env.local!",
    );
    console.log("✅ SIMULATED EMAIL PAYLOAD:", { from, to, subject, reply_to });
    return { id: `simulated_${Date.now()}`, status: "simulated" };
  }

  const sendRequest = async (senderFrom, recipientTo) => {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: senderFrom,
        to: recipientTo,
        subject,
        reply_to,
        html,
      }),
    });
    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
  };

  // Primary delivery attempt
  let result = await sendRequest(from, to);

  // If primary attempt failed due to unverified custom domain or testing limits, attempt smart fallback
  if (!result.ok) {
    const errorMsg = String(
      result.data?.message ||
        result.data?.error?.message ||
        result.data?.name ||
        "",
    );
    console.warn(`⚠️ Resend attempt failed [HTTP ${result.status}]:`, errorMsg);

    let fallbackFrom = from;
    let fallbackTo = to;

    // Fallback to Resend default onboarding sender if custom domain is not yet verified in Resend Dashboard
    if (
      errorMsg.includes("domain") ||
      errorMsg.includes("not verified") ||
      errorMsg.includes("validation_error") ||
      result.status === 403
    ) {
      fallbackFrom = "FreeBirds Digest <onboarding@resend.dev>";
    }

    // Fallback recipient if Resend API key is in testing mode (only allows sending to account owner email)
    if (
      errorMsg.includes("testing mode") ||
      errorMsg.includes("only send to")
    ) {
      fallbackTo = Array.isArray(to) ? [to[to.length - 1]] : to;
    }

    if (fallbackFrom !== from || fallbackTo !== to) {
      console.log("🔄 Retrying Resend with fallback sender/recipient:", {
        fallbackFrom,
        fallbackTo,
      });
      result = await sendRequest(fallbackFrom, fallbackTo);
    }
  }

  if (!result.ok) {
    const finalError =
      result.data?.message ||
      result.data?.error?.message ||
      `Resend Error (Status ${result.status})`;
    console.error("❌ Resend API Final Failure:", finalError);
    throw new Error(finalError);
  }

  console.log("✅ RESEND SUCCESS PAYLOAD:", result.data);
  return result.data;
}

/**
 * Handle Contact Form submission
 */
export async function sendContactEmail(formData) {
  const name = formData.get("userName");
  const email = formData.get("userEmail");
  const phone = formData.get("userPhone");
  const subject = formData.get("subject") || "General Inquiry";
  const message = formData.get("userMessage");

  try {
    const botField = formData.get("company_website_url");

    if (typeof botField === "string" && botField.length > 0) {
      console.log("🤖 Bot blocked by honeypot!");
      return { success: true };
    }

    if (!email || !name || !message) {
      return {
        success: false,
        error: "Name, email, and message are required.",
      };
    }

    const data = await sendViaResend({
      from: "FreeBirds Digest <no-reply@mail.asthacreatives.com>",
      to: ["contact@redmun.com", "shahidul1920shakil@gmail.com"],
      subject: `New Lead: ${name} [${subject}]`,
      reply_to: email,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #0B1220;">
          <h2 style="color: #FF4D2E;">New Contact Request - FreeBirds Digest</h2>
          <hr style="border: 0; border-top: 1px solid #E2E7EF; margin: 15px 0;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Scope/Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.log("❌ RESEND CONTACT CRASHED:", error);
    return {
      success: false,
      error: error.message || "Failed to dispatch email.",
    };
  }
}

/**
 * Handle Request Demo Form submission
 */
export async function sendDemoRequestEmail(formData) {
  const name = formData.get("userName");
  const email = formData.get("userEmail");
  const phone = formData.get("userPhone");
  const company = formData.get("companyName") || "Not provided";
  const productScope = formData.get("productScope") || "General Demo";
  const teamSize = formData.get("teamSize") || "Not specified";
  const message =
    formData.get("userMessage") || "No additional notes provided.";

  try {
    const botField = formData.get("company_website_url");

    if (typeof botField === "string" && botField.length > 0) {
      console.log("🤖 Bot blocked by honeypot!");
      return { success: true };
    }

    if (!email || !name) {
      return { success: false, error: "Name and email are required." };
    }

    const data = await sendViaResend({
      from: "FreeBirds Digest <no-reply@mail.asthacreatives.com>",
      to: ["redwan@redmun.com", "shahidul1920shakil@gmail.com"],
      subject: `🔥 High Priority Demo Request: ${name} (${company})`,
      reply_to: email,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #0B1220;">
          <h2 style="color: #0057FF;">New Demo Scoping Request</h2>
          <hr style="border: 0; border-top: 1px solid #E2E7EF; margin: 15px 0;" />
          <p><strong>Full Name:</strong> ${name}</p>
          <p><strong>Work Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Product Scope:</strong> ${productScope}</p>
          <p><strong>Team Size:</strong> ${teamSize}</p>
          <p><strong>Requirements / Notes:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.log("❌ RESEND DEMO CRASHED:", error);
    return {
      success: false,
      error: error.message || "Failed to record demo request.",
    };
  }
}

/**
 * Handle Footer Newsletter subscription
 */
export async function subscribeNewsletter(formData) {
  const email = formData.get("userEmail");

  try {
    const botField = formData.get("company_website_url");

    if (typeof botField === "string" && botField.length > 0) {
      console.log("🤖 Bot blocked by honeypot!");
      return { success: true };
    }

    if (!email) {
      return { success: false, error: "Email is required." };
    }

    const data = await sendViaResend({
      from: "FreeBirds Digest <no-reply@mail.asthacreatives.com>",
      to: ["redwan@redmun.com", "shahidul1920shakil@gmail.com"],
      subject: `New Newsletter Subscriber: ${email}`,
      reply_to: email,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #0B1220;">
          <h2>New Newsletter Subscription - FreeBirds Digest</h2>
          <p><strong>Email:</strong> ${email}</p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.log("❌ RESEND NEWSLETTER CRASHED:", error);
    return { success: false, error: error.message || "Subscription failed." };
  }
}

/**
 * Handle Pitch Proposal submission (Contribute Page)
 */
export async function sendContributePitchEmail(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const portfolio = formData.get("portfolio") || "Not provided";
  const category = formData.get("category") || "General Pitch";
  const title = formData.get("title");
  const pitch = formData.get("pitch");

  try {
    const botField = formData.get("company_website_url");

    if (typeof botField === "string" && botField.length > 0) {
      console.log("🤖 Bot blocked by honeypot!");
      return { success: true };
    }

    if (!email || !name || !title || !pitch) {
      return {
        success: false,
        error: "Name, email, title, and pitch summary are required.",
      };
    }

    const data = await sendViaResend({
      from: "FreeBirds Digest <no-reply@mail.asthacreatives.com>",
      to: ["redwan@redmun.com", "shahidul1920shakil@gmail.com"],
      subject: `✍️ New Pitch Proposal: "${title}" by ${name}`,
      reply_to: email,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #0B1220;">
          <h2 style="color: #FF4D2E;">New Contributor Pitch Proposal - FreeBirds Digest</h2>
          <hr style="border: 0; border-top: 1px solid #E2E7EF; margin: 15px 0;" />
          <p><strong>Contributor Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Portfolio / Profile:</strong> ${portfolio}</p>
          <p><strong>Target Category:</strong> ${category}</p>
          <p><strong>Proposed Title:</strong> ${title}</p>
          <p><strong>Pitch Summary & Key Takeaways:</strong><br/>${pitch.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.log("❌ RESEND CONTRIBUTE CRASHED:", error);
    return {
      success: false,
      error: error.message || "Failed to submit pitch proposal.",
    };
  }
}

/**
 * Handle VPN Quiz Telemetry: Send notification email with user choices, recommendations, IP & Vercel geolocation
 */
export async function sendVpnQuizResultEmail({ answers, result }) {
  try {
    const headersList = await headers();

    // 1. Extract IP Address from Vercel / proxy headers
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const cfIp = headersList.get("cf-connecting-ip");
    const clientIp =
      cfIp ||
      (forwardedFor ? forwardedFor.split(",")[0].trim() : realIp) ||
      "127.0.0.1";

    // 2. Extract Geolocation from Vercel edge headers
    let country =
      headersList.get("x-vercel-ip-country") || headersList.get("cf-ipcountry");
    const rawCity =
      headersList.get("x-vercel-ip-city") || headersList.get("cf-ipcity");
    let city = null;
    if (rawCity) {
      try {
        city = decodeURIComponent(rawCity);
      } catch {
        city = rawCity;
      }
    }

    const rawRegion = headersList.get("x-vercel-ip-country-region");
    let region = null;
    if (rawRegion) {
      try {
        region = decodeURIComponent(rawRegion);
      } catch {
        region = rawRegion;
      }
    }

    let timezone = headersList.get("x-vercel-ip-timezone") || "UTC";
    let latitude = headersList.get("x-vercel-ip-latitude");
    let longitude = headersList.get("x-vercel-ip-longitude");
    const userAgent = headersList.get("user-agent") || "Unknown Device";

    // Fallback IP lookup if not running on Vercel or testing with public IP
    const isLocalhost =
      !clientIp ||
      clientIp === "127.0.0.1" ||
      clientIp === "::1" ||
      clientIp.startsWith("192.168.") ||
      clientIp.startsWith("10.");

    if (!country && !isLocalhost) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200);
        const geoRes = await fetch(
          `http://ip-api.com/json/${clientIp}?fields=status,country,countryCode,regionName,city,timezone,lat,lon`,
          {
            signal: controller.signal,
          },
        );
        clearTimeout(timeoutId);
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.status === "success") {
            country = geoData.countryCode || geoData.country;
            city = geoData.city;
            region = geoData.regionName;
            timezone = geoData.timezone || timezone;
            if (geoData.lat && geoData.lon) {
              latitude = String(geoData.lat);
              longitude = String(geoData.lon);
            }
          }
        }
      } catch (_e) {
        // Continue with available headers
      }
    }

    const locationString = city
      ? `${city}${region ? `, ${region}` : ""}, ${country || ""}`
      : country ||
        (isLocalhost ? "Localhost / Development" : "Unknown Location");

    const coordinates =
      latitude && longitude ? `${latitude}, ${longitude}` : null;

    // 3. Format Question Answers into Human-Readable Labels
    const formatOption = (qId, val) => {
      const q = QUIZ_QUESTIONS?.find((item) => item.id === qId);
      if (!q) return String(val);
      const opt = q.options?.find((o) => o.id === val);
      return opt ? `${opt.icon || ""} ${opt.label}` : String(val);
    };

    const q2Text = answers?.q2
      ? formatOption("q2", answers.q2)
      : "Not answered";
    const q3Text = answers?.q3
      ? formatOption("q3", answers.q3)
      : "Not answered";
    const q5Text = answers?.q5
      ? formatOption("q5", answers.q5)
      : "Not answered";

    // 4. Recommendation Details
    const topMatch = result?.topMatch;
    const runnerUp = result?.runnerUp;

    // 5. Construct Structured Payload for WordPress
    const cleanQ1 = Array.isArray(answers?.q1)
      ? answers.q1.map((id) => formatOption("q1", id)).join("\n• ")
      : "";
    const cleanQ4 = Array.isArray(answers?.q4)
      ? answers.q4.map((id) => formatOption("q4", id)).join("\n• ")
      : "";

    const leadPayload = {
      telemetry: {
        clientIp,
        country: country || "",
        city: city || "",
        region: region || "",
        timezone: timezone || "UTC",
        coordinates: coordinates || "",
        userAgent,
      },
      result: {
        topMatch: {
          name: topMatch?.name || "NordVPN",
          matchPercentage: topMatch?.matchPercentage || 95,
          price: topMatch?.price || "",
          billingInfo: topMatch?.billingInfo || "",
          reasons: topMatch?.reasons || [],
        },
        runnerUp: runnerUp
          ? {
              name: runnerUp.name,
              matchPercentage: runnerUp.matchPercentage,
              price: runnerUp.price,
            }
          : null,
      },
      answers,
      formattedAnswers: {
        q1Text: cleanQ1 ? `• ${cleanQ1}` : "None selected",
        q2Text,
        q3Text,
        q4Text: cleanQ4 ? `• ${cleanQ4}` : "None selected",
        q5Text,
      },
    };

    // 6. Push Lead Directly to WordPress Backend
    const wpBase = (
      process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
      "https://server.freebirdsdigest.com/graphql"
    ).replace(/\/graphql\/?$/, "");

    const wpEndpoint =
      process.env.WP_VPN_LEADS_URL || `${wpBase}/wp-json/freebirds/v1/vpn-lead`;
    const leadSecret =
      process.env.WP_VPN_LEADS_SECRET || "freebirds_vpn_lead_secret_2026";

    let wpResult = null;
    try {
      const wpRes = await fetch(wpEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-VPN-Lead-Secret": leadSecret,
        },
        body: JSON.stringify(leadPayload),
      });

      if (wpRes.ok) {
        wpResult = await wpRes.json();
        console.log("✅ WordPress VPN Lead Recorded Successfully:", wpResult);
      } else {
        const errorText = await wpRes.text();
        console.warn(
          `⚠️ WordPress Lead API returned HTTP ${wpRes.status}:`,
          errorText.slice(0, 150),
        );
      }
    } catch (wpErr) {
      console.error("❌ Failed to push lead to WordPress:", wpErr.message);
    }

    // 7. Optional Email Notification (Disabled by default per client request; enable via SEND_VPN_QUIZ_EMAILS=true)
    let emailData = null;
    if (process.env.SEND_VPN_QUIZ_EMAILS === "true") {
      const subjectTag = country
        ? `[${city ? `${city}, ` : ""}${country}]`
        : `[${locationString}]`;

      emailData = await sendViaResend({
        from: "FreeBirds Digest <no-reply@mail.asthacreatives.com>",
        to: ["contact@redmun.com", "shahidul1920shakil@gmail.com"],
        subject: `🎯 VPN Finder Lead: ${topMatch?.name || "Match"} ${subjectTag}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; color: #0f172a;">
            <div style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); padding: 22px 24px; border-bottom: 3px solid #2B59FF;">
              <div style="color: #38bdf8; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">
                FreeBirds Digest • Lead Intelligence
              </div>
              <h2 style="color: #ffffff; font-size: 19px; font-weight: 800; margin: 0;">
                🎯 New VPN Recommendation Generated
              </h2>
              <div style="color: #94a3b8; font-size: 12px; margin-top: 4px;">
                A visitor just completed the VPN Finder quiz and received match recommendations.
              </div>
            </div>
            <div style="padding: 22px 24px;">
              <p><strong>Top Match:</strong> ${topMatch?.name || "NordVPN"} (${topMatch?.matchPercentage || 95}%)</p>
              <p><strong>Location:</strong> ${locationString}</p>
              <p><strong>IP:</strong> ${clientIp}</p>
            </div>
          </div>
        `,
      });
    }

    return { success: true, wpResult, emailData };
  } catch (error) {
    console.error("❌ VPN QUIZ TELEMETRY ERROR:", error);
    return {
      success: false,
      error: error.message || "Failed to dispatch quiz result lead.",
    };
  }
}

/**
 * Descriptive alias for sendVpnQuizResultEmail
 */
export const recordVpnQuizLead = sendVpnQuizResultEmail;
