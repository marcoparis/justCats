import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircle2, Trash2 } from "lucide-react";
import {
  removeItem, updateQuantity, clearCart, selectCartItems, selectCartCount, selectCartTotal, MAX_QUANTITY,
} from "./CartSlice";
import { formatPrice } from "./data/plants";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);

  const handleCheckout = () => {
    setOrder({ count, total });
    dispatch(clearCart());
  };

  if (order) {
    return (
      <div className="cart-container">
        <div className="order-confirmation">
          <CheckCircle2 size={56} className="order-icon" />
          <h2>Thank you for your order!</h2>
          <p>
            {order.count} plant{order.count === 1 ? "" : "s"} for a total of <strong>{formatPrice(order.total)}</strong>.
          </p>
          <p className="order-note">This is a demo shop: no payment has been taken.</p>
          <button className="primary-button" onClick={onContinueShopping}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Browse our plants and add something green to your home.</p>
          <button className="primary-button" onClick={onContinueShopping}>Browse Plants</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-total">Total Cart Amount: {formatPrice(total)}</h2>

      <ul className="cart-list">
        {cart.map((item) => (
          <li className="cart-item" key={item.id}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{formatPrice(item.cost)} each</div>
              <div className="cart-item-quantity">
                <button
                  className="qty-button"
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                  aria-label={`Remove one ${item.name}`}
                >
                  &minus;
                </button>
                <span className="qty-value" aria-live="polite">{item.quantity}</span>
                <button
                  className="qty-button"
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                  disabled={item.quantity >= MAX_QUANTITY}
                  aria-label={`Add one ${item.name}`}
                >
                  +
                </button>
              </div>
              <div className="cart-item-subtotal">Subtotal: {formatPrice(item.cost * item.quantity)}</div>
            </div>
            <button
              className="delete-button"
              onClick={() => dispatch(removeItem(item.id))}
              aria-label={`Delete ${item.name} from cart`}
            >
              <Trash2 size={18} /> Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-actions">
        <button className="secondary-button" onClick={onContinueShopping}>Continue Shopping</button>
        <button className="primary-button" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
