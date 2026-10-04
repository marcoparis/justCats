import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle2, X } from "lucide-react";
import { removeCat, clearSelection, selectSelectedIds } from "./AdoptionSlice";
import { catById } from "./data/cats";
import { validateRequest, HOME_TYPES } from "./validation";
import { sendAdoptionRequest } from "./adoptionApi";
import "./AdoptionRequest.css";

const EMPTY_FORM = { name: "", email: "", phone: "", home: "", message: "", privacy: false };

const AdoptionRequest = ({ onBrowseCats }) => {
  const selectedCats = useSelector(selectSelectedIds).map(catById).filter(Boolean);
  const dispatch = useDispatch();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  // honeypot: hidden from people, bots tend to tick it
  const [botcheck, setBotcheck] = useState(false);

  const update = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((errs) => ({ ...errs, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validateRequest(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSending(true);
    setSendError(null);
    try {
      await sendAdoptionRequest(form, selectedCats, { botcheck });
      setSent({ name: form.name.trim().split(" ")[0], email: form.email.trim(), cats: selectedCats.map((c) => c.name) });
      dispatch(clearSelection());
      setForm(EMPTY_FORM);
    } catch (err) {
      setSendError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="request-container">
        <div className="request-message">
          <CheckCircle2 size={56} className="success-icon" />
          <h2>Thank you {sent.name}, your request has been sent!</h2>
          <p>
            You asked to meet <strong>{sent.cats.join(", ")}</strong>. We will write to you at{" "}
            <strong>{sent.email}</strong> within a few days to arrange a visit to the shelter.
          </p>
          <button className="primary-button" onClick={onBrowseCats}>Back to the cats</button>
        </div>
      </div>
    );
  }

  if (selectedCats.length === 0) {
    return (
      <div className="request-container">
        <div className="request-message">
          <h2>You have not picked any cat yet</h2>
          <p className="muted">Browse our guests and tap “I want to meet…” on the ones that stole your heart.</p>
          <button className="primary-button" onClick={onBrowseCats}>Meet the cats</button>
        </div>
      </div>
    );
  }

  const fieldError = (field) =>
    errors[field] && <p className="field-error" id={`${field}-error`}>{errors[field]}</p>;
  const errorProps = (field) =>
    errors[field] ? { "aria-invalid": true, "aria-describedby": `${field}-error` } : {};

  return (
    <div className="request-container">
      <h1>Your adoption request</h1>

      <section aria-label="Selected cats">
        <ul className="selected-list">
          {selectedCats.map((c) => (
            <li key={c.id} className="selected-cat">
              <img src={c.image} alt="" />
              <div>
                <strong>{c.name}</strong>
                <span className="muted">{c.sex} · {c.age}</span>
              </div>
              <button className="remove-button" onClick={() => dispatch(removeCat(c.id))} aria-label={`Remove ${c.name}`}>
                <X size={18} />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <form className="request-form" onSubmit={handleSubmit} noValidate>
        <h2>Your details</h2>

        <label htmlFor="name">Full name</label>
        <input id="name" value={form.name} onChange={update("name")} autoComplete="name" {...errorProps("name")} />
        {fieldError("name")}

        <div className="form-row">
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={form.email} onChange={update("email")} autoComplete="email" {...errorProps("email")} />
            {fieldError("email")}
          </div>
          <div>
            <label htmlFor="phone">Phone <span className="muted">(optional)</span></label>
            <input id="phone" type="tel" value={form.phone} onChange={update("phone")} autoComplete="tel" {...errorProps("phone")} />
            {fieldError("phone")}
          </div>
        </div>

        <label htmlFor="home">Where would the cat live?</label>
        <select id="home" value={form.home} onChange={update("home")} {...errorProps("home")}>
          <option value="">Select…</option>
          {HOME_TYPES.map((h) => <option key={h}>{h}</option>)}
        </select>
        {fieldError("home")}

        <label htmlFor="message">Tell us about yourself</label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="Who lives at home? Do you already have other pets? How much time do you spend away from home?"
          {...errorProps("message")}
        />
        {fieldError("message")}

        <label className="checkbox">
          <input type="checkbox" checked={form.privacy} onChange={update("privacy")} {...errorProps("privacy")} />
          I agree to the processing of my data so the shelter can contact me.
        </label>
        {fieldError("privacy")}

        <input
          type="checkbox"
          name="botcheck"
          className="honeypot"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          checked={botcheck}
          onChange={(e) => setBotcheck(e.target.checked)}
        />

        {sendError && <p className="send-error" role="alert">{sendError}</p>}

        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={onBrowseCats} disabled={sending}>
            Add more cats
          </button>
          <button type="submit" className="primary-button" disabled={sending}>
            {sending ? "Sending..." : "Send request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdoptionRequest;
