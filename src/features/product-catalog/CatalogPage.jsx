import Container from '../../components/Container';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import CatalogView from './components/CatalogView';
import CatalogErrorBoundary from './components/CatalogErrorBoundary';
import CatalogFeedbackProvider from './feedback/CatalogFeedbackProvider';
import ConnectivityBanner from './feedback/ConnectivityBanner';
import ToastViewport from './feedback/ToastViewport';

/**
 * CatalogPage — route entry for the product catalog (/catalog).
 * The feedback shell: it provides the global feedback layer for the feature —
 *   - ConnectivityBanner: app-wide "offline" bar (online/offline events)
 *   - ToastViewport + CatalogFeedbackProvider: global toasts that soft-failing
 *     hooks (useCatalogPage) raise so async/network failures aren't silent
 *   - an outer CatalogErrorBoundary: catch-all for render crashes anywhere in
 *     the catalog (the per-region boundaries live inside CatalogView)
 *
 * Data + composition live in CatalogView, which must render inside the provider
 * so useNotify() resolves.
 */
function CatalogPage() {
  return (
    <CatalogFeedbackProvider>
      <ConnectivityBanner />
      <SiteHeader type="catalog" />

      <main>
        <Container className="st:pb-16">
          <CatalogErrorBoundary>
            <CatalogView />
          </CatalogErrorBoundary>
        </Container>
      </main>

      <SiteFooter />
      <ToastViewport />
    </CatalogFeedbackProvider>
  );
}

export default CatalogPage;
