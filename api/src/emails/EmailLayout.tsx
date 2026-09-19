import type { ReactNode } from 'react';
import { Body, Container, Head, Html, Preview, Section, Text } from '@react-email/components';
import { styles } from './theme.js';

interface EmailLayoutProps {
  /** Texte affiche dans l'apercu de la boite de reception. */
  preview: string;
  children: ReactNode;
  footer: ReactNode;
}

/**
 * Enveloppe commune aux deux courriels : en-tete, corps, pied de page.
 * `lang="fr"` et `dir="ltr"` aident les lecteurs d'ecran des clients de
 * messagerie a prononcer correctement le contenu.
 */
export default function EmailLayout({ preview, children, footer }: EmailLayoutProps) {
  return (
    <Html lang="fr" dir="ltr">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.headerName}>NGOLO-MAYOMBO Gloire Barthélémie</Text>
            <Text style={styles.headerRole}>Juriste en droit des affaires</Text>
          </Section>

          <Section style={styles.content}>{children}</Section>

          <Section style={styles.footer}>{footer}</Section>
        </Container>
      </Body>
    </Html>
  );
}
