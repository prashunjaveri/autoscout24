import  { consume, stream, transform as streamTransformer } from '../util/KafkaConsumer';
import { transform } from '../transformers/ListingTransformer';
import { TransformedListing } from '../vo/TransformedLisitng';

import * as redis  from '../util/RedisClient';
import { aggregate } from '../helpers/AverageSellingPriceBySellerTypeCalculatorHelper';

const listing : TransformedListing = {
  id:'0',
  make: 'make',
  price: Number('0'),
  mileage: Number('0'),
  seller_type: 'other'
}; 

streamTransformer._transform = function (chunk, _encoding, done) {
  try{
    const data = chunk.toString();
    const result = transform(listing,JSON.parse(data));
    let averageSellingPrice = aggregate(result);
    const averages = { 'dealer':averageSellingPrice.dealerAggregate.average,'private': averageSellingPrice.privateAggregaate.average, 'others': averageSellingPrice.otherAggregates.average };
    if(!redis.get('averages')){
      redis.set('averages',JSON.stringify(averages));
    }
    redis.update('averages',JSON.stringify(averages));
    done();
  } catch(err){ console.log(err);}
};


export const AverageSellingPriceBySellerTypeCalulator = async () => {
  try{
    await consume('seller_type');
    await stream.on('data',() => { /* tslint:disable: @typescript-eslint/no-empty-function */
    }).pipe(streamTransformer);
  }catch(err){
    console.log(err);
  }
};