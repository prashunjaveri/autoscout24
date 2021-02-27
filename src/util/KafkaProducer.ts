import { producer } from './KafkaConnector';

export const publish = async (name :string , message: any ) => {
  try{
    await producer.connect();
    await producer.send({
      topic: name,
      messages: [
        { value: message },
      ]
    }).catch((e: { message: any; })  => console.error(`[producer] ${e.message}`, e));
    await producer.disconnect();
  } catch(err){
    console.error(err);
  }
};