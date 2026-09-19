import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createElement } from 'react';
import { render } from '@react-email/render';
import ContactNotificationEmail from './ContactNotificationEmail.js';
import ContactAcknowledgementEmail from './ContactAcknowledgementEmail.js';

/**
 * Genere les deux courriels en fichiers HTML, avec des donnees d'exemple.
 * Relire un modele dans un navigateur coute quelques secondes ; s'apercevoir
 * qu'il est casse dans la boite d'un client en coute beaucoup plus.
 *
 * Usage : npm run mail:preview, puis ouvrir les fichiers de api/preview.
 */
const OUTPUT_DIR = join(process.cwd(), 'preview');

const sampleMessage =
  "Bonjour, je souhaite créer une SARL à Moanda avec deux associés.\nNous avons déjà les pièces d'identité et un local, mais pas les statuts.\nQuelles sont les étapes et sous quel délai ?";

async function main(): Promise<void> {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const notification = await render(
    createElement(ContactNotificationEmail, {
      reference: 'GM-7F3A2B',
      fullName: 'Jean Obiang',
      email: 'jean.obiang@example.com',
      phone: '077 12 34 56',
      subjectLabel: "Création et formalités d'entreprises",
      message: sampleMessage,
      receivedAt: 'vendredi 19 septembre 2026 à 10:24',
      origin: '41.158.12.0',
    }),
  );

  const acknowledgement = await render(
    createElement(ContactAcknowledgementEmail, {
      reference: 'GM-7F3A2B',
      firstName: 'Jean',
      subjectLabel: "Création et formalités d'entreprises",
      message: sampleMessage,
      siteUrl: 'https://www.gloire-mayombo.com',
      phoneNational: '060 34 65 22',
      phoneE164: '+24160346522',
      whatsappUrl: 'https://wa.me/24160346522',
      email: 'mayombogloire29@gmail.com',
    }),
  );

  await writeFile(join(OUTPUT_DIR, 'notification.html'), notification, 'utf8');
  await writeFile(join(OUTPUT_DIR, 'accuse-reception.html'), acknowledgement, 'utf8');

  console.log(`Modeles generes dans ${OUTPUT_DIR}`);
}

void main();
