import { IdentifiableObject } from '../core/identifiable-object';

/**
 * Represents the fetcher for the organisation unit
 *
 * @extends IdentifiableObject
 */
export class OrganisationUnit extends IdentifiableObject {

  /**
   * Gets the name for fetching the identifiable object
   * @returns {string}
   */
  get name() {
    return 'organisationUnits';
  }
}
