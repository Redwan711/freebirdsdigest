"use server";

/**
 * Helper function to send email via Resend HTTP REST API
 * (No external npm package dependency required)
 */
async function sendViaResend({ from, to, subject, reply_to, html }) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("⚠️ RESEND_API_KEY environment variable is missing in process.env.");
    console.log("💡 TIP: Please restart your 'npm run dev' terminal server to reload .env.local!");
    console.log("✅ SIMULATED EMAIL PAYLOAD:", { from, to, subject, reply_to });
    return { id: "simulated_" + Date.now(), status: "simulated" };
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
    const errorMsg = String(result.data?.message || result.data?.error?.message || result.data?.name || "");
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
    if (errorMsg.includes("testing mode") || errorMsg.includes("only send to")) {
      fallbackTo = Array.isArray(to) ? [to[to.length - 1]] : to;
    }

    if (fallbackFrom !== from || fallbackTo !== to) {
      console.log("🔄 Retrying Resend with fallback sender/recipient:", { fallbackFrom, fallbackTo });
      result = await sendRequest(fallbackFrom, fallbackTo);
    }
  }

  if (!result.ok) {
    const finalError = result.data?.message || result.data?.error?.message || `Resend Error (Status ${result.status})`;
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
      return { success: false, error: "Name, email, and message are required." };
    }

    const data = await sendViaResend({
      from: "FreeBirds Digest <no-reply@mail.asthacreatives.com>",
      to: ["contact@redmun.com", "shahidul1920shakil@gmail.com"],
      subject: `New Lead: ${name} [${subject}]`,
      reply_to: email,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #0B1220;">
          <h2 style="color: #FF4D2E;">New Contact Request — FreeBirds Digest</h2>
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
    return { success: false, error: error.message || "Failed to dispatch email." };
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
  const message = formData.get("userMessage") || "No additional notes provided.";

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
    return { success: false, error: error.message || "Failed to record demo request." };
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
          <h2>New Newsletter Subscription — FreeBirds Digest</h2>
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
      return { success: false, error: "Name, email, title, and pitch summary are required." };
    }

    const data = await sendViaResend({
      from: "FreeBirds Digest <no-reply@mail.asthacreatives.com>",
      to: ["redwan@redmun.com", "shahidul1920shakil@gmail.com"],
      subject: `✍️ New Pitch Proposal: "${title}" by ${name}`,
      reply_to: email,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #0B1220;">
          <h2 style="color: #FF4D2E;">New Contributor Pitch Proposal — FreeBirds Digest</h2>
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
    return { success: false, error: error.message || "Failed to submit pitch proposal." };
  }
}
