import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router';
import MainLayout from '@/layouts/MainLayout';
import RouteFallback from '@/components/ui/RouteFallback';
import HomePage from '@/pages/HomePage';

/**
 * Seule la page d'accueil est dans le bundle initial : c'est la seule que le
 * visiteur voit en arrivant. Les pages legales et la page 404 sont chargees a
 * la demande, ce qui evite de payer leur poids au premier affichage.
 */
const LegalNoticePage = lazy(() => import('@/pages/legal/LegalNoticePage'));
const PrivacyPage = lazy(() => import('@/pages/legal/PrivacyPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="mentions-legales"
          element={
            <Suspense fallback={<RouteFallback />}>
              <LegalNoticePage />
            </Suspense>
          }
        />
        <Route
          path="politique-de-confidentialite"
          element={
            <Suspense fallback={<RouteFallback />}>
              <PrivacyPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
