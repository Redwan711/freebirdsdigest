# FreeBirds VPN Leads — WordPress Plugin & Dashboard Guide

This guide explains how to install the **FreeBirds VPN Quiz Leads** plugin so that all VPN quiz results are stored directly in WordPress and viewed in the WordPress Admin dashboard (with zero emails sent).

---

## 📦 What We Built

1. **WordPress Plugin:** `freebirds-vpn-leads.zip` (located in the project root).
2. **PHP Source File:** `wordpress-plugin/freebirds-vpn-leads/freebirds-vpn-leads.php`.
3. **Next.js Integration:** Automatically sends user answers, recommendations, and Vercel edge geolocation (Country, City, IP, Coordinates) to WordPress via REST API.

---

## 🚀 How to Install on WordPress (2 Simple Ways)

### Method A: Upload Plugin ZIP (Recommended)
1. Log in to your WordPress dashboard (`https://server.freebirdsdigest.com/wp-admin`).
2. Go to **Plugins → Add New Plugin**.
3. Click the **Upload Plugin** button at the very top.
4. Choose the file `freebirds-vpn-leads.zip` from your computer.
5. Click **Install Now**, then click **Activate Plugin**.

---

### Method B: Paste via Code Snippets (Already Installed on your Site)
If you don't want to upload a zip file, you can use the **Code Snippets** plugin already on your site:
1. In WordPress Admin, go to **Snippets → Add New**.
2. Title: `FreeBirds VPN Quiz Leads`
3. Copy the entire contents of `wordpress-plugin/freebirds-vpn-leads/freebirds-vpn-leads.php` (omit the opening `<?php` if your editor includes it).
4. Select **"Run snippet everywhere"**.
5. Click **Save Changes and Activate**.

---

## 🖥️ How the Client Uses It in WordPress

Once activated, look at the left sidebar menu in WordPress Admin:

### 1. Dedicated "VPN Leads" Menu
A new menu item with a shield icon appears:
👉 **🎯 VPN Leads**

### 2. Leads Table Overview
Clicking **VPN Leads** displays a clean table of all submissions:
* **Lead / Match:** e.g., `[US] NordVPN (95%) — Oct 5, 2026 4:30 pm`
* **Location:** City, Region, and Country tag detected by Vercel edge (e.g., `Dhaka BD` or `London GB`)
* **IP Address:** Clean formatted visitor IP code
* **🥇 Top Recommendation:** Provider badge (e.g., `NordVPN (95%)` and monthly price)
* **🥈 Runner-Up:** Provider name & price
* **Date & Time:** Submission timestamp

### 3. Detail View (Click any Lead)
Clicking on any lead opens the card layout:
* **Visitor Telemetry Box:** IP, Country, City, Timezone, User-Agent, and Coordinates with a clickable **"View Map ↗"** link to Google Maps.
* **Top Recommendation Card:** Provider name, match percentage, price, and the exact reasons why this VPN matched the visitor.
* **Runner-Up Card:** Second-best match name and price.
* **Exact User Selections (Q1 – Q5):**
  * **Q1:** Primary Use Case(s)
  * **Q2:** Device Count
  * **Q3:** Budget & Subscription Tier
  * **Q4:** Privacy & Security Requirements
  * **Q5:** App Interface Preference

### 4. One-Click "Export All Leads to CSV"
At the top right of the **VPN Leads** list table, click the blue button:
👉 **📥 Export All Leads to CSV**

This instantly downloads a `.csv` spreadsheet containing every lead, date, location, quiz answer, and recommendation for easy reporting or Excel analysis.

---

## 🔒 Security & Configuration

* The REST endpoint is secured at `POST /wp-json/freebirds/v1/vpn-lead`.
* It requires the secret header `X-VPN-Lead-Secret: freebirds_vpn_lead_secret_2026` (already configured in `.env.local` as `WP_VPN_LEADS_SECRET`).
* If you ever want to change the secret key in WordPress, you can add this line to `wp-config.php`:
  ```php
  define('FREEBIRDS_VPN_LEAD_SECRET', 'your_new_secret_here');
  ```
  and update `WP_VPN_LEADS_SECRET` in Vercel / `.env.local`.

---

## ✉️ Email Notifications Status
* Email sending is **disabled by default**, exactly as requested.
* If you or the client ever want email notifications back in the future, simply add `SEND_VPN_QUIZ_EMAILS=true` to `.env.local` / Vercel Environment Variables.
