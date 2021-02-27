import  { Kafka } from 'kafkajs';

// todo: read from process
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'test-group' });

