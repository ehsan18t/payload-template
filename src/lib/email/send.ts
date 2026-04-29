import config from "@payload-config";
import { getPayload } from "payload";
import {
  type OrderConfirmationEmailData,
  type OrderStatusUpdateEmailData,
  orderConfirmationEmail,
  orderStatusUpdateEmail,
  type WelcomeEmailData,
  welcomeEmail
} from "./templates";

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const payload = await getPayload({ config });
  await payload.sendEmail({ to, subject, html });
}

export async function sendWelcomeEmail(to: string, data: WelcomeEmailData): Promise<void> {
  const { subject, html } = welcomeEmail(data);
  await sendEmail(to, subject, html);
}

export async function sendOrderConfirmationEmail(
  to: string,
  data: OrderConfirmationEmailData
): Promise<void> {
  const { subject, html } = orderConfirmationEmail(data);
  await sendEmail(to, subject, html);
}

export async function sendOrderStatusUpdateEmail(
  to: string,
  data: OrderStatusUpdateEmailData
): Promise<void> {
  const { subject, html } = orderStatusUpdateEmail(data);
  await sendEmail(to, subject, html);
}
