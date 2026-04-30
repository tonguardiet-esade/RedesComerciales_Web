
import { GoogleGenAI, Type } from "@google/genai";
import { UserLevel } from "../types";

// Always initialize GoogleGenAI with a named parameter using process.env.GEMINI_API_KEY directly
const getAiClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY not found");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

// --- Role Matcher (New) ---

export const recommendRole = async (
  userDescription: string
): Promise<{ recommendedLevel: number; roleName: string; justification: string } | null> => {
  const ai = getAiClient();
  if (!ai) return null;

  const prompt = `
    Eres un experto consultor de Talento para Redescomerciales.ai. Tu objetivo es recomendar el rol ideal para un candidato basándote en su descripción.
    
    INFORMACIÓN DE LOS ROLES (Contexto interno):
    
    1. NIVEL 1: EJEMPLOS DE VENTA
       - Perfil: Profesional senior, consultor independiente, jubilado activo.
       - Activo clave: Su red de contactos (networking).
       - Dedicación: Mínima/Nula. No vende, solo refiere.
       - Motivación: Ingresos extra pasivos sin complicaciones.
       - Coste entrada: 0€. Comisión: 7,5%.
       
    2. NIVEL 2: COLABORADOR
       - Perfil: Comercial multicartera, asesor, agencia de marketing.
       - Activo clave: Cartera de clientes activa (Pymes).
       - Dedicación: Parcial (10-20h/semana). Diversificación.
       - Tarea: Hace la venta y el discovery, pero no la parte técnica.
       - Coste entrada: 3.000€/año. Comisión: 15%.
       
    3. NIVEL 3: DELEGADO MOCOTA (Gestión/Franquicia)
       - Perfil: Emprendedor, líder comercial, ex-directivo de banca/seguros.
       - Activo clave: Capacidad de gestión y venta full-time.
       - Dedicación: Completa/Exclusiva en su zona.
       - Modelo: Franquicia provincial. Gestiona red de prescriptores.
       - Coste entrada: 12.000€/año. Comisión: 30%.
       
    4. NIVEL 4: OFICINA MOCOTA (Técnica)
       - Perfil: Consultora establecida, experto en I+D, gestoría potente.
       - Activo clave: Capacidad técnica de redacción + venta.
       - Dedicación: Negocio principal. Ciclo completo (Venta + Redacción).
       - Motivación: Máxima rentabilidad y control total.
    
    DESCRIPCIÓN DEL USUARIO:
    "${userDescription}"
    
    Analiza el perfil y selecciona el nivel (1-4) que mejor encaja. 
    Justifica tu respuesta hablándole directamente al usuario ("Te recomiendo el nivel X porque...").
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      recommendedLevel: { type: Type.INTEGER },
      roleName: { type: Type.STRING },
      justification: { type: Type.STRING },
    },
    required: ["recommendedLevel", "roleName", "justification"],
    propertyOrdering: ["recommendedLevel", "roleName", "justification"],
  };

  try {
    // Upgraded to gemini-3-pro-preview for advanced reasoning tasks as per guidelines.
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    // Access .text property directly (not a method)
    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Error recommending role:", error);
    return null;
  }
};

// --- Test Evaluator ---

export const evaluateTest = async (
  answers: Record<string, string>
): Promise<{ score: number; passed: boolean; feedback: string } | null> => {
  const ai = getAiClient();
  if (!ai) return null;

  const prompt = `
    Eres un Agente Evaluador experto en financiación pública y ventas B2B.
    Evalúa las siguientes respuestas de un candidato a Redescomerciales.ai.
    
    Criterios:
    - Precisión conceptual sobre subvenciones.
    - Actitud proactiva y comercial.
    - Claridad en la propuesta de valor.
    
    Respuestas del candidato:
    ${JSON.stringify(answers)}
    
    Devuelve un JSON con score (0-100), passed (true si score >= 70), y feedback constructivo.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      score: { type: Type.INTEGER },
      passed: { type: Type.BOOLEAN },
      feedback: { type: Type.STRING },
    },
    required: ["score", "passed", "feedback"],
    propertyOrdering: ["score", "passed", "feedback"],
  };

  try {
    // Upgraded to gemini-3-pro-preview for complex reasoning task.
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Error evaluating test:", error);
    return null;
  }
};

// --- Task Evaluator ---

export const evaluateTask = async (
  taskContent: string,
  level: UserLevel
): Promise<{ task_score: number; task_status: "passed" | "failed"; feedback: string } | null> => {
  const ai = getAiClient();
  if (!ai) return null;

  let taskContext = "";
  switch (level) {
    case UserLevel.EJEMPLOS_DE_VENTA: taskContext = "Generar 3 leads potenciales válidos."; break;
    case UserLevel.COLABORADOR: taskContext = "Escribir un mini pitch comercial de 30 segundos."; break;
    case UserLevel.MOCOTA_SIN_REDACCION: taskContext = "Realizar un análisis de pipeline comercial."; break;
    case UserLevel.MOCOTA_CON_REDACCION: taskContext = "Resumen de proyecto técnico (10-15 líneas)."; break;
  }

  const prompt = `
    Eres un Agente Evaluador de Tareas para Redescomerciales.ai.
    Nivel del candidato: ${level}
    Tarea esperada: ${taskContext}
    
    Respuesta del candidato:
    "${taskContent}"
    
    Evalúa claridad, esfuerzo, estructura y comprensión del modelo de negocio.
    Devuelve un JSON con task_score (0-100), task_status ("passed" si score >= 70, sino "failed") y feedback.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      task_score: { type: Type.INTEGER },
      task_status: { type: Type.STRING },
      feedback: { type: Type.STRING },
    },
    required: ["task_score", "task_status", "feedback"],
    propertyOrdering: ["task_score", "task_status", "feedback"],
  };

  try {
    // Upgraded to gemini-3-pro-preview for technical and commercial reasoning.
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Error evaluating task:", error);
    return null;
  }
};

// --- Chat Assistant ---

export const getChatResponse = async (message: string, context: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Lo siento, no puedo responder en este momento.";

  const systemInstruction = `Eres un experto de Redescomerciales.ai, una plataforma SaaS con IA para gestión de ayudas públicas. 
  REGLA CRÍTICA: Solo puedes responder dudas sobre Redescomerciales.ai y su ecosistema (roles, procesos, comisiones). 
  Si el usuario pregunta algo ajeno a Redescomerciales.ai (ej: cultura, política, ayuda general), responde exactamente: 
  "Lo siento, como asistente especializado de Redescomerciales.ai solo puedo resolver dudas relacionadas con nuestro ecosistema y plataforma."`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Contexto detallado sobre el módulo o sección: ${context}. \n\nUsuario pregunta: ${message}`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2 // Menos creatividad para ser más preciso y ceñirse al contexto
      }
    });
    // Accessing .text property directly (not a method).
    return response.text || "Sin respuesta.";
  } catch (error) {
    console.error("Chat error", error);
    return "Error de conexión con el asistente.";
  }
};
