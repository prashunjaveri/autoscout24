/* eslint @typescript-eslint/no-var-requires: "off" */
import * as  redis from 'redis';
const util = require('util');  
const client = redis.createClient();
client.get = util.promisify(client.get);

client.on('error', function(error) {
  console.error(error);
});

export const set = (key: string, value: string) => {
  client.set(key,value);
};

export const get = async (key: string) => {
  const value =  await client.get(key);
  return value;
};

export const update = (key: string,value: string) => {
  client.del(key);
  client.set(key,value);
};

export const getKeys = async () => {
  return await client.keys('*');
};