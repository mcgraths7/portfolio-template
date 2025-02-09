"use server";

import { Resend } from "resend";

import { FormData } from "@/types/app";
import { EMAIL_REGEX } from "@/app/constants";

export async function sendEmail(formData: FormData) {
  try {
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

    const { email, firstName, lastName, subject, message } = formData;

    if (!email || !message) {
      return { error: "All fields are required" };
    }

    if (!process.env.NEXT_PUBLIC_RESEND_TO_EMAIL_ADDRESS) {
      return { error: "Missing environment variable: RESEND_TO_EMAIL_ADDRESS" };
    }

    const fromEmail =
      process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL_ADDRESS || undefined;
    const toEmail =
      process.env.NEXT_PUBLIC_RESEND_TO_EMAIL_ADDRESS || undefined;

    if (!fromEmail || !toEmail) {
      return {
        error:
          "Missing environment variable: RESEND_FROM_EMAIL_ADDRESS or NEXT_PUBLIC_RESEND_TO_EMAIL_ADDRESS",
      };
    }

    if (!EMAIL_REGEX.test(fromEmail)) {
      return { error: "Malformed email address: RESEND_FROM_EMAIL_ADDRESS" };
    }

    if (!EMAIL_REGEX.test(toEmail)) {
      return {
        error: "Malformed email address: NEXT_PUBLIC_RESEND_TO_EMAIL_ADDRESS",
      };
    }

    const data = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: subject,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Message: ${message}
      `,
    });

    const { error: responseError } = data;

    if (responseError) {
      return { error: `Error ${JSON.stringify(responseError, undefined, 2)}` };
    }

    return { success: `Email sent successfully` };
  } catch (error) {
    return { error: `An error occurred while sending the email: ${error}` };
  }
}
