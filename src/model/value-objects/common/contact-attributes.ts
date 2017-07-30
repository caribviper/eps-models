import { Address } from './address';

/**Manages contact email and phone address */
export class ContactAttributes {
  /**Contact's telephone number. */
  telephone: string = '';

  /**Address location. */
  address: Address;

  /**Email address. */
  email: string = '';
}
