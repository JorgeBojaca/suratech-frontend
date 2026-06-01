import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AppRoutes from './features/routes/AppRoutes'
import './core/theme/index.css'

/**
 * ScrollToHash — React Router doesn't scroll to URL hashes on navigation, so
 * we do it: after each location change, scroll the #id element into view.
 * Works cross-page (e.g. detail → "/#work" mounts home, then scrolls).
 */
function ScrollToHash() {
  const { hash, key } = useLocation()

  useEffect(() => {
    if (!hash) return;
    
    const el = document.getElementById(hash.slice(1))
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [hash, key]) // key changes even when re-navigating to the same hash

  return null
}

function App() {
  return (
    <>
      <ScrollToHash />
      <AppRoutes />
    </>
  )
}

export default App
