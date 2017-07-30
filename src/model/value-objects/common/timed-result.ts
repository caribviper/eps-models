/** Sepcify a timed results */
export class TimedResult<TResult> {

  /**
   * Creates a new TimedResult
   * @param time Time taken to get results
   * @param data Data returned 
   */
  constructor(public readonly time: number, public readonly data: TResult) { }
}
