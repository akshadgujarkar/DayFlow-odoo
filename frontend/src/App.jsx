import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

/**
 * App.jsx — Root router shell (Phase 0 placeholder).
 *
 * Route guards and full routing will be wired in Phase 3.
 * Module pages will be added in Phases 3–9.
 *
 * Preserve this router structure; add <Route> entries as modules land.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Phase 0 placeholder — replace with real module routes in Phase 3 */}
        <Route
          path="/"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">HRMS</h1>
                <p className="text-gray-500">
                  Phase 0 — Project setup complete. Modules coming soon.
                </p>
              </div>
            </div>
          }
        />
        {/* Catch-all redirect to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
