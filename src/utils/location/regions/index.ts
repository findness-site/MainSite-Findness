
// Export all region data from a single file for convenient imports

import { majorCities } from './majorCities';
import { liverpoolArea } from './liverpoolArea';
import { counties } from './counties';
import { towns } from './towns';
import { londonAreas } from './londonAreas';
import { scotland } from './scotland';
import { wales } from './wales';
import { postalAreaMapping } from './postalAreaMapping';
import { GeocodingResult } from '../types';

/**
 * Combined location database from all regional modules
 */
export const allLocations: Record<string, GeocodingResult> = {
  ...majorCities,
  ...liverpoolArea,
  ...counties,
  ...towns,
  ...londonAreas,
  ...scotland,
  ...wales
};

export {
  majorCities,
  liverpoolArea,
  counties,
  towns,
  londonAreas,
  scotland,
  wales,
  postalAreaMapping
};
