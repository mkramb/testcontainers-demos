import {
  connectToNats,
  sendRequest,
  subscribeToSubject,
  closeNatsConnection,
} from "../src/nats-service";

describe("NATS Test with Testcontainers", () => {
  beforeAll(async () => {
    const uri = process.env.NATS_URI;
    const user = process.env.NATS_USER;
    const pass = process.env.NATS_PASS;

    await connectToNats(uri, user, pass);
  });

  afterAll(async () => {
    await closeNatsConnection();
  });

  test("should send a request and receive a response", async () => {
    await subscribeToSubject("test.subject", (msg) => {
      return { success: true, received: msg };
    });

    const response = await sendRequest("test.subject", {
      message: "Hello NATS",
    });

    expect(response).toHaveProperty("success", true);
    expect(response.received).toHaveProperty("message", "Hello NATS");
  });
});
