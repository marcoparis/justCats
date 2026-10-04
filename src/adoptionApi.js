// Web3Forms access key: it is public by design and can only deliver emails to the shelter's own inbox.
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "27d391cc-d973-46d2-8f0d-95b62c0219b8";
const ENDPOINT = "https://api.web3forms.com/submit";

export async function sendAdoptionRequest(form, cats, { botcheck = false } = {}) {
  const catNames = cats.map((c) => c.name).join(", ");
  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `New adoption request: ${catNames}`,
    from_name: "justCats",
    // like an unticked checkbox, the honeypot is only sent when a bot fills it in
    ...(botcheck && { botcheck: "on" }),
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim() || "not provided",
    home: form.home,
    cats: cats.map((c) => `${c.name} (${c.sex.toLowerCase()}, ${c.age})`).join("; "),
    message: form.message.trim(),
  };

  // FormData keeps this a "simple" CORS request (no preflight), as in the Web3Forms docs
  const body = new FormData();
  Object.entries(payload).forEach(([key, value]) => body.append(key, String(value)));

  let res;
  try {
    res = await fetch(ENDPOINT, { method: "POST", body });
  } catch {
    throw new Error("Could not send the request: check your connection and try again.");
  }

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.success) {
    throw new Error("We could not send your request. Please try again in a few minutes.");
  }
}
