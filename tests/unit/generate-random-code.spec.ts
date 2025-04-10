import { generateRandomCode } from "../../src/shared/utils/generate-random-code";

describe("Generate Random Code", () => {
  it("should generate a random code of length 6 and only alphanumeric characters", () => {
    const code = generateRandomCode();
    expect(code).toHaveLength(6);
    expect(code).toMatch(/^[a-zA-Z0-9]+$/);
  });
});
