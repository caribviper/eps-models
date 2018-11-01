export declare class TimedResult<TResult> {
    readonly time: number;
    readonly data: TResult;
    constructor(time: number, data: TResult);
}
