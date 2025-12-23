import { getPalette } from "../getPalette";

describe("getPalette", () => {
  test("returns palette when colors exist", () => {
    const input = {
      colors: ["#111", "#222", "#333"],
    };

    const result = getPalette(input);

    expect(result).toEqual({
      c1: "#111",
      c2: "#222",
      c3: "#333",
    });
  });

  test("returns fallback when no colors provided", () => {
    const result = getPalette({});

    expect(result).toEqual({
      c1: "#0f172a",
      c2: "#14b8a6",
      c3: "#f59e0b",
    });
  });
});