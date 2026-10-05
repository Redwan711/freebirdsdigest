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

    const q1Text =
      Array.isArray(answers?.q1) && answers.q1.length > 0
        ? answers.q1.map((id) => formatOption("q1", id)).join("<br/>• ")
        : "None selected";

    const q2Text = answers?.q2
      ? formatOption("q2", answers.q2)
      : "Not answered";
    const q3Text = answers?.q3
      ? formatOption("q3", answers.q3)
      : "Not answered";

    const q4Text =
      Array.isArray(answers?.q4) && answers.q4.length > 0
        ? answers.q4.map((id) => formatOption("q4", id)).join("<br/>• ")
        : "None selected";

    const q5Text = answers?.q5
      ? formatOption("q5", answers.q5)
      : "Not answered";

    // 4. Recommendation Details
    const topMatch = result?.topMatch;
    const runnerUp = result?.runnerUp;

    const reasonsList =
      Array.isArray(topMatch?.reasons) && topMatch.reasons.length > 0
        ? topMatch.reasons
            .map((r) => `<li style="margin-bottom: 4px;">${r}</li>`)
            .join("")
        : "";

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: timezone !== "UTC" ? timezone : undefined,
      dateStyle: "medium",
      timeStyle: "short",
    });

    const subjectTag = country
      ? `[${city ? `${city}, ` : ""}${country}]`
      : `[${locationString}]`;

    const data = await sendViaResend({
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

            <!-- Telemetry Box -->
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; margin-bottom: 20px;">
              <div style="font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                📍 Visitor & Location Telemetry (Vercel)
              </div>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr>
                  <td style="padding: 3px 0; color: #64748b; width: 115px;"><strong>IP Address:</strong></td>
                  <td style="padding: 3px 0; color: #0f172a; font-family: monospace;">${clientIp}</td>
                </tr>
                <tr>
                  <td style="padding: 3px 0; color: #64748b;"><strong>Location:</strong></td>
                  <td style="padding: 3px 0; color: #0f172a; font-weight: 700;">${locationString}</td>
                </tr>
                ${
                  coordinates
                    ? `
                <tr>
                  <td style="padding: 3px 0; color: #64748b;"><strong>Coordinates:</strong></td>
                  <td style="padding: 3px 0; color: #0f172a; font-size: 12px;">
                    ${coordinates}
                    <a href="https://www.google.com/maps?q=${encodeURIComponent(coordinates)}" target="_blank" style="color: #2B59FF; text-decoration: underline; margin-left: 6px; font-size: 11px;">View Map ↗</a>
                  </td>
                </tr>`
                    : ""
                }
                <tr>
                  <td style="padding: 3px 0; color: #64748b;"><strong>Timezone:</strong></td>
                  <td style="padding: 3px 0; color: #0f172a;">${timezone}</td>
                </tr>
                <tr>
                  <td style="padding: 3px 0; color: #64748b;"><strong>Timestamp:</strong></td>
                  <td style="padding: 3px 0; color: #0f172a;">${timestamp}</td>
                </tr>
                <tr>
                  <td style="padding: 3px 0; color: #64748b; vertical-align: top;"><strong>User Agent:</strong></td>
                  <td style="padding: 3px 0; color: #64748b; font-size: 11px; word-break: break-all;">${userAgent}</td>
                </tr>
              </table>
            </div>

            <!-- Recommendations Box -->
            <div style="margin-bottom: 22px;">
              <div style="font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">
                🏆 Matches Shown to Visitor
              </div>
              
              <div style="border: 2px solid #2B59FF; background-color: #f0f7ff; border-radius: 10px; padding: 14px 16px; margin-bottom: 10px;">
                <div style="font-size: 11px; font-weight: 800; color: #2B59FF; text-transform: uppercase;">
                  🥇 #1 Best Match (${topMatch?.matchPercentage || 95}% Match)
                </div>
                <div style="font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 3px;">
                  ${topMatch?.name || "NordVPN"}
                  <span style="font-size: 14px; font-weight: 600; color: #2B59FF; margin-left: 8px;">${topMatch?.price || ""}</span>
                </div>
                <div style="font-size: 12px; color: #64748b; margin-top: 2px;">
                  ${topMatch?.billingInfo || ""}
                </div>
                ${reasonsList ? `<ul style="margin: 10px 0 0 0; padding-left: 18px; font-size: 12px; color: #334155;">${reasonsList}</ul>` : ""}
              </div>

              ${
                runnerUp
                  ? `
              <div style="border: 1px solid #cbd5e1; background-color: #f8fafc; border-radius: 10px; padding: 12px 16px;">
                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">
                  🥈 Runner-Up (${runnerUp.matchPercentage || 88}% Match)
                </div>
                <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 2px;">
                  ${runnerUp.name}
                  <span style="font-size: 13px; font-weight: 500; color: #64748b; margin-left: 6px;">${runnerUp.price}</span>
                </div>
                <div style="font-size: 11px; color: #64748b;">
                  ${runnerUp.billingInfo || ""}
                </div>
              </div>`
                  : ""
              }
            </div>

            <!-- Quiz Selections Breakdown -->
            <div style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
              <div style="font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
                📋 Exact User Options Selected
              </div>

              <div style="margin-bottom: 10px; background-color: #f8fafc; padding: 10px 12px; border-radius: 8px; border: 1px solid #f1f5f9;">
                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Q1: Primary Use Case(s)</div>
                <div style="font-size: 13px; font-weight: 600; color: #0f172a; margin-top: 3px;">• ${q1Text}</div>
              </div>

              <div style="margin-bottom: 10px; background-color: #f8fafc; padding: 10px 12px; border-radius: 8px; border: 1px solid #f1f5f9;">
                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Q2: Device Count</div>
                <div style="font-size: 13px; font-weight: 600; color: #0f172a; margin-top: 3px;">${q2Text}</div>
              </div>

              <div style="margin-bottom: 10px; background-color: #f8fafc; padding: 10px 12px; border-radius: 8px; border: 1px solid #f1f5f9;">
                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Q3: Budget & Subscription Tier</div>
                <div style="font-size: 13px; font-weight: 600; color: #0f172a; margin-top: 3px;">${q3Text}</div>
              </div>

              <div style="margin-bottom: 10px; background-color: #f8fafc; padding: 10px 12px; border-radius: 8px; border: 1px solid #f1f5f9;">
                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Q4: Privacy & Security Requirements</div>
                <div style="font-size: 13px; font-weight: 600; color: #0f172a; margin-top: 3px;">• ${q4Text}</div>
              </div>

              <div style="background-color: #f8fafc; padding: 10px 12px; border-radius: 8px; border: 1px solid #f1f5f9;">
                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Q5: App Interface Preference</div>
                <div style="font-size: 13px; font-weight: 600; color: #0f172a; margin-top: 3px;">${q5Text}</div>
              </div>
            </div>

          </div>

          <div style="background-color: #f8fafc; padding: 12px 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8;">
            FreeBirds Digest Automated VPN Lead & Telemetry Engine • Vercel Hosted
          </div>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error("❌ RESEND VPN QUIZ TELEMETRY ERROR:", error);
    return {
      success: false,
      error: error.message || "Failed to dispatch quiz result email.",
    };
  }
}
