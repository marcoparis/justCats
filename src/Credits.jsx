import { ArrowLeft } from "lucide-react";
import { cats, photoCredits } from "./data/cats";

function Credits({ onBack }) {
  const entries = [...cats.map((c) => [c.name, photoCredits[c.id]]), ["Cover image", photoCredits.hero]];

  return (
    <main className="credits">
      <button className="inline-link back" onClick={onBack}><ArrowLeft size={16} /> Back to the cats</button>
      <h1>Photo credits</h1>
      <p className="muted">
        All photos come from Wikimedia Commons and are used under their respective free licenses (resized and
        cropped). The cats&apos; names and stories are made up.
      </p>
      <table className="credits-table">
        <thead>
          <tr><th>Photo</th><th>Author</th><th>License</th></tr>
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
