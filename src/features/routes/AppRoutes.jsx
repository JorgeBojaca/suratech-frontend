import { Routes, Route, Navigate } from 'react-router-dom';
import LauncherPage from '../launcher/LauncherPage';
import PortfolioPage from '../portfolio/PortfolioPage';
import ProjectDetailPage from '../portfolio/ProjectDetailPage';
import CatalogPage from '../product-catalog/CatalogPage';

/**
 * AppRoutes — the route table mapping paths to feature pages.
 * Portfolio and Product Catalog are independent micro-frontends behind a shell:
 *   /                      → Launcher (choose an app)
 *   /portfolio             → Portfolio showcase
 *   /portfolio/work/:slug  → Project detail
 *   /catalog               → Product catalog
 *   *                      → redirect to the launcher
 */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LauncherPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/portfolio/work/:slug" element={<ProjectDetailPage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
