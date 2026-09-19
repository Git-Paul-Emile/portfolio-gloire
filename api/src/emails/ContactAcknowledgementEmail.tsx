import { Hr, Link, Text } from '@react-email/components';
import EmailLayout from './EmailLayout.js';
import { styles } from './theme.js';

export interface ContactAcknowledgementProps {
  reference: string;
  firstName: string;
  subjectLabel: string;
  message: string;
  siteUrl: string;
  phoneNational: string;
  phoneE164: string;
  whatsappUrl: string;
  email: string;
}

/**
 * Accuse de reception envoye au demandeur.
 * Il repond a la seule question qu'il se pose apres avoir clique : est-ce que
 * mon message est bien parti, et quand aurai-je une reponse ?
 */
export default function ContactAcknowledgementEmail({
  reference,
  firstName,
  subjectLabel,
  message,
  siteUrl,
  phoneNational,
  phoneE164,
  whatsappUrl,
  email,
}: ContactAcknowledgementProps) {
  return (
    <EmailLayout
      preview={`Votre demande est bien reçue, référence ${reference}.`}
      footer={
        <Text style={styles.footerText}>
          Ce message confirme la réception de votre demande. Vos informations servent uniquement à
          y répondre et ne sont transmises à aucun tiers.
          <br />
          Moanda, Haut-Ogooué, Gabon.
        </Text>
      }
    >
      <Text style={styles.heading}>Votre demande est bien reçue</Text>

      <Text style={styles.paragraph}>Bonjour {firstName},</Text>
      <Text style={styles.paragraph}>
        Votre message est arrivé. Je le lis personnellement et je reviens vers vous.
      </Text>

      <Text style={styles.label}>Référence de votre demande</Text>
      <Text style={styles.value}>{reference}</Text>

      <Text style={styles.label}>Objet</Text>
      <Text style={styles.value}>{subjectLabel}</Text>

      <Text style={styles.label}>Ce que vous m'avez écrit</Text>
      <Text style={styles.quote}>{message}</Text>

      <Hr style={styles.hr} />

      <Text style={styles.paragraph}>
        Si votre situation est urgente, appelez le{' '}
        <Link href={`tel:${phoneE164}`} style={styles.link}>
          {phoneNational}
        </Link>{' '}
        ou écrivez sur{' '}
        <Link href={whatsappUrl} style={styles.link}>
          WhatsApp
        </Link>
        .
      </Text>

      <Text style={styles.small}>
        Vous pouvez répondre directement à ce courriel, il arrive sur {email}. Retrouver le site :{' '}
        <Link href={siteUrl} style={styles.link}>
          {siteUrl.replace(/^https?:\/\//, '')}
        </Link>
      </Text>
    </EmailLayout>
  );
}
