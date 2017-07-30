import { Assert } from 'caribviper-common';
/**
 * Resource item used to determine permissions
 */
export class Resource {

  /**
   * Creates a resource
   * @param url Resource url
   * @param verb Verb used to access resource
   * @param description Description about the resource
   */
  constructor(public url: string, public verb: string = 'get', public description: string = '') {
    Assert.isTruthy(url, 'Invalid resource as resource cannot be null/empty');
    this.url = url.toLowerCase();
    this.verb = verb.toLowerCase() || 'get';
  }

  validateResource() {
    Assert.isTruthy(this.url, 'Url cannot be undefined/empty');
    Assert.isTruthy(this.verb, 'Verb cannot be undefined/empty');
  }
}
