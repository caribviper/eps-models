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
}
