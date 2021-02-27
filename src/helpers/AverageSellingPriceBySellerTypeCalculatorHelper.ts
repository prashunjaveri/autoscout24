import { SellerTypes } from '../enums/SellerTypes';
import { AverageSellingPrice  } from '../entities/AverageSellingPrice';

let dealerTotal = 0;
let dealerCount = 0;

let privateTotal = 0;
let privateCount = 0;

let othersTotal = 0;
let othersCount = 0;

const averageSellingPrice : AverageSellingPrice   = AverageSellingPrice.getInstance();

export const aggregate = (result: any ) => {
    if( result.seller_type === SellerTypes.DEALER){
      dealerTotal = dealerTotal + result.price;
      ++ dealerCount ;
      averageSellingPrice.dealerAggregate.average = dealerTotal/dealerCount;
      averageSellingPrice.dealerAggregate.count = dealerCount;
    } else if ( result.seller_type === SellerTypes.PRIVATE ) {
      privateTotal = privateTotal + result.price;
      ++ privateCount ;
      averageSellingPrice.privateAggregaate.average = privateTotal/ privateCount;
      averageSellingPrice.privateAggregaate.count = privateCount;
    }else {
      othersTotal = othersTotal + result.price;
      ++ othersCount ;
      averageSellingPrice.otherAggregates.average = othersTotal/ othersCount;
      averageSellingPrice.otherAggregates.count = othersCount;
    }
    return  averageSellingPrice;
  }