
import { GeocodingResult } from '../types';

/**
 * Scottish cities, towns and regions
 */
export const scotland: Record<string, GeocodingResult> = {
  // Major Scottish cities (already in majorCities but duplicated here for completeness)
  'edinburgh': { lat: 55.9533, lng: -3.1883 },
  'glasgow': { lat: 55.8642, lng: -4.2518 },
  'aberdeen': { lat: 57.1497, lng: -2.0943 },
  'dundee': { lat: 56.4620, lng: -2.9707 },
  'inverness': { lat: 57.4791, lng: -4.2266 },
  'stirling': { lat: 56.1165, lng: -3.9369 },
  'perth': { lat: 56.3950, lng: -3.4308 },
  
  // Scottish towns
  'fort william': { lat: 56.8198, lng: -5.1052 },
  'oban': { lat: 56.4153, lng: -5.4717 },
  'st andrews': { lat: 56.3398, lng: -2.7967 },
  'dumfries': { lat: 55.0733, lng: -3.6053 },
  'galashiels': { lat: 55.6181, lng: -2.8105 },
  'peterhead': { lat: 57.5076, lng: -1.7841 },
  'elgin': { lat: 57.6500, lng: -3.3167 },
  'kirkcaldy': { lat: 56.1098, lng: -3.1613 },
  'ayr': { lat: 55.4609, lng: -4.6295 },
  'falkirk': { lat: 56.0020, lng: -3.7839 },
  'greenock': { lat: 55.9475, lng: -4.7547 },
  'coatbridge': { lat: 55.8643, lng: -4.0290 },
  'livingston': { lat: 55.9021, lng: -3.5217 },
  'irvine': { lat: 55.6199, lng: -4.6624 },
  'kilmarnock': { lat: 55.6112, lng: -4.4957 },
  'motherwell': { lat: 55.7904, lng: -3.9882 },
  'arbroath': { lat: 56.5594, lng: -2.5822 },
  
  // Scottish regions and counties
  'highlands': { lat: 57.5359, lng: -5.0000 },
  'scottish borders': { lat: 55.5480, lng: -2.7816 },
  'fife': { lat: 56.2082, lng: -3.1495 },
  'aberdeenshire': { lat: 57.1670, lng: -2.6670 },
  'angus': { lat: 56.7605, lng: -2.9270 },
  'perthshire': { lat: 56.5500, lng: -3.7500 },
  'ayrshire': { lat: 55.4584, lng: -4.6320 },
  'argyll and bute': { lat: 56.4000, lng: -5.5000 },
  'moray': { lat: 57.6500, lng: -3.3167 },
  'east lothian': { lat: 55.9560, lng: -2.7740 },
  'west lothian': { lat: 55.9070, lng: -3.5515 },
  'midlothian': { lat: 55.8309, lng: -3.1058 },
  'dumfries and galloway': { lat: 55.0700, lng: -3.6000 },
  'renfrewshire': { lat: 55.8449, lng: -4.5333 },
  'lanarkshire': { lat: 55.6733, lng: -3.7820 },
  
  // Scottish islands
  'isle of skye': { lat: 57.2736, lng: -6.2155 },
  'isle of arran': { lat: 55.5800, lng: -5.2494 },
  'isle of mull': { lat: 56.4664, lng: -6.0000 },
  'outer hebrides': { lat: 58.2108, lng: -6.6620 },
  'western isles': { lat: 57.7650, lng: -7.0500 },
  'shetland': { lat: 60.3530, lng: -1.2050 },
  'orkney': { lat: 58.9809, lng: -2.9605 },
};
