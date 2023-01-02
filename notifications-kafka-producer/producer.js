import { Kafka } from 'kafkajs';
import { randomUUID } from 'crypto';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKER],
    sasl: {
      mechanism: 'scram-sha-256',
      username: process.env.KAFKA_USER,
      password: process.env.KAFKA_PASS,
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    clientId: 'notifications-kafka-producer',
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          category: 'Test Kafka producer category',
          content: 'Test Kafka producer content',
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
