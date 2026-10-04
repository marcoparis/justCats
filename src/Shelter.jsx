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
            <span className="brand-tagline">Cat shelter · adoptions</span>
          </span>
        </button>

        <div className="nav-actions">
          <button className={`nav-link ${view === "cats" ? "active" : ""}`} onClick={() => setView("cats")}>
            Our cats
          </button>
          <button
            className={`request-button ${view === "request" ? "active" : ""}`}
            onClick={() => setView("request")}
            aria-label={`My adoption request, ${selectedCount} ${selectedCount === 1 ? "cat" : "cats"}`}
          >
            <Heart size={20} fill={selectedCount > 0 ? "currentColor" : "none"} />
            <span>My request</span>
            {selectedCount > 0 && <span className="request-badge">{selectedCount}</span>}
          </button>
        </div>
      </nav>

      {view === "cats" && <CatList onGoToRequest={() => setView("request")} />}
      {view === "request" && <AdoptionRequest onBrowseCats={() => setView("cats")} />}
      {view === "credits" && <Credits onBack={() => setView("cats")} />}

      <footer className="shelter-footer">
        The cats and their stories are made up, the photos are real. ·{" "}
        <button className="footer-link" onClick={() => setView("credits")}>Photo credits</button>
      </footer>
    </div>
  );
}

export default Shelter;
