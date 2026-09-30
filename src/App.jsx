import { useState } from "react";
import Shelter from "./Shelter";
import AboutUs from "./AboutUs";
import "./App.css";

function App() {
  const [showShelter, setShowShelter] = useState(false);

  return (
    <>
      <header className="landing-page" aria-hidden={showShelter}>
        <div className="landing-overlay">
          <div className="landing-content">
            <h1>Zampa Amica</h1>
            <div className="divider" />
            <p>Ogni gatto merita una casa</p>
            <button className="get-started-button" onClick={() => setShowShelter(true)}>
              Scopri chi aspetta te
            </button>
          </div>
          <AboutUs />
        </div>
      </header>

      <div className={`shelter-container ${showShelter ? "visible" : ""}`}>
        <Shelter onHomeClick={() => setShowShelter(false)} />
      </div>
    </>
  );
}

export default App;
