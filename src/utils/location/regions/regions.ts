
import { GeocodingResult } from '../types';

/**
 * Regional data for fallback location detection
 */
export const regions = [
  { keywords: ['london', 'greater london', 'middlesex'], center: { lat: 51.5074, lng: -0.1278 } },
  { keywords: ['manchester', 'greater manchester'], center: { lat: 53.4808, lng: -2.2426 } },
  { keywords: ['liverpool', 'merseyside'], center: { lat: 53.4084, lng: -2.9916 } },
  { keywords: ['birmingham', 'west midlands'], center: { lat: 52.4862, lng: -1.8904 } },
  { keywords: ['leeds', 'west yorkshire'], center: { lat: 53.8008, lng: -1.5491 } },
  { keywords: ['sheffield', 'south yorkshire'], center: { lat: 53.3811, lng: -1.4701 } },
  { keywords: ['bristol', 'avon'], center: { lat: 51.4545, lng: -2.5879 } },
  { keywords: ['newcastle', 'tyne'], center: { lat: 54.9783, lng: -1.6178 } },
  { keywords: ['norwich', 'norfolk'], center: { lat: 52.6309, lng: 1.2974 } },
  
  // Enhanced Wales regions
  { keywords: ['cardiff', 'south wales', 'glamorgan'], center: { lat: 51.4816, lng: -3.1791 } },
  { keywords: ['swansea', 'west wales', 'gower'], center: { lat: 51.6214, lng: -3.9436 } },
  { keywords: ['wrexham', 'north wales', 'clwyd'], center: { lat: 53.0428, lng: -3.0000 } },
  { keywords: ['aberystwyth', 'mid wales', 'ceredigion'], center: { lat: 52.4140, lng: -4.0810 } },
  { keywords: ['bangor', 'anglesey', 'gwynedd', 'ynys mon'], center: { lat: 53.2280, lng: -4.1280 } },
  { keywords: ['brecon', 'powys', 'brecon beacons'], center: { lat: 51.9481, lng: -3.3933 } },
  
  // Enhanced Scotland regions
  { keywords: ['edinburgh', 'lothian', 'midlothian'], center: { lat: 55.9533, lng: -3.1883 } },
  { keywords: ['glasgow', 'strathclyde', 'lanarkshire'], center: { lat: 55.8642, lng: -4.2518 } },
  { keywords: ['aberdeen', 'aberdeenshire', 'grampian'], center: { lat: 57.1497, lng: -2.0943 } },
  { keywords: ['inverness', 'highlands', 'highland'], center: { lat: 57.4791, lng: -4.2266 } },
  { keywords: ['dundee', 'tayside', 'angus', 'fife'], center: { lat: 56.4620, lng: -2.9707 } },
  { keywords: ['stirling', 'forth valley', 'central scotland'], center: { lat: 56.1165, lng: -3.9369 } },
  { keywords: ['perth', 'perthshire'], center: { lat: 56.3950, lng: -3.4308 } },
  { keywords: ['oban', 'argyll', 'argyll and bute'], center: { lat: 56.4153, lng: -5.4717 } },
  { keywords: ['fort william', 'lochaber'], center: { lat: 56.8198, lng: -5.1052 } },
  { keywords: ['skye', 'isle of skye', 'hebrides', 'western isles'], center: { lat: 57.2736, lng: -6.2155 } },
  { keywords: ['shetland', 'shetland islands'], center: { lat: 60.3530, lng: -1.2050 } },
  { keywords: ['orkney', 'orkney islands'], center: { lat: 58.9809, lng: -2.9605 } },
  
  { keywords: ['belfast', 'northern ireland'], center: { lat: 54.5973, lng: -5.9301 } },
  { keywords: ['dublin', 'ireland'], center: { lat: 53.3498, lng: -6.2603 } },
];

export type Region = {
  keywords: string[];
  center: GeocodingResult;
};
