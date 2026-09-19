import { randomUUID } from 'node:crypto';
import { createElement } from 'react';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';
import { sendEmail } from './mailer.js';
import ContactNotificationEmail from '../emails/ContactNotificationEmail.js';
import ContactAcknowledgementEmail from '../emails/ContactAcknowledgementEmail.js';
import { SUBJECT_LABELS, type ContactInput } from '../validators/contact.schema.js';

const PHONE_NATIONAL = '060 34 65 22';
const PHONE_E164 = '+24160346522';
const WHATSAPP_URL = 'https://wa.me/24160346522';
const CABINET_EMAIL = 'mayombogloire29@gmail.com';

/** Reference courte et lisible au telephone, du type GM-7F3A2B. */
function buildReference(): string {
  return `GM-${randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase()}`;
}

/** Tronque l'adresse IP : suffisant pour reperer un abus, sans pister personne. */
function anonymiseIp(ip: string | undefined): string {
  if (!ip) return 'inconnue';
  if (ip.includes(':')) return `${ip.split(':').slice(0, 3).join(':')}::`;
  const parts = ip.split('.');
  return parts.length === 4 ? `${parts[0]}.${parts[1]}.${parts[2]}.0` : 'inconnue';
}

export interface ContactResult {
  reference: string;
  message: string;
}

/**
 * Traitement d'une demande de contact.
 *
 * Ordre volontaire : la notification a la juriste part en premier. Si elle
 * echoue, la demande est perdue et il faut le dire au visiteur. L'accuse de
 * reception, lui, est un confort : son echec est journalise mais ne fait pas
 * echouer la requete, parce que le message est deja arrive a destination.
 */
export async function handleContactRequest(
  input: ContactInput,
  clientIp: string | undefined,
): Promise<ContactResult> {
  const reference = buildReference();
  const subjectLabel = SUBJECT_LABELS[input.subject];
  const firstName = input.fullName.trim().split(/\s+/)[0] ?? input.fullName;
  const phone = input.phone && input.phone.length > 0 ? input.phone : undefined;

  const receivedAt = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Africa/Libreville',
  }).format(new Date());

  await sendEmail({
    to: env.MAIL_TO,
    subject: `[${reference}] ${subjectLabel} - ${input.fullName}`,
    replyTo: input.email,
    template: createElement(ContactNotificationEmail, {
      reference,
      fullName: input.fullName,
      email: input.email,
      phone,
      subjectLabel,
      message: input.message,
      receivedAt,
      origin: anonymiseIp(clientIp),
    }),
  });

  try {
    await sendEmail({
      to: input.email,
      subject: `Votre demande est bien reçue - référence ${reference}`,
      replyTo: CABINET_EMAIL,
      template: createElement(ContactAcknowledgementEmail, {
        reference,
        firstName,
        subjectLabel,
        message: input.message,
        siteUrl: env.SITE_URL,
        phoneNational: PHONE_NATIONAL,
        phoneE164: PHONE_E164,
        whatsappUrl: WHATSAPP_URL,
        email: CABINET_EMAIL,
      }),
    });
  } catch {
    logger.warn("Accuse de reception non delivre, la demande est bien enregistree", { reference });
  }

  logger.info('Demande de contact transmise', { reference, subject: input.subject });

  return {
    reference,
    message: `Votre demande est partie. Un accusé de réception vous a été envoyé, référence ${reference}.`,
  };
}
