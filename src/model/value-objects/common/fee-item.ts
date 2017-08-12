/**Stores all fees and receipts */
export class FeeItem {

    /**
     * Creates a new FeeItem
     * @param fee Fee associated with the FeeItem
     * @param receiptNo Receipt associated with the FeeItem
     * @param feeWaived Indicates if the fee was waived
     */
  constructor(public fee: number = 0, public receiptNo: string = '000000', public feeWaived: boolean = false) { }
}
