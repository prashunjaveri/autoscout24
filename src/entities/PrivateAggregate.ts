export class PrivateAggregate {

    private static instance: PrivateAggregate;

    private _count = 0;
    private _average = 0;

    private constructor() { 
      /* tslint:disable: @typescript-eslint/no-empty-function */
    }  

    public static getInstance(): PrivateAggregate {
      if (!PrivateAggregate.instance) {
        PrivateAggregate.instance = new PrivateAggregate();  /* tslint:disable: @typescript-eslint/no-empty-function */
      }
      return PrivateAggregate.instance;
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