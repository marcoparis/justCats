import { describe, it, expect } from "vitest";
import { validateRequest } from "./validation";

const valid = {
  name: "Maria Rossi",
  email: "maria.rossi@example.com",
  phone: "+39 333 1234567",
  home: "House with garden",
  message: "I live with my husband, no other pets, and I often work from home.",
  privacy: true,
};

describe("validateRequest", () => {
  it("accepts a complete request", () => {
    expect(validateRequest(valid)).toEqual({});
  });

  it("phone is optional", () => {
    expect(validateRequest({ ...valid, phone: "" })).toEqual({});
  });

  it.each([
    ["name", { name: " " }],
    ["email", { email: "maria@" }],
    ["phone", { phone: "abc" }],
    ["home", { home: "" }],
    ["message", { message: "Hello" }],
    ["privacy", { privacy: false }],
  ])("reports an error for an invalid %s", (field, override) => {
    expect(validateRequest({ ...valid, ...override })).toHaveProperty(field);
  });
});
