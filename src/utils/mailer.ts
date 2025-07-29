import { createTransport } from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';
import { nodemailerOptions } from '../configs/nodemailer-options';

export const transporter = createTransport(nodemailerOptions);

export async function sendMail(options: Mail.Options): Promise<void> {
  try {
    const info = await transporter.sendMail(options);
    console.log('Email sent with id:', info.messageId);
  } catch (err) {
    console.error('Error sending email:', err);
  }
}
