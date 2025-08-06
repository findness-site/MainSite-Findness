
import { GeocodingResult } from '../types';

/**
 * Welsh cities, towns and regions
 */
export const wales: Record<string, GeocodingResult> = {
  // Major Welsh cities (already in majorCities but duplicated here for completeness)
  'cardiff': { lat: 51.4816, lng: -3.1791 },
  'swansea': { lat: 51.6214, lng: -3.9436 },
  'newport': { lat: 51.5842, lng: -2.9977 },
  'wrexham': { lat: 53.0428, lng: -3.0000 },
  
  // Welsh towns
  'bangor': { lat: 53.2280, lng: -4.1280 },
  'aberystwyth': { lat: 52.4140, lng: -4.0810 },
  'llandudno': { lat: 53.3241, lng: -3.8276 },
  'carmarthen': { lat: 51.8555, lng: -4.3065 },
  'merthyr tydfil': { lat: 51.7500, lng: -3.3790 },
  'pontypridd': { lat: 51.6033, lng: -3.3426 },
  'bridgend': { lat: 51.5080, lng: -3.5764 },
  'caernarfon': { lat: 53.1417, lng: -4.2764 },
  'conwy': { lat: 53.2824, lng: -3.8307 },
  'aberaeron': { lat: 52.2429, lng: -4.2601 },
  'welshpool': { lat: 52.6605, lng: -3.1437 },
  'newtown': { lat: 52.5132, lng: -3.3144 },
  'brecon': { lat: 51.9481, lng: -3.3933 },
  'monmouth': { lat: 51.8122, lng: -2.7144 },
  'chepstow': { lat: 51.6423, lng: -2.6769 },
  'cardigan': { lat: 52.0823, lng: -4.6612 },
  'haverfordwest': { lat: 51.8020, lng: -4.9698 },
  'milford haven': { lat: 51.7142, lng: -5.0425 },
  'tenby': { lat: 51.6727, lng: -4.7003 },
  'fishguard': { lat: 51.9952, lng: -4.9841 },
  'port talbot': { lat: 51.5910, lng: -3.7846 },
  'neath': { lat: 51.6602, lng: -3.8060 },
  'llanelli': { lat: 51.6827, lng: -4.1622 },
  'barry': { lat: 51.4066, lng: -3.2755 },
  'penarth': { lat: 51.4314, lng: -3.1772 },
  
  // Welsh regions and counties
  'pembrokeshire': { lat: 51.6766, lng: -4.9084 },
  'ceredigion': { lat: 52.2158, lng: -4.0810 },
  'gwynedd': { lat: 52.9270, lng: -4.1327 },
  'powys': { lat: 52.3105, lng: -3.5168 },
  'anglesey': { lat: 53.2707, lng: -4.3219 },
  'ynys mon': { lat: 53.2707, lng: -4.3219 }, // Alternative name for Anglesey
  'conwy county': { lat: 53.1153, lng: -3.8269 },
  'denbighshire': { lat: 53.1041, lng: -3.3076 },
  'flintshire': { lat: 53.1666, lng: -3.1422 },
  'carmarthenshire': { lat: 51.8557, lng: -4.3059 },
  'glamorgan': { lat: 51.5313, lng: -3.5933 },
  'monmouthshire': { lat: 51.7894, lng: -2.8789 },
  'south wales': { lat: 51.6214, lng: -3.9436 },
  'north wales': { lat: 53.1351, lng: -3.8146 },
  'mid wales': { lat: 52.2158, lng: -3.8168 },
  'west wales': { lat: 52.0000, lng: -4.5000 },
  'valleys': { lat: 51.7500, lng: -3.3790 },
  'snowdonia': { lat: 53.0685, lng: -3.9347 },
  'brecon beacons': { lat: 51.9482, lng: -3.3903 },
};
