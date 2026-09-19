import nodemailer, { type Transporter } from 'nodemailer';
import { render } from '@react-email/render';
import type { ReactElement } from 'react';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';
import { AppError } from '../utils/AppError.js';

/**
 * Encapsulation du fournisseur d'envoi.
 *
 * Le reste du code ignore que l'on utilise Nodemailer et du SMTP. Si demain le
 * cabinet passe a un service d'envoi transactionnel, seul ce fichier change.
 * Le transport est cree une seule fois et reutilise : ouvrir une connexion SMTP
 * a chaque message serait lent et mal vu des serveurs de messagerie.
 */
let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
    pool: true,
    maxConnections: 2,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  return transporter;
}

/** Verifie la configuration SMTP au demarrage, pour echouer tot et visiblement. */
export async function verifyMailer(): Promise<void> {
  try {
    await getTransporter().verify();
    logger.info('Connexion SMTP verifiee', { host: env.SMTP_HOST, port: env.SMTP_PORT });
  } catch (error) {
    logger.error('Connexion SMTP impossible', {
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      reason: error instanceof Error ? error.message : 'inconnue',
    });
  }
}

export interface OutgoingEmail {
  to: string;
  subject: string;
  /** Modele React Email. Le HTML et le texte brut en sont tous deux derives. */
  template: ReactElement;
  replyTo?: string;
}

/**
 * Chaque message part en deux versions : HTML et texte brut.
 * La version texte n'est pas une politesse : son absence fait grimper le score
 * de pourriel et casse l'affichage dans les clients qui bloquent le HTML.
 */
export async function sendEmail({ to, subject, template, replyTo }: OutgoingEmail): Promise<void> {
  const html = await render(template);
  const text = await render(template, { plainText: true });

  try {
    await getTransporter().sendMail({
      from: env.MAIL_FROM,
      to,
      subject,
      html,
      text,
      ...(replyTo ? { replyTo } : {}),
    });
  } catch (error) {
    logger.error("Echec de l'envoi du courriel", {
      to,
      subject,
      reason: error instanceof Error ? error.message : 'inconnue',
    });
    throw AppError.serviceUnavailable(
      "Le message n'a pas pu être envoyé. Réessayez dans quelques minutes, ou passez par WhatsApp.",
    );
  }
}
