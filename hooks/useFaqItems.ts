import { useSettings } from '../context/SettingsContext';

export function useFaqItems(count = 7) {
  const { t } = useSettings();
  return Array.from({ length: count }, (_, index) => ({
    question: t(`faq.q${index + 1}`),
    answer: t(`faq.a${index + 1}`),
  }));
}
