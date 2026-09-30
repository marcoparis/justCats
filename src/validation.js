const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9\s]{8,15}$/;

export const HOME_TYPES = ["Appartamento", "Appartamento con balcone", "Casa con giardino"];

export function validateRequest(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Inserisci nome e cognome.";
  if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = "Inserisci un indirizzo email valido.";
  if (form.phone.trim() && !PHONE_PATTERN.test(form.phone.trim())) {
    errors.phone = "Inserisci un numero di telefono valido (solo cifre, eventualmente con +).";
  }
  if (!HOME_TYPES.includes(form.home)) errors.home = "Seleziona il tipo di abitazione.";
  if (form.message.trim().length < 20) {
    errors.message = "Raccontaci qualcosa di te e della tua casa (almeno 20 caratteri).";
  }
  if (!form.privacy) errors.privacy = "Devi accettare il trattamento dei dati per inviare la richiesta.";
  return errors;
}
