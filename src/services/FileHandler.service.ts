import * as csv from 'csv-parser';
import * as fs from 'fs';
import { ReadListing } from '../vo/ReadLisitng';
import { TransformedListing } from '../vo/TransformedLisitng';
import { transform } from '../transformers/ListingTransformer';
import { publish } from '../util/KafkaProducer';

let listing : TransformedListing = {
  id:'0',
  make: 'make',
  price: Number('0'),
  mileage: Number('0'),
  seller_type: 'other'
}; 

export const parse = async (path: string) => {
  return await fs.createReadStream(path)
    .pipe(csv())
    .on('data', (row: ReadListing) => {
      listing = transform(listing,row);
      publish('seller_type',JSON.stringify(listing));
    })
    .on('error' , (err: any) => {
      console.log(err);
    });
};

