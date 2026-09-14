
import React, { useState, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { User } from './types';
import { supabase } from './services/supabaseClient';
import Layout from './components/Layout';
import Loader from './components/mosaic/Loader';
import MosaikTransition from './components/mosaic/MosaikTransition';
import { useLenis } from './hooks/useLenis';
import { useScrollToTop } from './hooks/useScrollToTop';

const Landing = lazy(() => import('./pages/Landing'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const Welcome = lazy(() => import('./pages/Welcome'));
const Portal = lazy(() => import('./pages/Portal'));
const Module1 = lazy(() => import('./pages/Module1'));
const Module2 = lazy(() => import('./pages/Module2'));
const Module3 = lazy(() => import('./pages/Module3'));
const Module4 = lazy(() => import('./pages/Module4'));
const Module5 = lazy(() => import('./pages/Module5'));
const TestFinal = lazy(() => import('./pages/TestFinal'));
const Interview = lazy(() => import('./pages/Interview'));
const AccessDenied = lazy(() => import('./pages/AccessDenied'));
const UpdatePassword = lazy(() => import('./pages/UpdatePassword'));
const Contract = lazy(() => import('./pages/Contract'));
const Methodology = lazy(() => import('./pages/Methodology'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Legal = lazy(() => import('./pages/Legal'));
const SuccessCases = lazy(() => import('./pages/SuccessCases'));
const Contact = lazy(() => import('./pages/Contact'));

const PageFallback = () => {
  const { t } = useSettings();
  return (
    <div className="mosaic-container pt-32 pb-16">
      <p className="mosaic-label text-mosaic-cyan">{t('common.loading')}</p>
    </div>
  );
};

interface ProtectedRouteProps {
  children?: React.ReactNode;
  check?: (user: User) => boolean;
}

const ProtectedRoute = ({ children, check }: ProtectedRouteProps) => {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" />;
  if (user.id === 'demo') return <>{children}</>;
  if (check && !check(user)) return <Navigate to="/acceso-denegado" />;
  return <>{children}</>;
};

const GuestJoin = () => {
  const { loginAsGuest } = useUser();
  const navigate = useNavigate();
  const hasRun = React.useRef(false);

  React.useLayoutEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      loginAsGuest();
      navigate('/portal', { replace: true });
    }
  }, [loginAsGuest, navigate]);

  return null;
};

/** Compatibilidad con enlaces antiguos tipo /#/soluciones */
const HashRedirect = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/')) {
      navigate(hash.slice(1), { replace: true });
    }
  }, [navigate]);
  return null;
};

const AuthListener = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, _session) => {
      if (event === "PASSWORD_RECOVERY") {
        navigate('/update-password');
      }
    });
    return () => authListener.subscription.unsubscribe();
  }, [navigate]);
  return null;
};

const AppRoutes = () => {
  useLenis();
  useScrollToTop();
  return (
    <>
      <HashRedirect />
      <AuthListener />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/metodologia" element={<Methodology />} />
          <Route path="/soluciones" element={<Solutions />} />
          <Route path="/casos-de-exito" element={<SuccessCases />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/unirse-invitado" element={<GuestJoin />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/bienvenida" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
          <Route path="/portal" element={<ProtectedRoute><Portal /></ProtectedRoute>} />
          <Route path="/modulo1" element={<ProtectedRoute><Module1 /></ProtectedRoute>} />
          <Route path="/modulo2" element={<ProtectedRoute check={(u) => u.m1_completed}><Module2 /></ProtectedRoute>} />
          <Route path="/modulo3" element={<ProtectedRoute check={(u) => u.m2_completed}><Module3 /></ProtectedRoute>} />
          <Route path="/modulo4" element={<ProtectedRoute check={(u) => u.m3_completed}><Module4 /></ProtectedRoute>} />
          <Route path="/modulo5" element={<ProtectedRoute check={(u) => u.m4_completed}><Module5 /></ProtectedRoute>} />
          <Route path="/test-final" element={<ProtectedRoute check={(u) => u.m4_completed}><TestFinal /></ProtectedRoute>} />
          <Route path="/contrato" element={<ProtectedRoute check={(u) => u.m5_completed || u.test_passed}><Contract /></ProtectedRoute>} />
          <Route path="/entrevista" element={<ProtectedRoute check={(u) => u.m5_completed || u.test_passed}><Interview /></ProtectedRoute>} />
          <Route path="/acceso-denegado" element={<AccessDenied />} />
          <Route path="/aviso-legal" element={<Legal type="legal" />} />
          <Route path="/politica-cookies" element={<Legal type="cookies" />} />
          <Route path="/politica-privacidad" element={<Legal type="privacy" />} />
        </Routes>
      </Suspense>
    </>
  );
};

const AppShell = () => {
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !sessionStorage.getItem('mosaic-visited');
  });
  const [transitioning, setTransitioning] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    sessionStorage.setItem('mosaic-visited', '1');
    setShowLoader(false);
    setTransitioning(true);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    setTransitioning(false);
  }, []);

  return (
    <>
      {showLoader && <Loader onComplete={handleLoaderComplete} />}
      <MosaikTransition active={transitioning} onComplete={handleTransitionComplete} />
      <Layout>
        <AppRoutes />
      </Layout>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <SettingsProvider>
        <UserProvider>
          <AppShell />
        </UserProvider>
      </SettingsProvider>
    </Router>
  );
};

export default App;
