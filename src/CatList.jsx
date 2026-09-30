import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { toggleCat, selectSelectedIds, selectIsFull, MAX_SELECTED } from "./AdoptionSlice";
import { cats, CATEGORIES } from "./data/cats";

function CatList({ onGoToRequest }) {
  const [category, setCategory] = useState("tutti");
  const selectedIds = useSelector(selectSelectedIds);
  const isFull = useSelector(selectIsFull);
  const dispatch = useDispatch();

  const visibleCats = category === "tutti" ? cats : cats.filter((c) => c.category === category);
  const countFor = (id) => cats.filter((c) => c.category === id).length;

  return (
    <main className="catalog">
      <header className="catalog-intro">
        <h1>Trova il tuo compagno a quattro zampe</h1>
        <p>
          Scegli fino a {MAX_SELECTED} gatti che vorresti conoscere e inviaci una richiesta: ti ricontatteremo per
          fissare un incontro al rifugio. L&apos;adozione è gratuita.
        </p>
      </header>

      <div className="filters" role="group" aria-label="Filtra per categoria">
        <button className={`chip ${category === "tutti" ? "active" : ""}`} onClick={() => setCategory("tutti")}>
          Tutti ({cats.length})
        </button>
        {CATEGORIES.map(({ id, label }) => (
          <button key={id} className={`chip ${category === id ? "active" : ""}`} onClick={() => setCategory(id)}>
            {label} ({countFor(id)})
          </button>
        ))}
      </div>

      {isFull && (
        <p className="notice">
          Hai scelto {MAX_SELECTED} gatti, il massimo per una richiesta.{" "}
          <button className="inline-link" onClick={onGoToRequest}>Completa la richiesta</button>
        </p>
      )}

      <div className="cat-grid">
        {visibleCats.map((c) => {
          const selected = selectedIds.includes(c.id);
          return (
            <article className={`cat-card ${selected ? "selected" : ""}`} key={c.id}>
              <img className="cat-image" src={c.image} alt={`${c.name}, ${c.sex.toLowerCase()} di ${c.age}`} loading="lazy" />
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
                  {selected ? "Nella tua richiesta" : `Voglio conoscere ${c.name}`}
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
