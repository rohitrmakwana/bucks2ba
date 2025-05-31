// filepath: c:\Projects\GitHubCopilot\bucks2ba\js\scripts.test.js
const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

describe("Username Validation Regex", () => {
  test("Valid username with all required elements", () => {
    const username = "Test@123";
    expect(regex.test(username)).toBe(true);
  });

  test("Invalid username missing uppercase letter", () => {
    const username = "test@123";
    expect(regex.test(username)).toBe(false);
  });

  test("Invalid username missing special character", () => {
    const username = "Test1234";
    expect(regex.test(username)).toBe(false);
  });

  test("Invalid username missing number", () => {
    const username = "Test@abcd";
    expect(regex.test(username)).toBe(false);
  });

  test("Invalid username with less than 8 characters", () => {
    const username = "T@123";
    expect(regex.test(username)).toBe(false);
  });

  test("Valid username with more than 8 characters", () => {
    const username = "Valid@12345";
    expect(regex.test(username)).toBe(true);
  });

  test("Invalid username with only special characters", () => {
    const username = "@@@@@@@@";
    expect(regex.test(username)).toBe(false);
  });

  test("Invalid username with only numbers", () => {
    const username = "12345678";
    expect(regex.test(username)).toBe(false);
  });

  test("Invalid username with only uppercase letters", () => {
    const username = "ABCDEFGH";
    expect(regex.test(username)).toBe(false);
  });
});
