import { useId, useRef, useState, type FormEvent } from 'react';
import { CircleCheck, LoaderCircle, Send } from 'lucide-react';
import Button, { LinkButton } from '@/components/ui/Button';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { useToast } from '@/components/ui/ToastProvider';
import { useContactRequest } from '@/hooks/useContactRequest';
import { contactSubjects } from '@/data/services';
import { site } from '@/data/site';
import type { ContactPayload } from '@/types/contact';

type FormErrors = Partial<Record<keyof ContactPayload, string>>;

const EMPTY_FORM: ContactPayload = {
  fullName: '',
  email: '',
  phone: '',
  subject: contactSubjects[0].value,
  message: '',
  website: '',
  consent: false,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Les memes regles sont appliquees ici et sur le serveur.
 * Cote client pour un retour immediat, cote serveur parce qu'un controle de
 * navigateur se contourne. Le serveur reste la seule source de verite.
 */
function validate(values: ContactPayload): FormErrors {
  const errors: FormErrors = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = 'Indiquez votre nom, au moins deux caractères.';
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Cette adresse ne semble pas valide, par exemple nom@domaine.com.';
  }
  if (values.phone && values.phone.replace(/[\s.+-]/g, '').length < 8) {
    errors.phone = 'Le numéro paraît trop court. Laissez le champ vide si vous préférez.';
  }
  if (values.message.trim().length < 20) {
    errors.message = 'Décrivez votre besoin en quelques mots, au moins vingt caractères.';
  }
  if (values.message.trim().length > 2000) {
    errors.message = 'Le message dépasse 2000 caractères. Résumez, nous détaillerons ensuite.';
  }
  if (!values.consent) {
    errors.consent = "Votre accord est nécessaire pour que je puisse vous répondre.";
  }

  return errors;
}

