import { afterEach, describe, expect, it, vi } from "vitest";
import { sendAdoptionRequest } from "./adoptionApi";
import { catById } from "./data/cats";

const form = {
  name: " Maria Rossi ",
  email: "maria@example.com",
  phone: "",
  home: "House with garden",
  message: "I live in a house with a garden and work from home.",
  privacy: true,
};
const cats = [catById("pirata"), catById("neve")];

const respond = (status, body) =>
  Promise.resolve({ ok: status >= 200 && status < 300, status, json: () => Promise.resolve(body) });

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("sendAdoptionRequest", () => {
  it("posts the request to Web3Forms with the chosen cats", async () => {
    const fetch = vi.fn(() => respond(200, { success: true }));
    vi.stubGlobal("fetch", fetch);

    await sendAdoptionRequest(form, cats);

    const [url, options] = fetch.mock.calls[0];
    const body = Object.fromEntries(options.body.entries());
    expect(url).toBe("https://api.web3forms.com/submit");
    expect(body.access_key).toEqual(expect.any(String));
    expect(body.subject).toContain("Pirate, Snow");
    expect(body.name).toBe("Maria Rossi");
    expect(body.phone).toBe("not provided");
    expect(body).not.toHaveProperty("botcheck");
  });

  it("fails when the service rejects the submission", async () => {
    vi.stubGlobal("fetch", vi.fn(() => respond(200, { success: false })));
    await expect(sendAdoptionRequest(form, cats)).rejects.toThrow(/could not send/);
  });

  it("fails with a clear message on network errors", async () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new TypeError("Failed to fetch"))));
    await expect(sendAdoptionRequest(form, cats)).rejects.toThrow(/connection/);
  });
});
