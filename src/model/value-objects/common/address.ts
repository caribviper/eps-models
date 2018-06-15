import { StringUtilities } from 'caribviper-common';
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

  public get addressLineNoParish(): string {
    return Address.stringifyAddress(this, false);
  }

  public get addressLineCapitalise(): string {
    return Address.stringifyAddress(this, true, false, true);
  }

  /**
   * Clones an address
   * @param a Address to be cloned
   */
  public static cloneAddress(a: Address): Address {
    return new Address(a.parish, a.streetOne, a.streetTwo, a.lot, a.country, a.postalCode, a.inCareOf);
  }

  /**
   * Converts an address into a string.
   * @param address Address to be stringified.
   * @param useParish Specifies whether to use the address parish
   * @param useCountry Specifies whether to use the address country in the resulting string
   * @param titleCase Specifies whether the address should be return in title case
   */
  public static stringifyAddress(address: Address, useParish: boolean = true, useCountry: boolean = false, titleCase: boolean = false): string {
    let result: string = '';
    if (!address)
      return '';
    if (address.inCareOf)
      result = result + `C/O ${address.inCareOf}, `;
    if (address.lot)
      result = result + `Lot ${address.lot}, `;

    result = result + `${address.streetOne}`;
    if (address.streetTwo)
      result = result + `, ${address.streetTwo} `;
    if (address.parish && useParish)
      result = result + `, ${address.parish} `;
    if (address.postalCode)
      result = result + `, ${address.postalCode} `;
    if (address.country && useCountry)
      result = result + `, ${address.country} `;
    result = !!result ? result.trim() : result;
    if(titleCase)
      result = StringUtilities.capitalize(result);
    return result;
  }
}
