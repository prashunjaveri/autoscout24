import * as fs from "fs";
import * as csv from 'csv-parser';
import { ReadListing } from "../../src/vo/ReadLisitng";
import { transform } from "../../src/transformers/ListingTransformer";
import { TransformedListing } from "../../src/vo/TransformedLisitng";
import * as redis  from '../../src/util/RedisClient';
import { aggregate } from "../../src/helpers/AverageSellingPriceBySellerTypeCalculatorHelper";

describe('the file reader ', function() {

    let listing : TransformedListing = {
        id:'0',
        make: 'make',
        price: Number('0'),
        mileage: Number('0'),
        seller_type: 'other'
      };

    it('should be able to read the uploaded file ', async () => {
        await  fs.createReadStream('./fixtures/listings.csv')
        .pipe(csv())
        .on('data', (data: ReadListing) =>{
        listing = transform(listing,data);
        if(listing.id === "1000")
            expect(listing).toEqual({"id": "1000", "make": "Audi", "mileage": 6500, "price": 49717, "seller_type": "private"});
        });
    });
   
    it('should be able to calculate the average price by seller type ', async () => {
        await  fs.createReadStream('./fixtures/listings.csv')
        .pipe(csv())
        .on('data', (data: ReadListing) =>{
           listing = transform(listing,data);
           let averageSellingPrice = aggregate(listing);
           const averages = { 'dealer':averageSellingPrice.dealerAggregate.average,'private': averageSellingPrice.privateAggregaate.average, 'others': averageSellingPrice.otherAggregates.average };
           if(!redis.get('averages')){
            redis.set('averages',JSON.stringify(averages));
          }
          redis.update('averages',JSON.stringify(averages));
        });

        const averages = await redis.get('averages');
        const avg = JSON.parse(averages.toString());
        expect(avg).toEqual({ dealer: 29051.75, private: 33479.6, others: 37955.333333333336 });
    });
    
  })