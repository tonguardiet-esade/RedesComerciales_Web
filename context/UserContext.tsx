
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { User, UserLevel } from '../types';
import { supabase } from '../services/supabaseClient';

interface UserContextType {
  user: User | null;
  registerUser: (data: Partial<User> & { password?: string }) => void;
  loginAsGuest: (level?: UserLevel) => void;
  updateUser: (updates: Partial<User>) => void;
  manualLogin: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const findUserInTables = async (userId: string): Promise<{ data: any, tableName: string } | null> => {
  const tables = ["Prescritor", "Colaborador", "Delegado_Sin_Redaccion", "Delegado_Oficina_Tecnica"];
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').eq('id', userId).single();
    if (data && !error) return { data, tableName: table };
  }
  return null;
};

const mapDbUserToAppUser = (dbUser: any): User => {
  return {
    id: dbUser.id,
    nombre: dbUser.nombre_completo || dbUser.nombre || '',
    email: dbUser.correo || dbUser.email || '',
    telefono: dbUser.telefono || '',
    nivel_elegido: dbUser.nivel_elegido || 1,
    fecha_registro: dbUser.fecha_registro || new Date().toISOString(),
    application_status: dbUser.application_status || (dbUser.nivel_elegido === 2 ? 'not_started' : 'approved'),
    cv_link: dbUser.cv_link || '',
    cover_letter: dbUser.cover_letter || '',
    validation_status: dbUser.validation_status || 'pending',
    contract_signed: dbUser.contract_signed || false,
    m1_completed: dbUser.m1_completed || false,
    m2_completed: dbUser.m2_completed || false,
    m3_completed: dbUser.m3_completed || false,
    m4_completed: dbUser.m4_completed || false,
    m5_completed: dbUser.m5_completed || false,
    test_score: dbUser.test_score,
    test_passed: dbUser.test_passed || false,
    test_feedback: dbUser.test_feedback,
    task_score: dbUser.task_score,
    task_status: dbUser.task_status || 'pending',
    task_feedback: dbUser.task_feedback,
    interview_date: dbUser.interview_date,
    interview_time: dbUser.interview_time,
    meet_link: dbUser.meet_link,
    estado_actual: dbUser.estado_actual || (dbUser.nivel_elegido === 1 ? 'aprobado' : 'en formación')
  };
};

export const UserProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userTableName, setUserTableName] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      const storedUserId = localStorage.getItem('fundswin_user_id');
      if (!storedUserId) return;

      if (storedUserId === 'demo') {
        const storedDemoUser = localStorage.getItem('fundswin_demo_user');
        if (storedDemoUser) setUser(JSON.parse(storedDemoUser));
      } else if (storedUserId === 'admin-dev-bypass') {
        // No buscar en DB
      } else {
        try {
          const result = await findUserInTables(storedUserId);
          if (result) {
            setUser(mapDbUserToAppUser(result.data));
            setUserTableName(result.tableName);
          }
        } catch (err) {
          console.error("Auth init error:", err);
        }
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
         const result = await findUserInTables(session.user.id);
         if (result) {
           const appUser = mapDbUserToAppUser(result.data);
           setUser(appUser);
           setUserTableName(result.tableName);
           localStorage.setItem('fundswin_user_id', appUser.id);
         }
      } else if (event === 'SIGNED_OUT') {
         setUser(null);
         setUserTableName(null);
         localStorage.removeItem('fundswin_user_id');
         localStorage.removeItem('fundswin_demo_user');
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const manualLogin = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem('fundswin_user_id', userData.id);
    let table = "";
    switch(userData.nivel_elegido) {
        case 1: table = "Prescritor"; break;
        case 2: table = "Colaborador"; break;
        case 3: table = "Delegado_Sin_Redaccion"; break;
        case 4: table = "Delegado_Oficina_Tecnica"; break;
        default: table = "Prescritor";
    }
    setUserTableName(table);
  }, []);

  const loginAsGuest = useCallback((level: UserLevel = UserLevel.EJEMPLOS_DE_VENTA) => {
    const demoUser: User = {
      id: "demo", nombre: "Usuario Invitado", email: "invitado@demo.com", telefono: "000000000",
      nivel_elegido: level, fecha_registro: new Date().toISOString(),
      application_status: level === UserLevel.COLABORADOR ? 'not_started' : 'approved', 
      validation_status: 'pending',
      contract_signed: false, m1_completed: false, m2_completed: false, m3_completed: false, m4_completed: false, m5_completed: false,
      test_score: null, test_passed: false, task_score: null, task_status: 'pending', 
      estado_actual: level === UserLevel.EJEMPLOS_DE_VENTA ? 'aprobado' : 'demo'
    };
    setUser(demoUser);
    localStorage.setItem('fundswin_user_id', 'demo');
    localStorage.setItem('fundswin_demo_user', JSON.stringify(demoUser));
  }, []);

  const updateUser = useCallback(async (updates: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, ...updates };
      
      // Lógica de estado global
      if (updatedUser.nivel_elegido === 1) {
          if (!updatedUser.estado_actual || updatedUser.estado_actual === 'en formación') {
            updatedUser.estado_actual = 'aprobado';
          }
      } else {
          if (updatedUser.test_passed && updatedUser.task_status === 'passed') updatedUser.estado_actual = 'listo para entrevista';
      }

      if (prevUser.id === 'demo') localStorage.setItem('fundswin_demo_user', JSON.stringify(updatedUser));
      else if (userTableName) {
          supabase.from(userTableName).update(updates).eq('id', prevUser.id).then(({error}) => {
              if (error) console.warn("Supabase update fail:", error.message);
          });
      }
      return updatedUser;
    });
  }, [userTableName]);

  const logout = useCallback(() => {
    setUser(null);
    setUserTableName(null);
    localStorage.removeItem('fundswin_user_id');
    localStorage.removeItem('fundswin_demo_user');
    supabase.auth.signOut();
  }, []);

  const value = useMemo(() => ({
    user, registerUser: () => {}, loginAsGuest, updateUser, logout, manualLogin
  }), [user, loginAsGuest, updateUser, logout, manualLogin]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
