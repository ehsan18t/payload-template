// HTML email templates — inline styles for maximum client compatibility

function base(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background:#4f46e5;padding:24px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">${process.env.NEXT_PUBLIC_SITE_NAME ?? "My Store"}</h1>
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
                &copy; ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_SITE_NAME ?? "My Store"}. All rights reserved.
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
  const name = data.firstName ?? "there";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const html = base(
    "Welcome!",
    `<h2 style="margin:0 0 12px;font-size:20px;color:#111827;">Welcome, ${name}!</h2>
    <p style="margin:0 0 16px;color:#374151;line-height:1.6;">
      Thanks for creating an account. You can now track orders, save addresses, and check out faster.
    </p>
    <a href="${siteUrl}/products"
       style="display:inline-block;padding:12px 24px;background:#4f46e5;color:#fff;border-radius:6px;text-decoration:none;font-weight:600;">
      Start Shopping
    </a>`
  );
  return { subject: `Welcome to ${process.env.NEXT_PUBLIC_SITE_NAME ?? "My Store"}!`, html };
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const name = data.customerName ?? "Customer";

  const itemRows = data.items
    .map(
      (item) => `
    <tr>
      <td style="padding:8px 0;color:#374151;border-bottom:1px solid #f3f4f6;">
        ${item.title}${item.variantLabel ? ` <span style="color:#9ca3af;font-size:13px">(${item.variantLabel})</span>` : ""}
      </td>
      <td style="padding:8px 0;text-align:center;color:#374151;border-bottom:1px solid #f3f4f6;">×${item.quantity}</td>
      <td style="padding:8px 0;text-align:right;color:#374151;border-bottom:1px solid #f3f4f6;">$${item.totalPrice.toFixed(2)}</td>
    </tr>`
    )
    .join("");

  const addr = data.shippingAddress;
  const addrStr = `${addr.street}, ${addr.city}${addr.state ? `, ${addr.state}` : ""} ${addr.postalCode}, ${addr.country}`;

  const html = base(
    `Order Confirmation — ${data.orderNumber}`,
    `<h2 style="margin:0 0 8px;font-size:20px;color:#111827;">Order Confirmed!</h2>
    <p style="margin:0 0 24px;color:#374151;">Hi ${name}, thanks for your order. We'll send you an update when it ships.</p>

    <div style="background:#f9fafb;border-radius:6px;padding:16px;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:13px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Order Number</p>
      <p style="margin:0;font-size:18px;font-weight:700;color:#4f46e5;">${data.orderNumber}</p>
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
      <tr><td style="padding:4px 0;color:#374151;">Subtotal</td><td style="text-align:right;color:#374151;">$${data.subtotal.toFixed(2)}</td></tr>
      ${data.discountAmount ? `<tr><td style="padding:4px 0;color:#16a34a;">Discount</td><td style="text-align:right;color:#16a34a;">-$${data.discountAmount.toFixed(2)}</td></tr>` : ""}
      <tr><td style="padding:4px 0;color:#374151;">Shipping</td><td style="text-align:right;color:#374151;">${data.shippingCost === 0 ? "Free" : `$${data.shippingCost.toFixed(2)}`}</td></tr>
      ${data.taxAmount ? `<tr><td style="padding:4px 0;color:#374151;">Tax</td><td style="text-align:right;color:#374151;">$${data.taxAmount.toFixed(2)}</td></tr>` : ""}
      <tr style="border-top:2px solid #e5e7eb;">
        <td style="padding:8px 0 0;font-weight:700;font-size:16px;color:#111827;">Total</td>
        <td style="text-align:right;padding:8px 0 0;font-weight:700;font-size:16px;color:#111827;">$${data.total.toFixed(2)}</td>
      </tr>
    </table>

    <p style="margin:0 0 4px;font-size:13px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Shipping To</p>
    <p style="margin:0 0 24px;color:#374151;">${addrStr}</p>

    <a href="${siteUrl}/account/orders"
       style="display:inline-block;padding:12px 24px;background:#4f46e5;color:#fff;border-radius:6px;text-decoration:none;font-weight:600;">
      View Order
    </a>`
  );
  return { subject: `Order Confirmed — ${data.orderNumber}`, html };
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const name = data.customerName ?? "Customer";

  const statusMessages: Record<string, string> = {
    confirmed: "Your order has been confirmed and is being prepared.",
    processing: "Your order is being processed and will ship soon.",
    shipped: "Great news — your order has been shipped!",
    delivered: "Your order has been delivered. Enjoy!",
    cancelled: "Your order has been cancelled. If you have questions, please contact us.",
    refunded: "Your refund has been processed."
  };

  const message =
    statusMessages[data.newStatus] ?? `Your order status has been updated to: ${data.newStatus}.`;

  const html = base(
    `Order Update — ${data.orderNumber}`,
    `<h2 style="margin:0 0 8px;font-size:20px;color:#111827;">Order Update</h2>
    <p style="margin:0 0 24px;color:#374151;">Hi ${name},</p>

    <div style="background:#f9fafb;border-radius:6px;padding:16px;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:13px;color:#9ca3af;">Order</p>
      <p style="margin:0 0 12px;font-weight:700;color:#111827;">${data.orderNumber}</p>
      <p style="margin:0 0 4px;font-size:13px;color:#9ca3af;">Status</p>
      <p style="margin:0;font-weight:700;color:#4f46e5;text-transform:capitalize;">${data.newStatus}</p>
    </div>

    <p style="margin:0 0 24px;color:#374151;line-height:1.6;">${message}</p>
    ${data.notes ? `<p style="margin:0 0 24px;color:#374151;line-height:1.6;font-style:italic;">${data.notes}</p>` : ""}

    <a href="${siteUrl}/account/orders"
       style="display:inline-block;padding:12px 24px;background:#4f46e5;color:#fff;border-radius:6px;text-decoration:none;font-weight:600;">
      View Order
    </a>`
  );
  return { subject: `Order Update — ${data.orderNumber}`, html };
}
