import { NatsContainer, StartedNatsContainer } from "@testcontainers/nats";
import {
  connectToNats,
  sendRequest,
  subscribeToSubject,
  closeNatsConnection,
} from "../src/nats";

describe("NATS Test with Testcontainers", () => {
  let container: StartedNatsContainer;

  beforeAll(async () => {
    container = await new NatsContainer()
      .withExposedPorts(4222)
      .withJetStream()
      .start();

    const mappedPort = container.getMappedPort(4222);
    const host = container.getHost();

    await connectToNats(`nats://${host}:${mappedPort}`, "test", "test");
  });

  afterAll(async () => {
    await closeNatsConnection();
    await container.stop();
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
