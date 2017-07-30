/**Stores all fees and receipts */
export class FeeItem {

    /**
     * Creates a new FeeItem
     * @param fee Fee associated with the FeeItem
     * @param receiptNo Receipt associated with the FeeItem
     */
  constructor(public fee: number = 0, public receiptNo: string = '000000') { }
}
