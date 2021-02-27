import { consumer } from './KafkaConnector';
import { Readable,Transform } from 'stream';

export const stream = new Readable();
stream._read = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function

export const transform = new Transform( { objectMode: true } );

export const consume =  async ( name:string )  =>  {
  try{
    await consumer.connect();
    await consumer.subscribe({ topic: name, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ message }) => {       
        if(message && message.value ){
          stream.push(message.value.toString());
        }
      },
    });
  } catch(err){
    console.log(err);
  }

};