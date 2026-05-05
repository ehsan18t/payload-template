import { requiredEnv } from "@/lib/utils/env";

// HTML email templates use inline styles for broad email client compatibility.

const htmlEntities: Record<string, string> = {
  "&": "&amp;",
  '"': "&quot;",
  "'": "&#39;",
  "<": "&lt;",
  ">": "&gt;"
};

function escapeHTML(value: string | number | null | undefined): string {
  return String(value ?? "").replace(/[&<>"']/g, (char) => htmlEntities[char] ?? char);
}

function cleanText(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function optionalTextEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function requiredTextEnv(name: string): string {
  return requiredEnv(name).trim();
}

function siteName(): string {
  return escapeHTML(requiredTextEnv("NEXT_PUBLIC_SITE_NAME"));
}

function subjectSiteName(): string {
  return cleanText(requiredTextEnv("NEXT_PUBLIC_SITE_NAME"));
}

function siteUrl(path: string): string {
  const baseUrl = optionalTextEnv("NEXT_PUBLIC_SITE_URL")?.replace(/\/+$/, "");
  return escapeHTML(baseUrl ? `${baseUrl}${path}` : path);
}

function formatMoney(value: number): string {
  const currency = optionalTextEnv("NEXT_PUBLIC_CURRENCY");
  if (!currency) {
    return value.toFixed(2);
  }

  return new Intl.NumberFormat("en-US", {
    currency,
    style: "currency"
  }).format(value);
}

function base(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHTML(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background:#4f46e5;padding:24px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">${siteName()}</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:13px;color:#9ca3af;text-align:center;">
                &copy; ${new Date().getFullYear()} ${siteName()}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export interface WelcomeEmailData {
  firstName?: string | null;
  email: string;
}

export function welcomeEmail(data: WelcomeEmailData): { subject: string; html: string } {
  const name = escapeHTML(data.firstName ?? "there");
  const subjectName = subjectSiteName();
  const html = base(
    "Welcome!",
    `<h2 style="margin:0 0 12px;font-size:20px;color:#111827;">Welcome, ${name}!</h2>
    <p style="margin:0 0 16px;color:#374151;line-height:1.6;">
      Thanks for creating an account. You can now track orders, save addresses, and check out faster.
    </p>
    <a href="${siteUrl("/products")}"
       style="display:inline-block;padding:12px 24px;background:#4f46e5;color:#fff;border-radius:6px;text-decoration:none;font-weight:600;">
      Start Shopping
    </a>`
  );
  return {
    subject: `Welcome to ${subjectName}!`,
    html
  };
}

export interface OrderConfirmationEmailData {
  orderNumber: string;
  customerName?: string | null;
  items: {
    title: string;
    variantLabel?: string | null;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  subtotal: number;
  discountAmount?: number | null;
  shippingCost: number;
  taxAmount?: number | null;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    state?: string | null;
    postalCode: string;
    country: string;
  };
}

export function orderConfirmationEmail(data: OrderConfirmationEmailData): {
  subject: string;
  html: string;
} {
  const name = escapeHTML(data.customerName ?? "Customer");
  const orderNumber = cleanText(data.orderNumber);
  const escapedOrderNumber = escapeHTML(orderNumber);

  const itemRows = data.items
    .map(
      (item) => `
    <tr>
      <td style="padding:8px 0;color:#374151;border-bottom:1px solid #f3f4f6;">
        ${escapeHTML(item.title)}${item.variantLabel ? ` <span style="color:#9ca3af;font-size:13px">(${escapeHTML(item.variantLabel)})</span>` : ""}
      </td>
      <td style="padding:8px 0;text-align:center;color:#374151;border-bottom:1px solid #f3f4f6;">x${item.quantity}</td>
      <td style="padding:8px 0;text-align:right;color:#374151;border-bottom:1px solid #f3f4f6;">${formatMoney(item.totalPrice)}</td>
    </tr>`
    )
    .join("");

  const addr = data.shippingAddress;
  const addrStr = escapeHTML(
    `${addr.street}, ${addr.city}${addr.state ? `, ${addr.state}` : ""} ${addr.postalCode}, ${addr.country}`
  );

  const html = base(
    `Order Confirmation - ${orderNumber}`,
    `<h2 style="margin:0 0 8px;font-size:20px;color:#111827;">Order Confirmed!</h2>
    <p style="margin:0 0 24px;color:#374151;">Hi ${name}, thanks for your order. We'll send you an update when it ships.</p>

    <div style="background:#f9fafb;border-radius:6px;padding:16px;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:13px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Order Number</p>
      <p style="margin:0;font-size:18px;font-weight:700;color:#4f46e5;">${escapedOrderNumber}</p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <thead>
        <tr>
          <th style="text-align:left;padding-bottom:8px;color:#6b7280;font-size:13px;border-bottom:2px solid #e5e7eb;">Product</th>
          <th style="text-align:center;padding-bottom:8px;color:#6b7280;font-size:13px;border-bottom:2px solid #e5e7eb;">Qty</th>
          <th style="text-align:right;padding-bottom:8px;color:#6b7280;font-size:13px;border-bottom:2px solid #e5e7eb;">Price</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr><td style="padding:4px 0;color:#374151;">Subtotal</td><td style="text-align:right;color:#374151;">${formatMoney(data.subtotal)}</td></tr>
      ${data.discountAmount ? `<tr><td style="padding:4px 0;color:#16a34a;">Discount</td><td style="text-align:right;color:#16a34a;">-${formatMoney(data.discountAmount)}</td></tr>` : ""}
      <tr><td style="padding:4px 0;color:#374151;">Shipping</td><td style="text-align:right;color:#374151;">${data.shippingCost === 0 ? "Free" : formatMoney(data.shippingCost)}</td></tr>
      ${data.taxAmount ? `<tr><td style="padding:4px 0;color:#374151;">Tax</td><td style="text-align:right;color:#374151;">${formatMoney(data.taxAmount)}</td></tr>` : ""}
      <tr style="border-top:2px solid #e5e7eb;">
        <td style="padding:8px 0 0;font-weight:700;font-size:16px;color:#111827;">Total</td>
        <td style="text-align:right;padding:8px 0 0;font-weight:700;font-size:16px;color:#111827;">${formatMoney(data.total)}</td>
      </tr>
    </table>

    <p style="margin:0 0 4px;font-size:13px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Shipping To</p>
    <p style="margin:0 0 24px;color:#374151;">${addrStr}</p>

    <a href="${siteUrl("/account/orders")}"
       style="display:inline-block;padding:12px 24px;background:#4f46e5;color:#fff;border-radius:6px;text-decoration:none;font-weight:600;">
      View Order
    </a>`
  );
  return { subject: `Order Confirmed - ${orderNumber}`, html };
}

export interface OrderStatusUpdateEmailData {
  orderNumber: string;
  customerName?: string | null;
  newStatus: string;
  notes?: string | null;
}

export function orderStatusUpdateEmail(data: OrderStatusUpdateEmailData): {
  subject: string;
  html: string;
} {
  const name = escapeHTML(data.customerName ?? "Customer");
  const orderNumber = cleanText(data.orderNumber);
  const escapedOrderNumber = escapeHTML(orderNumber);
  const newStatus = cleanText(data.newStatus);
  const escapedStatus = escapeHTML(newStatus);

  const statusMessages: Record<string, string> = {
    confirmed: "Your order has been confirmed and is being prepared.",
    processing: "Your order is being processed and will ship soon.",
    shipped: "Great news - your order has been shipped!",
    delivered: "Your order has been delivered. Enjoy!",
    cancelled: "Your order has been cancelled. If you have questions, please contact us.",
    refunded: "Your refund has been processed."
  };

  const message =
    statusMessages[newStatus] ?? `Your order status has been updated to: ${newStatus}.`;

  const html = base(
    `Order Update - ${orderNumber}`,
    `<h2 style="margin:0 0 8px;font-size:20px;color:#111827;">Order Update</h2>
    <p style="margin:0 0 24px;color:#374151;">Hi ${name},</p>

    <div style="background:#f9fafb;border-radius:6px;padding:16px;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:13px;color:#9ca3af;">Order</p>
      <p style="margin:0 0 12px;font-weight:700;color:#111827;">${escapedOrderNumber}</p>
      <p style="margin:0 0 4px;font-size:13px;color:#9ca3af;">Status</p>
      <p style="margin:0;font-weight:700;color:#4f46e5;text-transform:capitalize;">${escapedStatus}</p>
    </div>

    <p style="margin:0 0 24px;color:#374151;line-height:1.6;">${escapeHTML(message)}</p>
    ${data.notes ? `<p style="margin:0 0 24px;color:#374151;line-height:1.6;font-style:italic;">${escapeHTML(data.notes)}</p>` : ""}

    <a href="${siteUrl("/account/orders")}"
       style="display:inline-block;padding:12px 24px;background:#4f46e5;color:#fff;border-radius:6px;text-decoration:none;font-weight:600;">
      View Order
    </a>`
  );
  return { subject: `Order Update - ${orderNumber}`, html };
}
