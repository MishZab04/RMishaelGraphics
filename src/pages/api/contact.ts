import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide a name, email, and message.",
    });
  }

  const host = process.env.MAIL_HOST;
  const port = Number(process.env.MAIL_PORT || 587);
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASSWORD;
  const from = process.env.MAIL_FROM || user;

  if (!host || !user || !pass) {
    return res.status(500).json({
      success: false,
      message:
        "Email service is not configured. Please set MAIL_HOST, MAIL_USER, and MAIL_PASSWORD.",
    });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.MAIL_SECURE === "true",
    auth: {
      user,
      pass,
    },
  });

  const htmlMessage = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || "N/A"}</p>
    <p><strong>Service:</strong> ${service || "N/A"}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br />")}</p>
  `;

  try {
    await transporter.sendMail({
      from: from || `"Mishael Graphics" <${user}>`,
      to: "mishaelzabud04@gmail.com",
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nService: ${service || "N/A"}\n\n${message}`,
      html: htmlMessage,
    });

    return res.status(200).json({
      success: true,
      message: "Your message has been received. Thank you!",
    });
  } catch (error) {
    console.error("Contact email error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send message right now. Please try again later.",
    });
  }
}
