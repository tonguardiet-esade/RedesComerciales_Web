
/**
 * Servicio para gestionar Google Calendar API y generar enlaces de Meet
 */

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

// Sustituye por tu Client ID real para producción.
const CLIENT_ID = "TU_CLIENT_ID_REAL.apps.googleusercontent.com"; 
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

let tokenClient: any;
let gapiInited = false;
let gisInited = false;

export const isCalendarConfigured = () => {
  return CLIENT_ID && !CLIENT_ID.startsWith("TU_CLIENT_ID");
};

export const initCalendarAPI = () => {
  if (!isCalendarConfigured()) return Promise.resolve(false);

  return new Promise((resolve) => {
    try {
      window.gapi.load('client', async () => {
        await window.gapi.client.init({
          apiKey: process.env.API_KEY,
          discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
        maybeResolve();
      });

      tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', 
      });
      gisInited = true;
      maybeResolve();
    } catch {
      resolve(false);
    }

    function maybeResolve() {
      if (gapiInited && gisInited) resolve(true);
    }
  });
};

export const connectGoogle = (): Promise<string> => {
  if (!isCalendarConfigured()) {
    // Modo Simulación para IA Studio
    return new Promise((resolve) => {
        setTimeout(() => resolve("demo-token"), 800);
    });
  }

  return new Promise((resolve, reject) => {
    if (!tokenClient) return reject(new Error("SDK de Google no cargado."));
    tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) reject(resp);
      resolve(resp.access_token);
    };
    try {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } catch (err) {
      reject(err);
    }
  });
};

export const createMeetingEvent = async (candidateName: string, candidateEmail: string, date: string, time: string) => {
  if (!isCalendarConfigured()) {
    // Generar enlace ficticio para pruebas
    const randomCode = Math.random().toString(36).substring(2, 5) + "-" + 
                       Math.random().toString(36).substring(2, 6) + "-" + 
                       Math.random().toString(36).substring(2, 5);
    
    console.log(`[SIMULACIÓN] Enviando correo de invitación a: ${candidateEmail}`);
    
    return {
      meetLink: `https://meet.google.com/${randomCode}`,
      eventId: "demo-event-" + Date.now(),
      emailSent: true
    };
  }

  try {
    const startDateTime = `${date}T${time}:00`;
    const endDateTime = new Date(new Date(startDateTime).getTime() + 45 * 60000).toISOString();

    const event = {
      'summary': `Entrevista Redescomerciales.ai: ${candidateName}`,
      'description': `Entrevista de validación.\nCandidato: ${candidateName}\nEmail: ${candidateEmail}`,
      'start': { 'dateTime': startDateTime, 'timeZone': 'Europe/Madrid' },
      'end': { 'dateTime': endDateTime, 'timeZone': 'Europe/Madrid' },
      'attendees': [{ 'email': candidateEmail }],
      'conferenceData': { 
        'createRequest': { 
          'requestId': `meet-${Date.now()}`, 
          'conferenceSolutionKey': { 'type': 'hangoutsMeet' } 
        } 
      },
    };

    // 'sendUpdates': 'all' asegura que Google envíe el correo automáticamente a los attendees
    const response = await window.gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event,
      'conferenceDataVersion': 1,
      'sendUpdates': 'all'
    });

    return {
      meetLink: response.result.conferenceData?.entryPoints?.find((ep: any) => ep.entryPointType === 'video')?.uri || "",
      eventId: response.result.id,
      emailSent: true
    };
  } catch (err) {
    console.error("Error Google API:", err);
    return null;
  }
};
