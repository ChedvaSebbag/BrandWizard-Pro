import { formatBrandName } from "../formatBrandName";

describe("formatBrandName", () => {
  test("trims extra spaces", () => {
    expect(formatBrandName("  Silk   Art  ")).toBe("Silk Art");
  });

  test("returns empty string when input is empty", () => {
    expect(formatBrandName("")).toBe("");
  });
});