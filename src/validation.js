const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9\s]{8,15}$/;

export const HOME_TYPES = ["Apartment", "Apartment with balcony", "House with garden"];

export function validateRequest(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (form.phone.trim() && !PHONE_PATTERN.test(form.phone.trim())) {
    errors.phone = "Enter a valid phone number (digits only, optionally with +).";
  }
  if (!HOME_TYPES.includes(form.home)) errors.home = "Select the type of home.";
  if (form.message.trim().length < 20) {
    errors.message = "Tell us something about yourself and your home (at least 20 characters).";
  }
  if (!form.privacy) errors.privacy = "You must agree to the processing of your data to send the request.";
  return errors;
}
