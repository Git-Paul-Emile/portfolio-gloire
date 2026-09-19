import { useMutation } from '@tanstack/react-query';
import { sendContactRequest } from '@/api/contact';
import { ApiError } from '@/api/axiosConfig';
import type { ContactPayload, ContactSuccess } from '@/types/contact';

/**
 * Hook metier de l'envoi du formulaire.
 * Le composant ne connait ni axios, ni l'URL, ni la forme de la reponse : il
 * declenche `mutate` et lit `isPending`, `isSuccess`, `error`.
 */
export function useContactRequest(options: {
  onSuccess: (result: ContactSuccess) => void;
  onError: (error: ApiError) => void;
}) {
  return useMutation<ContactSuccess, ApiError, ContactPayload>({
    mutationFn: sendContactRequest,
    onSuccess: options.onSuccess,
    onError: options.onError,
  });
}
