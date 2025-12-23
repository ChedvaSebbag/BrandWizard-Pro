import { extractPrimaryStyle } from "../extractPrimaryStyle";

describe("extractPrimaryStyle", () => {
  test("returns first style when styles exist", () => {
    const styles = [
      { style_id: 1, style_name: "Modern" },
      { style_id: 2, style_name: "Classic" },
    ];

    const result = extractPrimaryStyle(styles);

    expect(result).toEqual(styles[0]);
  });

  test("returns null when styles array is empty", () => {
    expect(extractPrimaryStyle([])).toBeNull();
  });

  test("returns null when input is not an array", () => {
    expect(extractPrimaryStyle(null)).toBeNull();
  });
});