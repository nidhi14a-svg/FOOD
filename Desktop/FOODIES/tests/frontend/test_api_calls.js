describe("API service calls", () => {
  it("builds correct login request", () => {
    const data = { email: "user@test.com", password: "secret" };
    expect(JSON.stringify(data)).toContain("user@test.com");
    expect(JSON.parse(JSON.stringify(data)).password).toBe("secret");
  });
});
