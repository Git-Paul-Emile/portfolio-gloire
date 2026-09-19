import axios, { AxiosError } from 'axios';
import type { FieldError } from '@/types/contact';

/**
 * Instance HTTP unique du site.
 * Aucun composant n'appelle axios directement : ils passent par un module de
 * `src/api/` puis par un hook. Cela garde un seul endroit ou changer l'URL de
 * base, les delais ou la facon de traduire une erreur.
 */
export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api/v1',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

/** Erreur metier deja traduite en francais, prete a etre affichee. */
export class ApiError extends Error {
  readonly status: number;
  readonly fieldErrors: FieldError[];

  constructor(message: string, status: number, fieldErrors: FieldError[] = []) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

interface ApiErrorBody {
  error?: {
    code?: string;
    message?: string;
    details?: FieldError[];
  };
}

/**
 * Intercepteur de reponse : le reste du code ne manipule jamais un AxiosError.
 * Chaque cas produit un message actionnable, jamais un code technique brut.
 */
httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorBody>) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(
        new ApiError(
          "Le serveur met trop de temps à répondre. Réessayez dans un instant, ou joignez-moi sur WhatsApp.",
          408,
        ),
      );
    }

    if (!error.response) {
      return Promise.reject(
        new ApiError(
          "Impossible de joindre le serveur. Vérifiez votre connexion, ou passez par WhatsApp.",
          0,
        ),
      );
    }

    const { status, data } = error.response;
    const details = data?.error?.details ?? [];

    if (status === 400 || status === 422) {
      return Promise.reject(
        new ApiError(
          data?.error?.message ?? 'Certains champs doivent être corrigés.',
          status,
          details,
        ),
      );
    }

    if (status === 429) {
      return Promise.reject(
        new ApiError(
          "Trop de demandes envoyées depuis cet appareil. Patientez quelques minutes avant de réessayer.",
          status,
        ),
      );
    }

    return Promise.reject(
      new ApiError(
        "L'envoi a échoué pour une raison technique. Le message n'est pas parti : utilisez le téléphone ou WhatsApp en attendant.",
        status,
      ),
    );
  },
);
