// src/composables/useLuxonDateFormatter.js
import { DateTime } from 'luxon';

export default function useLuxonDateFormatter() {
  function formatDateTime(dateTime, format = 'dd/MM/yyyy HH:mm:ss') {
    return DateTime.fromISO(dateTime).toFormat(format);
  }

  return {
    formatDateTime,
  };
}
