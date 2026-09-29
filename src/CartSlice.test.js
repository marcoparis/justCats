import { describe, it, expect, beforeEach } from "vitest";
import { createStore } from "./store";
import {
  addItem, removeItem, updateQuantity, clearCart,
  selectCartItems, selectCartCount, selectCartTotal, MAX_QUANTITY,
} from "./CartSlice";

const snake = { id: "snake-plant", name: "Snake Plant", image: "snake.webp", cost: 15 };
const mint = { id: "mint", name: "Mint", image: "mint.webp", cost: 12 };

let store;
const items = () => selectCartItems(store.getState());

beforeEach(() => {
  store = createStore();
});

describe("cart", () => {
  it("adds a new item with quantity 1", () => {
    store.dispatch(addItem(snake));
    expect(items()).toEqual([{ ...snake, quantity: 1 }]);
  });

  it("increments quantity when the same item is added again", () => {
    store.dispatch(addItem(snake));
    store.dispatch(addItem(snake));
    expect(items()).toHaveLength(1);
    expect(items()[0].quantity).toBe(2);
  });

  it("removes an item", () => {
    store.dispatch(addItem(snake));
    store.dispatch(addItem(mint));
    store.dispatch(removeItem("snake-plant"));
    expect(items().map((i) => i.id)).toEqual(["mint"]);
  });

  it("removes the item when quantity is updated to 0", () => {
    store.dispatch(addItem(snake));
    store.dispatch(updateQuantity({ id: "snake-plant", quantity: 0 }));
    expect(items()).toEqual([]);
  });

  it("caps the quantity", () => {
    store.dispatch(addItem(snake));
    store.dispatch(updateQuantity({ id: "snake-plant", quantity: MAX_QUANTITY + 50 }));
    expect(items()[0].quantity).toBe(MAX_QUANTITY);
  });

  it("computes item count and total price", () => {
    store.dispatch(addItem(snake));
    store.dispatch(updateQuantity({ id: "snake-plant", quantity: 3 }));
    store.dispatch(addItem(mint));
    expect(selectCartCount(store.getState())).toBe(4);
    expect(selectCartTotal(store.getState())).toBe(15 * 3 + 12);
  });

  it("clears the cart", () => {
    store.dispatch(addItem(snake));
    store.dispatch(clearCart());
    expect(items()).toEqual([]);
    expect(selectCartTotal(store.getState())).toBe(0);
  });
});
