import { DealerAggregate  } from './DealerAggregate';
import { PrivateAggregate  } from './PrivateAggregate';
import { OtherAggregates  } from './OtherAggregates';

export class AverageSellingPrice {
    private static instance: AverageSellingPrice ;

    private _dealerAggregate: DealerAggregate = DealerAggregate.getInstance();
    private _privateAggregaate: PrivateAggregate = PrivateAggregate.getInstance();
    private _otherAggregates: OtherAggregates  = OtherAggregates.getInstance();

    private constructor() { /* tslint:disable: @typescript-eslint/no-empty-function */
    } 

    public static getInstance(): AverageSellingPrice  {
      if (!AverageSellingPrice .instance) {
        AverageSellingPrice .instance = new AverageSellingPrice ();
      }
      return AverageSellingPrice.instance;
    }

    public get dealerAggregate() {
      return this._dealerAggregate;
    }

    public get privateAggregaate() {
      return this._privateAggregaate;
    }

    public get otherAggregates() {
      return this._otherAggregates;
    }
   
}