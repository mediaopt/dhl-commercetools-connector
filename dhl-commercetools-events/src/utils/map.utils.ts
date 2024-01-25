import {
  Consignee,
  ContactAddress,
  Country,
  Shipment,
  ShipmentShipper,
} from '../parcel-de-shipping';
import { Address, Order } from '@commercetools/platform-sdk';
import CustomError from '../errors/custom.error';
import { logger } from './logger.utils';
import {
  SettingsFormDataType,
  ShippingMethodDHLCustomFields,
} from '../types/index.types';

function mapConsignee(shippingAddress?: Address): Consignee {
  logger.info(JSON.stringify(shippingAddress));
  if (!shippingAddress) {
    throw new CustomError(500, 'Order does not contain a shipping address');
  }
  return {
    name1: `${shippingAddress?.firstName} ${shippingAddress?.lastName}`,
    addressStreet: shippingAddress.streetName as string,
    addressHouse: shippingAddress.streetNumber,
    additionalAddressInformation1: shippingAddress.additionalAddressInfo,
    postalCode: shippingAddress.postalCode as string,
    city: shippingAddress.city as string,
    country: countryISOMapping[
      shippingAddress.country as CountryISO2
    ] as Country,
  };
}

function mapShipper(settings: SettingsFormDataType): ShipmentShipper {
  return removeEmptyProperties(settings.dispatch) as ShipmentShipper;
}

function mapReturnAddress(settings: SettingsFormDataType): ContactAddress {
  return removeEmptyProperties(
    settings.returnIsDispatch ? settings.dispatch : settings.return
  ) as ContactAddress;
}

function removeEmptyProperties<T extends Object>(object: T): T {
  return Object.fromEntries(Object.entries(object).filter(([_, v]) => v)) as T;
}

function mapBillingNumber(fields: ShippingMethodDHLCustomFields) {
  return `${fields.ekp}${productProcedureMapping[fields.product]}${
    fields.participation
  }`;
}

function mapReturnBillingNumber(fields: ShippingMethodDHLCustomFields) {
  return `${fields.ekp}${productReturnProcedureMapping[fields.product]}${
    fields.participation
  }`;
}

export const mapCommercetoolsOrderToDHLShipment = (
  order: Order,
  settings: SettingsFormDataType
): Shipment => {
  var shippingMethod = order.shippingInfo?.shippingMethod?.obj;
  var dhlCustomFields = shippingMethod?.custom?.fields as ShippingMethodDHLCustomFields;
  if (!dhlCustomFields) {
    throw new CustomError(500, 'Shipping method is not a dhl shipping method');
  }
  return {
    product: dhlCustomFields.product,
    billingNumber: mapBillingNumber(
      dhlCustomFields
    ),
    shipper: mapShipper(settings),
    consignee: mapConsignee(order.shippingAddress),
    services: {
      dhlRetoure: productReturnProcedureMapping[dhlCustomFields.product] ? {
        billingNumber: mapReturnBillingNumber(
          dhlCustomFields
        ),
        returnAddress: mapReturnAddress(settings),
      } : undefined,
    },
    details: {
      weight: {
        uom: 'g',
        value: 500, // @TODO
      },
    },
  };
};

const productProcedureMapping = {
  V01PAK: '01',
  V53WPAK: '53',
  V54EPAK: '54',
  V62WP: '62',
  V66WPI: '66',
};

const productReturnProcedureMapping = {
  V01PAK: '07',
};

