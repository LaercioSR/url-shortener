import { validateUrl } from "../../src/shared/utils/validate-url";

describe("Validate URL", () => {
  it("should return true for a valid URL", () => {
    const validUrl = "https://www.example.com";
    const result = validateUrl(validUrl);
    expect(result).toBe(true);
  });

  it("should return false for an invalid URL", () => {
    const invalidUrl = "invalid-url";
    const result = validateUrl(invalidUrl);
    expect(result).toBe(false);
  });
});