/** Message WhatsApp preremplit a partir de ce qui est deja saisi. */
function buildWhatsAppHref(values: ContactPayload): string {
  const subjectLabel =
    contactSubjects.find((option) => option.value === values.subject)?.label ?? 'Demande';
  const lines = [
    `Bonjour, je suis ${values.fullName.trim() || '...'}.`,
    `Objet : ${subjectLabel}.`,
    values.message.trim() || '',
  ].filter(Boolean);
  return `${site.whatsapp.href}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export default function ContactForm() {
  const formId = useId();
  const { notify } = useToast();
  const [values, setValues] = useState<ContactPayload>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [reference, setReference] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const mutation = useContactRequest({
    onSuccess: (result) => {
      setReference(result.reference);
      setValues(EMPTY_FORM);
      setErrors({});
      notify('success', result.message);
    },
    onError: (error) => {
      // Le serveur peut rejeter des champs que le controle local a laisse passer.
      if (error.fieldErrors.length > 0) {
        const serverErrors: FormErrors = {};
        for (const item of error.fieldErrors) {
          serverErrors[item.field as keyof ContactPayload] = item.message;
        }
        setErrors(serverErrors);
      }
      notify('error', error.message);
    },
  });

  const field = <K extends keyof ContactPayload>(name: K, value: ContactPayload[K]) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus({ preventScroll: false });
      return;
    }

    mutation.mutate({ ...values, message: values.message.trim(), email: values.email.trim() });
  };

  const inputClasses = (hasError: boolean) =>
    `w-full rounded-sm border bg-white px-4 py-3 text-sm text-ink-700 transition-colors placeholder:text-ink-500/70 ${
      hasError ? 'border-red-600' : 'border-mist-400 hover:border-blue-600'
    }`;

  // Etat de confirmation : on ne reaffiche pas un formulaire vide comme si de
  // rien n'etait, le visiteur doit voir que son message est parti.
  if (reference) {
    return (
      <div className="rounded-sm border border-blue-500 bg-white p-8">
        <CircleCheck className="size-8 text-blue-600" aria-hidden="true" />
        <h3 className="mt-4 text-2xl text-navy-900">Votre message est parti</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-700">
          Un accusé de réception vient de vous être envoyé par courriel. Votre demande porte la
          référence <strong className="text-navy-900">{reference}</strong>.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <LinkButton href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="size-4" />
            Poursuivre sur WhatsApp
          </LinkButton>
          <Button variant="outline" type="button" onClick={() => setReference(null)}>
            Envoyer une autre demande
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="rounded-sm border border-mist-300 bg-white p-6 sm:p-8"
    >
      {/* Piege a robots : invisible a l'ecran et retire du parcours clavier. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={`${formId}-website`}>Ne remplissez pas ce champ</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website ?? ''}
          onChange={(event) => field('website', event.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-fullName`} className="block text-sm font-medium text-navy-900">
            Nom et prénom <span className="text-red-600">*</span>
          </label>
          <input
            id={`${formId}-fullName`}
            name="fullName"
            type="text"
            autoComplete="name"
            required
            value={values.fullName}
            onChange={(event) => field('fullName', event.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? `${formId}-fullName-error` : undefined}
            className={`mt-2 ${inputClasses(Boolean(errors.fullName))}`}
          />
          {errors.fullName ? (
            <p id={`${formId}-fullName-error`} className="mt-2 text-xs text-red-700">
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className="block text-sm font-medium text-navy-900">
            Adresse électronique <span className="text-red-600">*</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => field('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            className={`mt-2 ${inputClasses(Boolean(errors.email))}`}
          />
          {errors.email ? (
            <p id={`${formId}-email-error`} className="mt-2 text-xs text-red-700">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-phone`} className="block text-sm font-medium text-navy-900">
            Téléphone <span className="text-ink-500">(facultatif)</span>
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="077 00 00 00"
            value={values.phone ?? ''}
            onChange={(event) => field('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
            className={`mt-2 ${inputClasses(Boolean(errors.phone))}`}
          />
          {errors.phone ? (
            <p id={`${formId}-phone-error`} className="mt-2 text-xs text-red-700">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-subject`} className="block text-sm font-medium text-navy-900">
            Objet de la demande
          </label>
          <select
            id={`${formId}-subject`}
            name="subject"
            value={values.subject}
            onChange={(event) => field('subject', event.target.value)}
            className={`mt-2 ${inputClasses(false)}`}
          >
            {contactSubjects.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={`${formId}-message`} className="block text-sm font-medium text-navy-900">
          Votre situation <span className="text-red-600">*</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={6}
          required
          maxLength={2000}
          value={values.message}
          onChange={(event) => field('message', event.target.value)}
          placeholder="Décrivez votre demande en quelques lignes."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={`${formId}-message-help${errors.message ? ` ${formId}-message-error` : ''}`}
          className={`mt-2 resize-y ${inputClasses(Boolean(errors.message))}`}
        />
        <p id={`${formId}-message-help`} className="mt-2 text-xs text-ink-500">
          {values.message.length} / 2000 caractères. Ce formulaire n'accepte pas de pièce jointe.
        </p>
        {errors.message ? (
          <p id={`${formId}-message-error`} className="mt-1 text-xs text-red-700">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-6">
        <div className="flex items-start gap-3">
          <input
            id={`${formId}-consent`}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => field('consent', event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${formId}-consent-error` : undefined}
            className="mt-1 size-4 shrink-0 accent-blue-600"
          />
          <label htmlFor={`${formId}-consent`} className="text-sm leading-relaxed text-ink-700">
            J'accepte que ces informations soient utilisées pour traiter ma demande. Elles ne sont
            ni revendues, ni transmises à des tiers.
          </label>
        </div>
        {errors.consent ? (
          <p id={`${formId}-consent-error`} className="mt-2 text-xs text-red-700">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Envoi en cours
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" />
              Envoyer ma demande
            </>
          )}
        </Button>
        <LinkButton
          href={buildWhatsAppHref(values)}
          target="_blank"
          rel="noopener noreferrer"
          variant="quiet"
          size="lg"
        >
          Envoyer plutôt sur WhatsApp
        </LinkButton>
      </div>

      <p className="mt-4 text-xs text-ink-500" aria-live="polite">
        {mutation.isPending
          ? 'Votre message part vers la boîte du cabinet.'
          : site.listening}
      </p>
    </form>
  );
}