const countryISOMapping = {
  AF: 'AFG',
  AX: 'ALA',
  AL: 'ALB',
  DZ: 'DZA',
  AS: 'ASM',
  AD: 'AND',
  AO: 'AGO',
  AI: 'AIA',
  AQ: 'ATA',
  AG: 'ATG',
  AR: 'ARG',
  AM: 'ARM',
  AW: 'ABW',
  AU: 'AUS',
  AT: 'AUT',
  AZ: 'AZE',
  BS: 'BHS',
  BH: 'BHR',
  BD: 'BGD',
  BB: 'BRB',
  BY: 'BLR',
  BE: 'BEL',
  BZ: 'BLZ',
  BJ: 'BEN',
  BM: 'BMU',
  BT: 'BTN',
  BO: 'BOL',
  BA: 'BIH',
  BW: 'BWA',
  BV: 'BVT',
  BR: 'BRA',
  VG: 'VGB',
  IO: 'IOT',
  BN: 'BRN',
  BG: 'BGR',
  BF: 'BFA',
  BI: 'BDI',
  KH: 'KHM',
  CM: 'CMR',
  CA: 'CAN',
  CV: 'CPV',
  KY: 'CYM',
  CF: 'CAF',
  TD: 'TCD',
  CL: 'CHL',
  CN: 'CHN',
  HK: 'HKG',
  MO: 'MAC',
  CX: 'CXR',
  CC: 'CCK',
  CO: 'COL',
  KM: 'COM',
  CG: 'COG',
  CD: 'COD',
  CK: 'COK',
  CR: 'CRI',
  CI: 'CIV',
  HR: 'HRV',
  CU: 'CUB',
  CY: 'CYP',
  CZ: 'CZE',
  DK: 'DNK',
  DJ: 'DJI',
  DM: 'DMA',
  DO: 'DOM',
  EC: 'ECU',
  EG: 'EGY',
  SV: 'SLV',
  GQ: 'GNQ',
  ER: 'ERI',
  EE: 'EST',
  ET: 'ETH',
  FK: 'FLK',
  FO: 'FRO',
  FJ: 'FJI',
  FI: 'FIN',
  FR: 'FRA',
  GF: 'GUF',
  PF: 'PYF',
  TF: 'ATF',
  GA: 'GAB',
  GM: 'GMB',
  GE: 'GEO',
  DE: 'DEU',
  GH: 'GHA',
  GI: 'GIB',
  GR: 'GRC',
  GL: 'GRL',
  GD: 'GRD',
  GP: 'GLP',
  GU: 'GUM',
  GT: 'GTM',
  GG: 'GGY',
  GN: 'GIN',
  GW: 'GNB',
  GY: 'GUY',
  HT: 'HTI',
  HM: 'HMD',
  VA: 'VAT',
  HN: 'HND',
  HU: 'HUN',
  IS: 'ISL',
  IN: 'IND',
  ID: 'IDN',
  IR: 'IRN',
  IQ: 'IRQ',
  IE: 'IRL',
  IM: 'IMN',
  IL: 'ISR',
  IT: 'ITA',
  JM: 'JAM',
  JP: 'JPN',
  JE: 'JEY',
  JO: 'JOR',
  KZ: 'KAZ',
  KE: 'KEN',
  KI: 'KIR',
  KP: 'PRK',
  KR: 'KOR',
  KW: 'KWT',
  KG: 'KGZ',
  LA: 'LAO',
  LV: 'LVA',
  LB: 'LBN',
  LS: 'LSO',
  LR: 'LBR',
  LY: 'LBY',
  LI: 'LIE',
  LT: 'LTU',
  LU: 'LUX',
  MK: 'MKD',
  MG: 'MDG',
  MW: 'MWI',
  MY: 'MYS',
  MV: 'MDV',
  ML: 'MLI',
  MT: 'MLT',
  MH: 'MHL',
  MQ: 'MTQ',
  MR: 'MRT',
  MU: 'MUS',
  YT: 'MYT',
  MX: 'MEX',
  FM: 'FSM',
  MD: 'MDA',
  MC: 'MCO',
  MN: 'MNG',
  ME: 'MNE',
  MS: 'MSR',
  MA: 'MAR',
  MZ: 'MOZ',
  MM: 'MMR',
  NA: 'NAM',
  NR: 'NRU',
  NP: 'NPL',
  NL: 'NLD',
  AN: 'ANT',
  NC: 'NCL',
  NZ: 'NZL',
  NI: 'NIC',
  NE: 'NER',
  NG: 'NGA',
  NU: 'NIU',
  NF: 'NFK',
  MP: 'MNP',
  NO: 'NOR',
  OM: 'OMN',
  PK: 'PAK',
  PW: 'PLW',
  PS: 'PSE',
  PA: 'PAN',
  PG: 'PNG',
  PY: 'PRY',
  PE: 'PER',
  PH: 'PHL',
  PN: 'PCN',
  PL: 'POL',
  PT: 'PRT',
  PR: 'PRI',
  QA: 'QAT',
  RE: 'REU',
  RO: 'ROU',
  RU: 'RUS',
  RW: 'RWA',
  BL: 'BLM',
  SH: 'SHN',
  KN: 'KNA',
  LC: 'LCA',
  MF: 'MAF',
  PM: 'SPM',
  VC: 'VCT',
  WS: 'WSM',
  SM: 'SMR',
  ST: 'STP',
  SA: 'SAU',
  SN: 'SEN',
  RS: 'SRB',
  SC: 'SYC',
  SL: 'SLE',
  SG: 'SGP',
  SK: 'SVK',
  SI: 'SVN',
  SB: 'SLB',
  SO: 'SOM',
  ZA: 'ZAF',
  GS: 'SGS',
  SS: 'SSD',
  ES: 'ESP',
  LK: 'LKA',
  SD: 'SDN',
  SR: 'SUR',
  SJ: 'SJM',
  SZ: 'SWZ',
  SE: 'SWE',
  CH: 'CHE',
  SY: 'SYR',
  TW: 'TWN',
  TJ: 'TJK',
  TZ: 'TZA',
  TH: 'THA',
  TL: 'TLS',
  TG: 'TGO',
  TK: 'TKL',
  TO: 'TON',
  TT: 'TTO',
  TN: 'TUN',
  TR: 'TUR',
  TM: 'TKM',
  TC: 'TCA',
  TV: 'TUV',
  UG: 'UGA',
  UA: 'UKR',
  AE: 'ARE',
  GB: 'GBR',
  US: 'USA',
  UM: 'UMI',
  UY: 'URY',
  UZ: 'UZB',
  VU: 'VUT',
  VE: 'VEN',
  VN: 'VNM',
  VI: 'VIR',
  WF: 'WLF',
  EH: 'ESH',
  YE: 'YEM',
  ZM: 'ZMB',
  ZW: 'ZWE',
  XK: 'XKX',
};

export type CountryISO2 = keyof typeof countryISOMapping;