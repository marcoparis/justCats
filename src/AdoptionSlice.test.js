import { describe, it, expect, beforeEach } from "vitest";
import { createStore } from "./store";
import {
  toggleCat, removeCat, clearSelection, selectSelectedIds, selectSelectedCount, selectIsFull, MAX_SELECTED,
} from "./AdoptionSlice";
import { cats, catById } from "./data/cats";

let store;
const ids = () => selectSelectedIds(store.getState());

beforeEach(() => {
  store = createStore();
});

describe("adoption selection", () => {
  it("adds a cat and removes it when toggled again", () => {
    store.dispatch(toggleCat("biscotto"));
    expect(ids()).toEqual(["biscotto"]);
    store.dispatch(toggleCat("biscotto"));
    expect(ids()).toEqual([]);
  });

  it(`allows at most ${MAX_SELECTED} cats per request`, () => {
    cats.slice(0, MAX_SELECTED + 2).forEach((c) => store.dispatch(toggleCat(c.id)));
    expect(selectSelectedCount(store.getState())).toBe(MAX_SELECTED);
    expect(selectIsFull(store.getState())).toBe(true);
  });

  it("still lets you deselect a cat when the list is full", () => {
    cats.slice(0, MAX_SELECTED).forEach((c) => store.dispatch(toggleCat(c.id)));
    store.dispatch(toggleCat(cats[0].id));
    expect(ids()).not.toContain(cats[0].id);
    expect(selectIsFull(store.getState())).toBe(false);
  });

  it("removes a single cat and clears the selection", () => {
    store.dispatch(toggleCat("tigro"));
    store.dispatch(toggleCat("neve"));
    store.dispatch(removeCat("tigro"));
    expect(ids()).toEqual(["neve"]);
    store.dispatch(clearSelection());
    expect(ids()).toEqual([]);
  });
});

describe("catalog data", () => {
  it("has at least 10 cats with unique ids and no price", () => {
    expect(cats.length).toBeGreaterThanOrEqual(10);
    expect(new Set(cats.map((c) => c.id)).size).toBe(cats.length);
    cats.forEach((c) => expect(c).not.toHaveProperty("cost"));
  });

  it("finds cats by id", () => {
    expect(catById("pirata").name).toBe("Pirate");
    expect(catById("unknown")).toBeUndefined();
  });
});
