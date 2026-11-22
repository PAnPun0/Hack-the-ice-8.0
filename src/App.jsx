import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AuthPage } from './pages/AuthPage';

// Простая заглушка главной страницы после входа
const DashboardPlaceholder = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">🚀 Успешный вход!</h1>
      <p className="text-slate-400 mb-6">Это защищенная панель управления (Dashboard).</p>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = '/login';
        }}
        className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-medium transition"
      >
        Выйти из аккаунта
      </button>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Страница логина/регистрации */}
          <Route path="/login" element={<AuthPage />} />

          {/* Защищенные роуты (доступны только после логина) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPlaceholder />} />
          </Route>

          {/* Если зашли на главную '/', перенаправляем на /dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* На случай неизвестных путей - редирект */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;