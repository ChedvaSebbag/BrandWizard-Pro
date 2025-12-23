const { selectPrimaryDesignStyle } = require("../selectPrimaryDesignStyle");

describe("selectPrimaryDesignStyle", () => {
  test("returns first style when styles exist", () => {
    const styles = [
      { style_id: 1, style_name: "Modern" },
      { style_id: 2, style_name: "Classic" },
    ];

    const result = selectPrimaryDesignStyle(styles);

    expect(result).toEqual(styles[0]);
  });

  test("returns null when styles array is empty", () => {
    const result = selectPrimaryDesignStyle([]);

    expect(result).toBeNull();
  });

  test("returns null when input is not an array", () => {
    const result = selectPrimaryDesignStyle(null);

    expect(result).toBeNull();
  });
});