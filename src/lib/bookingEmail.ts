import emailjs from "@emailjs/browser";

type BookingEmailInput = {
  name: string;
  email: string;
  notes: string;
  date: string;
  time: string;
  location: string;
  duration: number;
};

const config = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  ownerTemplateId: import.meta.env.VITE_EMAILJS_BOOKING_OWNER_TEMPLATE_ID,
  customerTemplateId: import.meta.env.VITE_EMAILJS_BOOKING_CUSTOMER_TEMPLATE_ID,
  ownerEmail: import.meta.env.VITE_BOOKING_OWNER_EMAIL || "info@brandestiny.co",
  meetingLink: import.meta.env.VITE_BOOKING_MEETING_LINK || "Google Meet link to be shared",
};

const getMissingEmailConfig = () =>
  Object.entries({
    VITE_EMAILJS_PUBLIC_KEY: config.publicKey,
    VITE_EMAILJS_SERVICE_ID: config.serviceId,
    VITE_EMAILJS_BOOKING_OWNER_TEMPLATE_ID: config.ownerTemplateId,
    VITE_EMAILJS_BOOKING_CUSTOMER_TEMPLATE_ID: config.customerTemplateId,
  })
    .filter(([, value]) => !value)
    .map(([key]) => key);

export const sendBookingEmails = async (booking: BookingEmailInput) => {
  const missingConfig = getMissingEmailConfig();

  if (missingConfig.length > 0) {
    throw new Error(`Missing EmailJS configuration: ${missingConfig.join(", ")}`);
  }

  const baseParams = {
    from_name: booking.name,
    from_email: booking.email,
    customer_name: booking.name,
    customer_email: booking.email,
    owner_email: config.ownerEmail,
    booking_date: booking.date,
    booking_time: booking.time,
    booking_location: booking.location,
    booking_duration: `${booking.duration} minutes`,
    meeting_link: config.meetingLink,
    notes: booking.notes || "None",
    reply_to: booking.email,
  };

  await Promise.all([
    emailjs.send(config.serviceId, config.ownerTemplateId, baseParams, {
      publicKey: config.publicKey,
    }),
    emailjs.send(
      config.serviceId,
      config.customerTemplateId,
      {
        ...baseParams,
        to_name: booking.name,
        to_email: booking.email,
      },
      {
        publicKey: config.publicKey,
      },
    ),
  ]);
};
