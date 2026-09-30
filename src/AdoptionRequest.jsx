import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle2, X } from "lucide-react";
import { removeCat, clearSelection, selectSelectedIds } from "./AdoptionSlice";
import { catById } from "./data/cats";
import { validateRequest, HOME_TYPES } from "./validation";
import "./AdoptionRequest.css";

const EMPTY_FORM = { name: "", email: "", phone: "", home: "", message: "", privacy: false };

const AdoptionRequest = ({ onBrowseCats }) => {
  const selectedCats = useSelector(selectSelectedIds).map(catById).filter(Boolean);
  const dispatch = useDispatch();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);

  const update = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((errs) => ({ ...errs, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateRequest(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSent({ name: form.name.trim().split(" ")[0], email: form.email.trim(), cats: selectedCats.map((c) => c.name) });
    dispatch(clearSelection());
    setForm(EMPTY_FORM);
  };

  if (sent) {
    return (
      <div className="request-container">
        <div className="request-message">
          <CheckCircle2 size={56} className="success-icon" />
          <h2>Grazie {sent.name}, richiesta inviata!</h2>
          <p>
            Hai chiesto di conoscere <strong>{sent.cats.join(", ")}</strong>. Ti scriveremo a{" "}
            <strong>{sent.email}</strong> entro pochi giorni per fissare un incontro al rifugio.
          </p>
          <p className="muted">Questo è un progetto dimostrativo: nessuna richiesta viene davvero inviata.</p>
          <button className="primary-button" onClick={onBrowseCats}>Torna ai gatti</button>
        </div>
      </div>
    );
  }

  if (selectedCats.length === 0) {
    return (
      <div className="request-container">
        <div className="request-message">
          <h2>Non hai ancora scelto nessun gatto</h2>
          <p className="muted">Sfoglia i nostri ospiti e tocca “Voglio conoscere…” su quelli che ti hanno rubato il cuore.</p>
          <button className="primary-button" onClick={onBrowseCats}>Scopri i gatti</button>
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
      <h1>La tua richiesta di adozione</h1>

      <section aria-label="Gatti selezionati">
        <ul className="selected-list">
          {selectedCats.map((c) => (
            <li key={c.id} className="selected-cat">
              <img src={c.image} alt="" />
              <div>
                <strong>{c.name}</strong>
                <span className="muted">{c.sex} · {c.age}</span>
              </div>
              <button className="remove-button" onClick={() => dispatch(removeCat(c.id))} aria-label={`Rimuovi ${c.name}`}>
                <X size={18} />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <form className="request-form" onSubmit={handleSubmit} noValidate>
        <h2>I tuoi dati</h2>

        <label htmlFor="name">Nome e cognome</label>
        <input id="name" value={form.name} onChange={update("name")} autoComplete="name" {...errorProps("name")} />
        {fieldError("name")}

        <div className="form-row">
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={form.email} onChange={update("email")} autoComplete="email" {...errorProps("email")} />
            {fieldError("email")}
          </div>
          <div>
            <label htmlFor="phone">Telefono <span className="muted">(facoltativo)</span></label>
            <input id="phone" type="tel" value={form.phone} onChange={update("phone")} autoComplete="tel" {...errorProps("phone")} />
            {fieldError("phone")}
          </div>
        </div>

        <label htmlFor="home">Dove vivrebbe il gatto?</label>
        <select id="home" value={form.home} onChange={update("home")} {...errorProps("home")}>
          <option value="">Seleziona…</option>
          {HOME_TYPES.map((h) => <option key={h}>{h}</option>)}
        </select>
        {fieldError("home")}

        <label htmlFor="message">Raccontaci di te</label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="Chi vive in casa? Hai già altri animali? Quanto tempo passi fuori casa?"
          {...errorProps("message")}
        />
        {fieldError("message")}

        <label className="checkbox">
          <input type="checkbox" checked={form.privacy} onChange={update("privacy")} {...errorProps("privacy")} />
          Acconsento al trattamento dei dati per essere ricontattato dal rifugio.
        </label>
        {fieldError("privacy")}

        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={onBrowseCats}>Aggiungi altri gatti</button>
          <button type="submit" className="primary-button">Invia la richiesta</button>
        </div>
      </form>
    </div>
  );
};

export default AdoptionRequest;
