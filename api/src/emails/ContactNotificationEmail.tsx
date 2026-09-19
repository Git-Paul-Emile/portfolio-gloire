import { Hr, Link, Text } from '@react-email/components';
import EmailLayout from './EmailLayout.js';
import { styles } from './theme.js';

export interface ContactNotificationProps {
  reference: string;
  fullName: string;
  email: string;
  phone?: string | undefined;
  subjectLabel: string;
  message: string;
  receivedAt: string;
  /** Adresse IP tronquee, utile en cas d'abus, sans identifier precisement. */
  origin: string;
}

/**
 * Courriel recu par la juriste.
 * Objectif : pouvoir repondre sans ouvrir le site. Toutes les informations
 * utiles sont dans le corps, et `replyTo` pointe sur le demandeur.
 */
export default function ContactNotificationEmail({
  reference,
  fullName,
  email,
  phone,
  subjectLabel,
  message,
  receivedAt,
  origin,
}: ContactNotificationProps) {
  return (
    <EmailLayout
      preview={`${subjectLabel} - ${fullName}`}
      footer={
        <Text style={styles.footerText}>
          Message transmis automatiquement par le formulaire du site. Référence {reference}, reçu le{' '}
          {receivedAt}. Origine {origin}.
        </Text>
      }
    >
      <Text style={styles.badge}>{subjectLabel}</Text>
      <Text style={styles.heading}>Nouvelle demande de {fullName}</Text>

      <Text style={styles.label}>Nom et prénom</Text>
      <Text style={styles.value}>{fullName}</Text>

      <Text style={styles.label}>Adresse électronique</Text>
      <Text style={styles.value}>
        <Link href={`mailto:${email}`} style={styles.link}>
          {email}
        </Link>
      </Text>

      {phone ? (
        <>
          <Text style={styles.label}>Téléphone</Text>
          <Text style={styles.value}>
            <Link href={`tel:${phone.replace(/[^0-9+]/g, '')}`} style={styles.link}>
              {phone}
            </Link>
          </Text>
        </>
      ) : null}

      <Text style={styles.label}>Situation décrite</Text>
      <Text style={styles.quote}>{message}</Text>

      <Hr style={styles.hr} />

      <Text style={styles.small}>
        Répondre à ce courriel écrit directement à {fullName}. La référence {reference} permet de
        retrouver la demande.
      </Text>
    </EmailLayout>
  );
}
