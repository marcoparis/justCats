import { useState } from "react";
import { useSelector } from "react-redux";
import { Heart, PawPrint } from "lucide-react";
import CatList from "./CatList";
import AdoptionRequest from "./AdoptionRequest";
import Credits from "./Credits";
import { selectSelectedCount } from "./AdoptionSlice";
import "./Shelter.css";

function Shelter({ onHomeClick }) {
  const [view, setView] = useState("cats");
  const selectedCount = useSelector(selectSelectedCount);

  return (
    <div className="shelter">
      <nav className="navbar">
        <button className="brand" onClick={onHomeClick}>
          <span className="brand-logo"><PawPrint size={28} /></span>
          <span>
            <span className="brand-name">justCats</span>
            <span className="brand-tagline">Rifugio felino · adozioni</span>
          </span>
        </button>

        <div className="nav-actions">
          <button className={`nav-link ${view === "cats" ? "active" : ""}`} onClick={() => setView("cats")}>
            I nostri gatti
          </button>
          <button
            className={`request-button ${view === "request" ? "active" : ""}`}
            onClick={() => setView("request")}
            aria-label={`La mia richiesta di adozione, ${selectedCount} ${selectedCount === 1 ? "gatto" : "gatti"}`}
          >
            <Heart size={20} fill={selectedCount > 0 ? "currentColor" : "none"} />
            <span>La mia richiesta</span>
            {selectedCount > 0 && <span className="request-badge">{selectedCount}</span>}
          </button>
        </div>
      </nav>

      {view === "cats" && <CatList onGoToRequest={() => setView("request")} />}
      {view === "request" && <AdoptionRequest onBrowseCats={() => setView("cats")} />}
      {view === "credits" && <Credits onBack={() => setView("cats")} />}

      <footer className="shelter-footer">
        Progetto dimostrativo: i gatti e le richieste non sono reali. ·{" "}
        <button className="footer-link" onClick={() => setView("credits")}>Crediti foto</button>
      </footer>
    </div>
  );
}

export default Shelter;
