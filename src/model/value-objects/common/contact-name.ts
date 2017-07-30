/**
 * Contact name details
 */
export class ContactName {
  title: string = '';
  firstname: string = '';
  lastname: string = '';
  middlename: string = '';

  makeCompany(companyName: string) {
    this.title = 'COMPANY';
    this.firstname = '_';
    this.lastname = companyName;
    this.middlename = '';
  }
}
