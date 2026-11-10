const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const nodemailer = require('nodemailer');

initializeApp();
const db = getFirestore();

/**
 * Configure Gmail Transporter via Nodemailer
 * Uses App Passwords generated from Google Account Security.
 */
function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.warn(
      'Gmail credentials missing. Please set GMAIL_USER and GMAIL_APP_PASSWORD environment variables.'
    );
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

const NOTIFICATION_RECIPIENT =
  process.env.ALERT_EMAIL_RECIPIENT || 'marco@marcoswinebar.com.au';

/**
 * Trigger 1: Handles new venue consultation requests
 */
exports.onConsultationCreated = onDocumentCreated(
  {
    document: 'sommelier_consultations/{docId}',
    region: 'australia-southeast1',
  },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const data = snap.data();
    const docId = event.params.docId;

    console.log(`Processing new consultation request for: ${data.venueName} (${docId})`);

    const transporter = getTransporter();
    if (!transporter) {
      await snap.ref.update({
        notificationStatus: 'pending_gmail_credentials',
      });
      return;
    }

    try {
      // 1. Alert Email to Marco
      const alertSubject = `🍷 New Venue Consultation Request: ${data.venueName} (${data.name})`;
      const alertHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #121212; color: #f5f5f0; padding: 30px; border-radius: 6px;">
          <h2 style="color: #C5A059; border-bottom: 1px solid rgba(197, 160, 89, 0.3); padding-bottom: 10px; margin-top: 0;">
            New Venue Consultation Inquiry
          </h2>
          <p style="font-size: 15px; color: #dcdcd5;">A new regional venue has requested a consultation through the website:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
            <tr>
              <td style="padding: 10px; border: 1px solid #282828; color: #C5A059; font-weight: bold; width: 140px;">Contact Name</td>
              <td style="padding: 10px; border: 1px solid #282828; color: #ffffff;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #282828; color: #C5A059; font-weight: bold;">Venue / Restaurant</td>
              <td style="padding: 10px; border: 1px solid #282828; color: #ffffff;"><strong>${data.venueName}</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #282828; color: #C5A059; font-weight: bold;">Email</td>
              <td style="padding: 10px; border: 1px solid #282828; color: #ffffff;">
                <a href="mailto:${data.email}" style="color: #C5A059; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #282828; color: #C5A059; font-weight: bold;">Phone</td>
              <td style="padding: 10px; border: 1px solid #282828; color: #ffffff;">${data.phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #282828; color: #C5A059; font-weight: bold;">Preferred Model</td>
              <td style="padding: 10px; border: 1px solid #282828; color: #ffffff;">${data.serviceInterest || 'Floor Takeover'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #282828; color: #C5A059; font-weight: bold;">Region</td>
              <td style="padding: 10px; border: 1px solid #282828; color: #ffffff;">${data.region || 'Regional Victoria'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #282828; color: #C5A059; font-weight: bold;">Notes / Details</td>
              <td style="padding: 10px; border: 1px solid #282828; color: #ffffff;">${data.message || 'None provided'}</td>
            </tr>
          </table>

          <div style="margin-top: 25px;">
            <a href="mailto:${data.email}?subject=Visiting%20Sommelier%20Partnership%20-%20${encodeURIComponent(data.venueName)}" 
               style="background-color: #C5A059; color: #121212; padding: 12px 24px; text-decoration: none; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">
              Reply to ${data.name}
            </a>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"Marco's Wine Bar Notifications" <${process.env.GMAIL_USER}>`,
        to: NOTIFICATION_RECIPIENT,
        replyTo: data.email,
        subject: alertSubject,
        html: alertHtml,
      });

      // 2. Automated Confirmation Email to the Client
      const clientSubject = `Grazie for reaching out | Marco: Wine Strategist & Sommelier`;
      const clientHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #121212; color: #f5f5f0; padding: 35px; border-radius: 6px; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 25px;">
            <h1 style="color: #ffffff; font-size: 26px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px;">
              MARCO<span style="color: #C5A059;">.</span>
            </h1>
            <p style="color: #C5A059; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin: 0;">
              Wine Strategist & Visiting Sommelier
            </p>
          </div>

          <p style="font-size: 16px; color: #ffffff; line-height: 1.6;">
            Ciao ${data.name},
          </p>

          <p style="font-size: 15px; color: #dcdcd5; line-height: 1.6;">
            Thank you for reaching out regarding a potential collaboration for <strong>${data.venueName}</strong>.
          </p>

          <p style="font-size: 15px; color: #dcdcd5; line-height: 1.6;">
            I have received your inquiry for <em>${data.serviceInterest}</em>. I personally review every venue profile to ensure our takeover or consulting structure delivers maximum beverage margin and floor energy for your team.
          </p>

          <p style="font-size: 15px; color: #dcdcd5; line-height: 1.6;">
            I will be in touch within <strong>24 hours</strong> to discuss prospective dates, wine allocations, and service format.
          </p>

          <div style="margin: 30px 0; padding: 18px; background-color: #1c1c1c; border-left: 3px solid #C5A059;">
            <p style="margin: 0; font-size: 13px; font-style: italic; color: #C5A059;">
              “Serious wine. Minus the ego.”
            </p>
          </div>

          <p style="font-size: 14px; color: #a8a89a; margin-top: 30px;">
            Warm regards,<br />
            <strong style="color: #ffffff;">Marco Ripa</strong><br />
            Wine Strategist & Sommelier<br />
            <a href="mailto:marco@marcoswinebar.com.au" style="color: #C5A059; text-decoration: none;">marco@marcoswinebar.com.au</a> | <a href="https://marcoswinebar.com.au" style="color: #C5A059; text-decoration: none;">marcoswinebar.com.au</a>
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: `"Marco Ripa" <${process.env.GMAIL_USER}>`,
        to: data.email,
        replyTo: NOTIFICATION_RECIPIENT,
        subject: clientSubject,
        html: clientHtml,
      });

      // Update Firestore document status
      await snap.ref.update({
        notificationSent: true,
        notificationSentAt: new Date().toISOString(),
        clientConfirmationSent: true,
      });

      console.log(`Successfully sent consultation notification & confirmation for ${data.venueName}`);
    } catch (err) {
      console.error(`Error sending consultation email:`, err);
      await snap.ref.update({
        emailError: err.message,
      });
    }
  }
);

/**
 * Trigger 2: Handles new VIP opening guestlist signups for Marco's Wine Bar
 */
exports.onGuestlistCreated = onDocumentCreated(
  {
    document: 'wine_bar_guestlist/{docId}',
    region: 'australia-southeast1',
  },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const data = snap.data();
    const docId = event.params.docId;

    console.log(`Processing new guestlist signup: ${data.email} (${docId})`);

    const transporter = getTransporter();
    if (!transporter) {
      await snap.ref.update({
        notificationStatus: 'pending_gmail_credentials',
      });
      return;
    }

    try {
      // 1. Alert Email to Marco
      const alertSubject = `✨ New Wine Bar Guestlist Signup: ${data.email}`;
      const alertHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #121212; color: #f5f5f0; padding: 25px; border-radius: 6px;">
          <h2 style="color: #C5A059; margin-top: 0;">New Speakeasy Guestlist Registration</h2>
          <p style="font-size: 14px; color: #dcdcd5;">A new guest has secured early access for Marco's Wine Bar (Opening Autumn 2027):</p>
          <ul style="color: #ffffff; font-size: 14px; line-height: 1.8;">
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Name:</strong> ${data.name || 'Not provided'}</li>
            <li><strong>Timestamp:</strong> ${data.createdAt || new Date().toISOString()}</li>
          </ul>
        </div>
      `;

      await transporter.sendMail({
        from: `"Marco's Wine Bar" <${process.env.GMAIL_USER}>`,
        to: NOTIFICATION_RECIPIENT,
        subject: alertSubject,
        html: alertHtml,
      });

      // 2. Welcome Email to the Subscriber
      const subscriberSubject = `Benvenuto to the Opening Guestlist | Marco's Wine Bar`;
      const subscriberHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #121212; color: #f5f5f0; padding: 35px; border-radius: 6px; max-width: 600px; margin: 0 auto; text-align: center;">
          <h1 style="color: #ffffff; font-size: 26px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 5px;">
            MARCO'S WINE BAR
          </h1>
          <p style="color: #C5A059; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin: 0 0 25px 0;">
            Mornington Peninsula • Opening Autumn 2027
          </p>

          <p style="font-size: 16px; color: #ffffff; line-height: 1.6; text-align: left;">
            ${data.name ? `Ciao ${data.name},` : 'Ciao,'}
          </p>

          <p style="font-size: 15px; color: #dcdcd5; line-height: 1.6; text-align: left;">
            Benvenuto. You are officially registered on the confidential opening-night guestlist for Marco's Wine Bar.
          </p>

          <p style="font-size: 15px; color: #dcdcd5; line-height: 1.6; text-align: left;">
            Concealed behind an unassuming coastal facade in Mornington Peninsula, our 24-seat speakeasy sanctuary is dedicated to 80+ curated international icons, rare Barolo verticals, and Victoria's benchmark cool-climate crus.
          </p>

          <div style="margin: 30px 0; padding: 20px; background-color: #1c1c1c; border: 1px solid rgba(197, 160, 89, 0.3); border-radius: 4px;">
            <p style="margin: 0; font-size: 13px; color: #C5A059; text-transform: uppercase; letter-spacing: 2px;">
              Access Guarantee
            </p>
            <p style="margin: 8px 0 0 0; font-size: 13px; color: #a8a89a;">
              The exact address coordinates and private reservation calendar will be dispatched to your inbox prior to public release.
            </p>
          </div>

          <p style="font-size: 14px; color: #a8a89a; text-align: left; margin-top: 30px;">
            A presto,<br />
            <strong style="color: #ffffff;">Marco Ripa</strong><br />
            <a href="mailto:marco@marcoswinebar.com.au" style="color: #C5A059; text-decoration: none;">marco@marcoswinebar.com.au</a>
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: `"Marco's Wine Bar" <${process.env.GMAIL_USER}>`,
        to: data.email,
        replyTo: NOTIFICATION_RECIPIENT,
        subject: subscriberSubject,
        html: subscriberHtml,
      });

      await snap.ref.update({
        notificationSent: true,
        welcomeSent: true,
      });

      console.log(`Successfully sent welcome email to guestlist subscriber: ${data.email}`);
    } catch (err) {
      console.error(`Error sending guestlist email:`, err);
      await snap.ref.update({
        emailError: err.message,
      });
    }
  }
);

