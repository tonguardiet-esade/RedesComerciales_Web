const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;

const STORAGE_KEY = 'gw_utm_params';

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export function captureUtmFromUrl(): UtmParams {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm: UtmParams = {};
  let found = false;

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utm[key] = value;
      found = true;
    }
  });

  if (found) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  }

  return utm;
}

export function getStoredUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}
