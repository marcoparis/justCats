import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { toggleCat, selectSelectedIds, selectIsFull, MAX_SELECTED } from "./AdoptionSlice";
import { cats, CATEGORIES } from "./data/cats";

function CatList({ onGoToRequest }) {
  const [category, setCategory] = useState("all");
  const selectedIds = useSelector(selectSelectedIds);
  const isFull = useSelector(selectIsFull);
  const dispatch = useDispatch();

  const visibleCats = category === "all" ? cats : cats.filter((c) => c.category === category);
  const countFor = (id) => cats.filter((c) => c.category === id).length;

  return (
    <main className="catalog">
      <header className="catalog-intro">
        <h1>Find your four-legged companion</h1>
        <p>
          Pick up to {MAX_SELECTED} cats you would like to meet and send us a request: we will get back to you to
          arrange a visit to the shelter. Adoption is free.
        </p>
      </header>

      <div className="filters" role="group" aria-label="Filter by category">
        <button className={`chip ${category === "all" ? "active" : ""}`} onClick={() => setCategory("all")}>
          All ({cats.length})
        </button>
        {CATEGORIES.map(({ id, label }) => (
          <button key={id} className={`chip ${category === id ? "active" : ""}`} onClick={() => setCategory(id)}>
            {label} ({countFor(id)})
          </button>
        ))}
      </div>

      {isFull && (
        <p className="notice">
          You have picked {MAX_SELECTED} cats, the maximum for one request.{" "}
          <button className="inline-link" onClick={onGoToRequest}>Complete your request</button>
        </p>
      )}

      <div className="cat-grid">
        {visibleCats.map((c) => {
          const selected = selectedIds.includes(c.id);
          return (
            <article className={`cat-card ${selected ? "selected" : ""}`} key={c.id}>
              <img className="cat-image" src={c.image} alt={`${c.name}, ${c.sex.toLowerCase()}, ${c.age} old`} loading="lazy" />
              <div className="cat-body">
                <div className="cat-header">
                  <h2 className="cat-name">{c.name}</h2>
                  <span className="cat-meta">{c.sex} · {c.age}</span>
                </div>
                <p className="cat-description">{c.description}</p>
                <ul className="cat-traits">
                  {c.traits.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <p className="cat-health">{c.health}</p>
                <button
                  className={`adopt-button ${selected ? "selected" : ""}`}
                  onClick={() => dispatch(toggleCat(c.id))}
                  disabled={!selected && isFull}
                  aria-pressed={selected}
                >
                  <Heart size={18} fill={selected ? "currentColor" : "none"} />
                  {selected ? "In your request" : `I want to meet ${c.name}`}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

export default CatList;
