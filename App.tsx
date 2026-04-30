
import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import { SettingsProvider } from './context/SettingsContext';
import { User } from './types';
import { supabase } from './services/supabaseClient';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Portal from './pages/Portal';
import Module1 from './pages/Module1';
import Module2 from './pages/Module2';
import Module3 from './pages/Module3';
import Module4 from './pages/Module4';
import Module5 from './pages/Module5'; // Añadido
import TestFinal from './pages/TestFinal';
import Interview from './pages/Interview';
import AccessDenied from './pages/AccessDenied';
import UpdatePassword from './pages/UpdatePassword';
import Contract from './pages/Contract';
import Methodology from './pages/Methodology';
import Solutions from './pages/Solutions';
import Legal from './pages/Legal';
import SuccessCases from './pages/SuccessCases';

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
  const hasRun = useRef(false);

  useLayoutEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      loginAsGuest();
      navigate('/portal', { replace: true });
    }
  }, [loginAsGuest, navigate]);

  return null;
};

const AuthListener = () => {
  const navigate = useNavigate();
  useEffect(() => {
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
  return (
    <>
      <AuthListener />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/metodologia" element={<Methodology />} />
        <Route path="/soluciones" element={<Solutions />} />
        <Route path="/casos-de-exito" element={<SuccessCases />} />
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
    </>
  );
};

const App = () => {
  return (
    <Router>
      <SettingsProvider>
        <UserProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </UserProvider>
      </SettingsProvider>
    </Router>
  );
};

export default App;
