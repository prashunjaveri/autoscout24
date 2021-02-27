export class DealerAggregate {
    private static instance: DealerAggregate;

    private _count = 0;
    private _average = 0;

    private constructor() { 
      /* tslint:disable: @typescript-eslint/no-empty-function */
    }  

    public static getInstance(): DealerAggregate {
      if (!DealerAggregate.instance) {
        DealerAggregate.instance = new DealerAggregate();
      }
      return DealerAggregate.instance;
    }

    public get count() {
      return this._count;
    }

    public set count(numberOfRecords: number) {
      this._count = numberOfRecords;
    }

    public get average() {
      return this._average;
    }

    public set average(averagePrice: number) {
      this._average = averagePrice;
    }
}