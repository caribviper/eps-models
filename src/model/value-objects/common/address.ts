/**
 * Information details about the address
 */
export class Address {
  /**
   * Creates a new Address
   * @param parish Parish/State the property is located
   * @param streetOne Name of the first street
   * @param streetTwo Name of the second street
   * @param lot Lot number/name of the property
   * @param country Country of the address
   * @param postalCode Postal code or zip code
   * @param inCareOf In care of name
   */
  constructor(public parish: string, public streetOne: string, public streetTwo: string = '',
    public lot: string = '', public country: string = 'BARBADOS', public postalCode: string = '',
    public inCareOf: string = '') { }

  public get isEmpty(): boolean {
    return !this.parish && !this.streetOne && !this.streetTwo;
  }

  public get addressLine(): string {
    return Address.stringifyAddress(this);
  }

  /**
   * Converts an address into a string.
   * @param address Address to be stringified.
   * @param useCountry Specifies whether to use the address country in the resulting string
   */
  public static stringifyAddress(address: Address, useCountry: boolean = false): string {
    let result: string = '';
    if (!address)
      return '';
    if (address.inCareOf)
      result = result + `C/O ${address.inCareOf}, `;
    if (address.lot)
      result = result + `LOT ${address.lot}, `;

    result = result + `${address.streetOne}`;
    if (address.streetTwo)
      result = result + `, ${address.streetTwo} `;
    if (address.parish)
      result = result + `, ${address.parish} `;
      if (address.postalCode)
        result = result + `, ${address.postalCode} `;
        if (address.country && useCountry)
          result = result + `, ${address.country} `;
    return !!result ? result.trim(): result;
  }
}
