import { ArrowLeft } from "lucide-react";
import { cats, photoCredits } from "./data/cats";

function Credits({ onBack }) {
  const entries = [...cats.map((c) => [c.name, photoCredits[c.id]]), ["Immagine di copertina", photoCredits.hero]];

  return (
    <main className="credits">
      <button className="inline-link back" onClick={onBack}><ArrowLeft size={16} /> Torna ai gatti</button>
      <h1>Crediti fotografici</h1>
      <p className="muted">
        Tutte le foto provengono da Wikimedia Commons e sono usate secondo le rispettive licenze libere (ridimensionate e
        ritagliate). I nomi e le storie dei gatti sono inventati.
      </p>
      <table className="credits-table">
        <thead>
          <tr><th>Foto</th><th>Autore</th><th>Licenza</th></tr>
        </thead>
        <tbody>
          {entries.map(([label, credit]) => (
            <tr key={label}>
              <td><a href={credit.source} target="_blank" rel="noreferrer">{label}</a></td>
              <td>{credit.author}</td>
              <td>{credit.license}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Credits;
