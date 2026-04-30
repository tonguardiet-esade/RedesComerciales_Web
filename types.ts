
export enum UserLevel {
  EJEMPLOS_DE_VENTA = 1,
  COLABORADOR = 2,
  MOCOTA_SIN_REDACCION = 3,
  MOCOTA_CON_REDACCION = 4
}

export interface User {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  nivel_elegido: UserLevel;
  fecha_registro: string;

  // Application Data (Specific for Colaboradores)
  application_status?: 'not_started' | 'pending' | 'approved' | 'rejected' | 'hr_interview' | 'sales_interview' | 'selected';
  cv_link?: string;
  linkedin_url?: string;
  cover_letter?: string;
  
  // Validation status after contract
  validation_status?: 'pending' | 'passed' | 'failed';

  // Legal
  contract_signed?: boolean;

  // Progress
  m1_completed: boolean;
  m2_completed: boolean;
  m3_completed: boolean;
  m4_completed: boolean;
  m5_completed: boolean;

  // Test
  test_score: number | null;
  test_passed: boolean;
  test_feedback?: string;

  // Task
  task_score: number | null;
  task_status: 'pending' | 'passed' | 'failed';
  task_feedback?: string;

  // Interview Schedule
  interview_date?: string;
  interview_time?: string;
  meet_link?: string;

  // Global State
  estado_actual: 'en formación' | 'listo para entrevista' | 'descartado' | 'demo';
}

export interface AiEvalResponse {
  score: number;
  passed: boolean;
  feedback: string;
}

export interface TaskEvalResponse {
  task_score: number;
  task_status: 'passed' | 'failed';
  feedback: string;
}
