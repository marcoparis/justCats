import { useState } from "react";
import ProductList from "./ProductList";
import AboutUs from "./AboutUs";
import "./App.css";

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <>
      <header className="landing-page" aria-hidden={showProductList}>
        <div className="landing-overlay">
          <div className="landing-content">
            <h1>Welcome To Paradise Nursery</h1>
            <div className="divider" />
            <p>Where Green Meets Serenity</p>
            <button className="get-started-button" onClick={() => setShowProductList(true)}>
              Get Started
            </button>
          </div>
          <AboutUs />
        </div>
      </header>

      <div className={`product-list-container ${showProductList ? "visible" : ""}`}>
        <ProductList onHomeClick={() => setShowProductList(false)} />
      </div>
    </>
  );
}

export default App;
