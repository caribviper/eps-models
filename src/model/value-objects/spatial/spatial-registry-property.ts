import { Projection } from './../common/projection';
import { RegistryItem } from './../../entities/planning/registry-item';
import { RegistryFileTypes, FormalApplication } from '../../..';

export class GeoSpatialRegistryProperty extends Projection {
  /** Reference number of registry item */
  public referenceNo: string;

  /**Id of registry item */
  public registryId: string;

  /**File type of registry item */
  public fileType: string;

  /**Land tax number */
  public landTax: string;

  /**Land tax parcel id */
  public parcel: string;

  /**Development control area */
  public area: string;

  /**Land use */
  public landUse: string;

  /**Type of formal application (Indicates whether erection of building, engineering, mining, change of use) */
  public formalType: string = '';

  /**Size of area to be developed or in question */
  public siteArea: number;

  public static createFromRegistry(registry: RegistryItem) {
    const p: GeoSpatialRegistryProperty = new GeoSpatialRegistryProperty();
    p.area = registry.area;
    p.description = registry.projection.description;
    p.primaryContact = registry.projection.primaryContact;
    p.secondaryContact = registry.projection.secondaryContact;
    p.location = registry.projection.location;
    p.referenceNo = registry.referenceNo
    p.registryId = registry._id;
    p.fileType = registry.fileType.displayName;
    p.landTax = registry.location.landTaxNo;
    p.parcel = registry.location.parcel;
    p.area = registry.area;

    switch(registry.fileType.folderPrefix) {
      case RegistryFileTypes.enforcement.folderPrefix:
      case RegistryFileTypes.enquiry.folderPrefix:
      case RegistryFileTypes.complaint.folderPrefix:
      case RegistryFileTypes.unauthorised.folderPrefix: {
        p.landUse = 'ENFORCEMENT';
        break;
      }

      case RegistryFileTypes.formal.folderPrefix: {
        const formal = (registry.details as FormalApplication);
        p.formalType = formal.formalType;
        p.landUse = formal.proposedPrimaryLandUse.category;
        p.siteArea = formal.measurements.areaOfSite;
        break;
      }
      case RegistryFileTypes.permitted.folderPrefix:
      case RegistryFileTypes.chattel.folderPrefix: {
        p.landUse = 'RESIDENTIAL';
        break;
      }
      default: {
        p.landUse = 'OTHER';
        break;
      }
    }

    return p;
  }
}
