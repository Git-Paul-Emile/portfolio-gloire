/** Contrat partage avec l'API. Toute evolution doit etre faite des deux cotes. */
export interface ContactPayload {
  fullName: string;
  email: string;
  phone?: string;
  /** Identifiant d'un domaine d'intervention, ou « autre ». */
  subject: string;
  message: string;
  /** Champ piege, invisible pour un humain. Doit rester vide. */
  website?: string;
  consent: boolean;
}

export interface ContactSuccess {
  message: string;
  /** Reference courte communiquee au visiteur. */
  reference: string;
}

export interface FieldError {
  field: string;
  message: string;
}
