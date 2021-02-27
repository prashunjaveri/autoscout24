export class OtherAggregates {
    private static instance: OtherAggregates;

    private _count = 0;
    private _average = 0;

    private constructor() { 
      /* tslint:disable: @typescript-eslint/no-empty-function */
    }  
    public static getInstance(): OtherAggregates {
      if (!OtherAggregates.instance) {
        OtherAggregates.instance = new OtherAggregates();
      }
      return OtherAggregates.instance;
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