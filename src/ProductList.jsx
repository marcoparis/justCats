import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Leaf, ShoppingCart } from "lucide-react";
import "./ProductList.css";
import CartItem from "./CartItem";
import { addItem, selectCartCount, selectCartItems } from "./CartSlice";
import { plantCategories, formatPrice } from "./data/plants";

const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <div>
      <nav className="navbar">
        <button className="brand" onClick={onHomeClick}>
          <span className="brand-logo"><Leaf size={30} /></span>
          <span>
            <span className="brand-name">Paradise Nursery</span>
            <span className="brand-tagline">Where Green Meets Serenity</span>
          </span>
        </button>

        <div className="nav-actions">
          <button className={`nav-link ${!showCart ? "active" : ""}`} onClick={() => setShowCart(false)}>
            Plants
          </button>
          <button
            className={`cart-button ${showCart ? "active" : ""}`}
            onClick={() => setShowCart(true)}
            aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
          >
            <ShoppingCart size={34} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <main className="catalog">
          <div className="category-nav">
            {plantCategories.map(({ category }) => (
              <a key={category} href={`#${slug(category)}`}>{category}</a>
            ))}
          </div>

          {plantCategories.map(({ category, plants }) => (
            <section key={category} id={slug(category)} className="category">
              <h2 className="category-title">{category}</h2>
              <div className="product-grid">
                {plants.map((plant) => {
                  const added = isInCart(plant.id);
                  return (
                    <article className="product-card" key={plant.id}>
                      <img className="product-image" src={plant.image} alt={plant.name} loading="lazy" />
                      <div className="product-body">
                        <h3 className="product-title">{plant.name}</h3>
                        <p className="product-description">{plant.description}</p>
                        <div className="product-footer">
                          <span className="product-cost">{formatPrice(plant.cost)}</span>
                          <button
                            className={`product-button ${added ? "added" : ""}`}
                            onClick={() => dispatch(addItem(plant))}
                            disabled={added}
                          >
                            {added ? "Added to Cart" : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      )}
    </div>
  );
}

export default ProductList;
