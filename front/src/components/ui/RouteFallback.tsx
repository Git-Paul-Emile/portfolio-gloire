/**
 * Etat de chargement affiche pendant le telechargement d'une route paresseuse.
 * `aria-busy` et le texte lisible informent aussi les lecteurs d'ecran.
 */
export default function RouteFallback() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center px-6"
      role="status"
      aria-busy="true"
    >
      <div className="flex items-center gap-3 text-ink-500">
        <span
          className="size-4 animate-spin rounded-full border-2 border-navy-900/20 border-t-blue-600"
          aria-hidden="true"
        />
        <span className="text-sm">Chargement de la page</span>
      </div>
    </div>
  );
}