/**
 * Trigger 3: Handles new private wine tasting enquiries from /private-tastings wizard
 */
exports.onPrivateEventEnquiryCreated = onDocumentCreated(
  {
    document: 'private_event_enquiries/{docId}',
    region: 'australia-southeast1',
  },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const data = snap.data();
    const docId = event.params.docId;

    console.log(`Processing new private event enquiry from: ${data.name} (${docId})`);

    const transporter = getTransporter();
    if (!transporter) {
      await snap.ref.update({
        notificationStatus: 'pending_gmail_credentials',
      });
      return;
    }

    const occasionDisplay =
      data.occasion === 'Something else' && data.occasionOther
        ? `Something else (${data.occasionOther})`
        : data.occasion || 'Not specified';

    const dateDisplay = data.dateFlexible
      ? `${data.date ? `${data.date} ` : ''}(Not sure yet / flexible)`
      : data.date || 'Not specified';

    const utmEntries = data.utm && Object.keys(data.utm).length > 0
      ? Object.entries(data.utm)
          .map(([k, v]) => `${k}: ${v}`)
          .join(' · ')
      : 'Direct / None';

    try {
      const alertSubject = `🍷 New Private Tasting Enquiry: ${data.name} (${occasionDisplay})`;
      const alertHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #121212; color: #f5f5f0; padding: 30px; border-radius: 6px;">
          <h2 style="color: #C5A059; border-bottom: 1px solid rgba(197, 160, 89, 0.3); padding-bottom: 10px; margin-top: 0;">
            New Private Wine Tasting Enquiry
          </h2>
          <p style="font-size: 15px; color: #dcdcd5;">A new enquiry was submitted via the <strong>/private-tastings</strong> wizard:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
            <tr>
              <td style="padding: 10px; border: 1px solid #282828; color: #C5A059; font-weight: bold; width: 160px;">Name</td>
              <td style="padding: 10px; border: 1px solid #282828; color: #ffffff;"><strong>${data.name}</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #282828; color: #C5A059; font-weight: bold;">Email</td>
              <td style="padding: 10px; border: 1px solid #282828; color: #ffffff;">
                <a href="mailto:${data.email}" style="color: #C5A059; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #282828; color: #C5A059; font-weight: bold;">Phone</td>
              <td style="padding: 10px; border: 1px solid #282828; color: #ffffff;">${data.phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #282828; color: #C5A059; font-weight: bold;">Occasion</td>
              <td style="padding: 10px; border: 1px solid #282828; color: #ffffff;">${occasionDisplay}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #282828; color: #C5A059; font-weight: bold;">Group Size</td>
              <td style="padding: 10px; border: 1px solid #282828; color: #ffffff;">${data.groupSize || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #282828; color: #C5A059; font-weight: bold;">Chosen Journey</td>
              <td style="padding: 10px; border: 1px solid #282828; color: #ffffff;">${data.journey || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #282828; color: #C5A059; font-weight: bold;">Booking Preference</td>
              <td style="padding: 10px; border: 1px solid #282828; color: #ffffff;"><strong>${data.bookingPreference || 'Not specified'}</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #282828; color: #C5A059; font-weight: bold;">Where (Location)</td>
              <td style="padding: 10px; border: 1px solid #282828; color: #ffffff;">${data.location || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #282828; color: #C5A059; font-weight: bold;">Wine Budget</td>
              <td style="padding: 10px; border: 1px solid #282828; color: #ffffff;">${data.wineBudget || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #282828; color: #C5A059; font-weight: bold;">Anything to know</td>
              <td style="padding: 10px; border: 1px solid #282828; color: #ffffff;">${data.notes || 'None'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #282828; color: #C5A059; font-weight: bold;">Source / UTM</td>
              <td style="padding: 10px; border: 1px solid #282828; color: #9ca3af;">${data.source} (${utmEntries})</td>
            </tr>
          </table>

          <div style="margin-top: 25px;">
            <a href="mailto:${data.email}?subject=Your%20Private%20Wine%20Tasting%20with%20Marco" 
               style="background-color: #C5A059; color: #121212; padding: 12px 24px; text-decoration: none; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">
              Reply to ${data.name}
            </a>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"Marco's Wine Bar Notifications" <${process.env.GMAIL_USER}>`,
        to: NOTIFICATION_RECIPIENT,
        replyTo: data.email,
        subject: alertSubject,
        html: alertHtml,
      });

      await snap.ref.update({
        notificationSent: true,
        notificationSentAt: new Date().toISOString(),
      });

      console.log(`Successfully sent private event notification for ${data.name}`);
    } catch (err) {
      console.error(`Error sending private event notification email:`, err);
      await snap.ref.update({
        emailError: err.message,
      });
    }
  }
);

