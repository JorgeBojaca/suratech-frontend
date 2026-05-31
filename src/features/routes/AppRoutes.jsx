import { Routes, Route, Navigate } from 'react-router-dom';
import PortfolioPage from '../portfolio/PortfolioPage';
import ProjectDetailPage from '../portfolio/ProjectDetailPage';

/**
 * AppRoutes — the route table mapping paths to feature pages.
 *   /            → Showcase (home)
 *   /work/:slug  → Project detail
 *   *            → redirect home
 */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/work/:slug" element={<ProjectDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
