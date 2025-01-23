import { connect, JSONCodec, NatsConnection } from "nats";

let nc: NatsConnection;

export const connectToNats = async (
  uri: string,
  username: string,
  password: string
): Promise<void> => {
  nc = await connect({
    servers: uri,
    user: username,
    pass: password,
  });
};

export const sendRequest = async (
  subject: string,
  message: any
): Promise<any> => {
  if (!nc) throw new Error("NATS connection is not established.");

  const codec = JSONCodec();
  const response = await nc.request(subject, codec.encode(message), {
    timeout: 2000,
  });

  return codec.decode(response.data);
};

export const subscribeToSubject = async (
  subject: string,
  handler: (msg: any) => any
): Promise<void> => {
  if (!nc) throw new Error("NATS connection is not established.");

  const codec = JSONCodec();
  const subscription = nc.subscribe(subject);

  (async () => {
    for await (const msg of subscription) {
      msg.respond(codec.encode(handler(codec.decode(msg.data))));
    }
  })();
};

export const closeNatsConnection = async (): Promise<void> => {
  if (nc) await nc.close();
};
