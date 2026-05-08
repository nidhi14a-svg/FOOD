import { login, getFoodList } from "../services/api";

describe("API service calls", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    sessionStorage.clear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("builds correct login request and returns token", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ access_token: "test_token", user: {} }),
    });

    const response = await login("user@test.com", "secret");
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/login"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ email: "user@test.com", password: "secret" }),
      })
    );
    expect(response.access_token).toBe("test_token");
  });

  it("getFoodList unwraps items array correctly", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [{ id: "1", title: "Apple" }] }),
    });

    const items = await getFoodList({ status: "Available" });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/food/list?status=Available"),
      expect.any(Object)
    );
    expect(Array.isArray(items)).toBe(true);
    expect(items[0].title).toBe("Apple");
  });
});
