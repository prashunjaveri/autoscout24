import { TransformedListing } from '../vo/TransformedLisitng';

export const transform = ( listing: TransformedListing , row : any)  => {
  try{
    listing.id = row.id;
    listing.make = row.make;
    listing.price = Number(row.price);
    listing.mileage = Number(row.mileage);
    listing.seller_type = row.seller_type;
  } catch(err){
    console.error(err);
  }
  return listing;
};