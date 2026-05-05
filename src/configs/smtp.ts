import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { optionalEnvGroup } from "@/lib/utils/env";

const smtp = optionalEnvGroup("SMTP", {
  fromAddress: "SMTP_FROM_ADDRESS",
  fromName: "SMTP_FROM_NAME",
  host: "SMTP_HOST",
  pass: "SMTP_PASS",
  port: "SMTP_PORT",
  user: "SMTP_USER"
});

export const smtpEmail = (() => {
  if (!smtp.enabled) {
    return undefined;
  }

  const port = Number(smtp.values.port);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("SMTP_PORT must be a positive integer when SMTP is configured.");
  }

  return nodemailerAdapter({
    defaultFromAddress: smtp.values.fromAddress,
    defaultFromName: smtp.values.fromName,
    transportOptions: {
      auth: {
        pass: smtp.values.pass,
        user: smtp.values.user
      },
      host: smtp.values.host,
      port
    }
  });
})();
