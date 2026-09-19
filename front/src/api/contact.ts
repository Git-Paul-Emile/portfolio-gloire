import { httpClient } from '@/api/axiosConfig';
import type { ContactPayload, ContactSuccess } from '@/types/contact';

/** Module d'appels de l'entite « contact ». Un fichier par entite. */
export async function sendContactRequest(payload: ContactPayload): Promise<ContactSuccess> {
  const { data } = await httpClient.post<{ data: ContactSuccess }>('/contact', payload);
  return data.data;
}
