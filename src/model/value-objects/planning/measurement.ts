/**
 * Floor measurements
 */
export class FloorSpaceMeasurement {
  /**Amount of floor space for retail. */
  retail: number = 0;

  /**Amount of floor space for office. */
  office: number = 0;

  /**Amount of floor space for Institutional. */
  institutional: number = 0;

  /**Amount of floor space for Warehouse. */
  warehouse: number = 0;

  /**Amount of floor space for Industrial. */
  industrial: number = 0;

  /**Amount of floor space for CommonArea like service area. */
  commonArea: number = 0;
}

/**
 * Measurements of the structure
 */
export class Measurements {
  /**Area of site in square metres. */
  areaOfSite: number = 0;

  /**Gross floor area in square metres. */
  grossFloorArea: number = 0;

  /**Gross roof area in square metres. */
  grossRoofArea: number = 0;
}
