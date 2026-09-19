/**
 * Jetons visuels des courriels.
 * Un client de messagerie ne comprend ni variables CSS ni feuille de style
 * externe : chaque style est applique en ligne. Les valeurs sont centralisees
 * ici pour que les deux modeles restent coherents avec le site.
 */
export const theme = {
  navy: '#0b1f3a',
  navyDeep: '#06131f',
  blue: '#325de8',
  blueSoft: '#e3e9fd',
  mist: '#f3f5f7',
  border: '#d3dae0',
  ink: '#2b3440',
  inkSoft: '#46525f',
  fontSans:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  fontSerif: "Georgia, 'Times New Roman', serif",
} as const;

export const styles = {
  body: {
    backgroundColor: theme.mist,
    fontFamily: theme.fontSans,
    margin: 0,
    padding: '24px 0',
  },
  container: {
    backgroundColor: '#ffffff',
    border: `1px solid ${theme.border}`,
    borderRadius: '4px',
    margin: '0 auto',
    maxWidth: '600px',
    overflow: 'hidden',
    width: '100%',
  },
  header: {
    backgroundColor: theme.navy,
    borderBottom: `3px solid ${theme.blue}`,
    padding: '28px 32px',
  },
  headerName: {
    color: '#ffffff',
    fontFamily: theme.fontSerif,
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '26px',
    margin: 0,
  },
  headerRole: {
    color: theme.blue,
    fontSize: '11px',
    letterSpacing: '2px',
    margin: '6px 0 0',
    textTransform: 'uppercase' as const,
  },
  content: { padding: '32px' },
  heading: {
    color: theme.navy,
    fontFamily: theme.fontSerif,
    fontSize: '22px',
    lineHeight: '30px',
    margin: '0 0 16px',
  },
  paragraph: {
    color: theme.ink,
    fontSize: '15px',
    lineHeight: '24px',
    margin: '0 0 16px',
  },
  small: {
    color: theme.inkSoft,
    fontSize: '13px',
    lineHeight: '20px',
    margin: '0 0 8px',
  },
  label: {
    color: theme.inkSoft,
    fontSize: '11px',
    letterSpacing: '1.4px',
    margin: '0 0 4px',
    textTransform: 'uppercase' as const,
  },
  value: {
    color: theme.ink,
    fontSize: '15px',
    lineHeight: '22px',
    margin: '0 0 18px',
  },
  quote: {
    backgroundColor: theme.mist,
    borderLeft: `3px solid ${theme.blue}`,
    color: theme.ink,
    fontSize: '15px',
    lineHeight: '24px',
    margin: '0 0 20px',
    padding: '16px 18px',
    whiteSpace: 'pre-wrap' as const,
  },
  badge: {
    backgroundColor: theme.blueSoft,
    color: theme.navy,
    display: 'inline-block',
    fontSize: '13px',
    fontWeight: 600,
    padding: '6px 12px',
  },
  hr: {
    borderColor: theme.border,
    margin: '24px 0',
  },
  footer: {
    backgroundColor: theme.navyDeep,
    padding: '20px 32px',
  },
  footerText: {
    color: '#a8b6c6',
    fontSize: '12px',
    lineHeight: '19px',
    margin: 0,
  },
  link: { color: theme.blue, textDecoration: 'underline' },
} as const;
