import {
  Delivery,
  Order,
  Parcel,
} from '@commercetools/platform-sdk';
import { SettingsFormDataType } from '../src/types/index.types';

export const parcel: Parcel = {
  id: 'a801af06-2bff-4c58-a8c4-c8a260a54529',
  createdAt: '2024-02-29T10:15:28.932Z',
  trackingData: {
    trackingId: '0034043333301020001499266',
    carrier: 'DHL',
    isReturn: false,
  },
  items: [],
  custom: {
    type: {
      typeId: 'type',
      id: '113594d7-f1fd-4c82-9a46-a49ab36edab8',
    },
    fields: {
      deliveryLabel:
        'https://api-sandbox.dhl.com/parcel/de/shipping/v2/labels?token=x5xzrHE7ctmqPqk33k%2BKkKVOF7rDdlCe35HwWACAmA5yiaN4QeyVlJ2S%2FyRW1IQrbsqJ%2Bf%2FB4JuUWex0tKUE%2BOrgzoO6MrjST%2FOE69eW2sRhXUWOekOuei9gBUOeM9N13FdHokfrvTPLtWPvUXgvghW9FK2aRyMHJfa6J%2Bwpy6Q%3D',
      dhlShipmentNumber: '0034043333301020001499266',
    },
  },
};

export const delivery: Delivery = {
  id: 'a459f310-ccf1-408e-ab8d-fc73d805f47b',
  createdAt: '2024-02-29T10:15:27.465Z',
  items: [
    {
      id: '7046a534-61e6-48c2-bf0f-fc754a899432',
      quantity: 1,
    },
  ],
  parcels: [parcel],
};

export const order: Order = {
  id: 'e5bd14a3-94eb-4ed4-a378-02b0675d6e94',
  version: 4,
  lastMessageSequenceNumber: 3,
  createdAt: '2024-02-29T10:15:06.347Z',
  lastModifiedAt: '2024-02-29T10:15:28.936Z',
  customerId: '05bba758-bdbc-472d-a6f4-44c977309e1f',
  customerEmail: 'seb@example.de',
  totalPrice: {
    type: 'centPrecision',
    currencyCode: 'EUR',
    centAmount: 3499,
    fractionDigits: 2,
  },
  taxedPrice: {
    totalNet: {
      type: 'centPrecision',
      currencyCode: 'EUR',
      centAmount: 2940,
      fractionDigits: 2,
    },
    totalGross: {
      type: 'centPrecision',
      currencyCode: 'EUR',
      centAmount: 3499,
      fractionDigits: 2,
    },
    taxPortions: [
      {
        rate: 0.19,
        amount: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 559,
          fractionDigits: 2,
        },
        name: 'Standard VAT for Germany',
      },
    ],
    totalTax: {
      type: 'centPrecision',
      currencyCode: 'EUR',
      centAmount: 559,
      fractionDigits: 2,
    },
  },
  country: 'DE',
  taxedShippingPrice: {
    totalNet: {
      type: 'centPrecision',
      currencyCode: 'EUR',
      centAmount: 168,
      fractionDigits: 2,
    },
    totalGross: {
      type: 'centPrecision',
      currencyCode: 'EUR',
      centAmount: 200,
      fractionDigits: 2,
    },
    taxPortions: [
      {
        rate: 0.19,
        amount: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 32,
          fractionDigits: 2,
        },
        name: 'Standard VAT for Germany',
      },
    ],
    totalTax: {
      type: 'centPrecision',
      currencyCode: 'EUR',
      centAmount: 32,
      fractionDigits: 2,
    },
  },
  orderState: 'Open',
  syncInfo: [],
  returnInfo: [],
  taxMode: 'Platform',
  inventoryMode: 'None',
  taxRoundingMode: 'HalfEven',
  taxCalculationMode: 'LineItemLevel',
  origin: 'Merchant',
  shippingMode: 'Single',
  shippingInfo: {
    shippingMethodName: 'DHL Paket (with age check 16+)',
    price: {
      type: 'centPrecision',
      currencyCode: 'EUR',
      centAmount: 200,
      fractionDigits: 2,
    },
    shippingRate: {
      price: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 200,
        fractionDigits: 2,
      },
      freeAbove: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 300000,
        fractionDigits: 2,
      },
      tiers: [],
    },
    taxRate: {
      name: 'Standard VAT for Germany',
      amount: 0.19,
      includedInPrice: true,
      country: 'DE',
      id: 'yvUT1MpL',
      key: 'vat-standard-de',
      subRates: [],
    },
    taxCategory: {
      typeId: 'tax-category',
      id: '45acf8ad-8733-437e-9399-8589eeadaeb3',
    },
    deliveries: [delivery],
    shippingMethod: {
      typeId: 'shipping-method',
      id: 'ad74c192-06c0-4c7b-8024-a979a37a6a9a',
      obj: {
        id: 'ad74c192-06c0-4c7b-8024-a979a37a6a9a',
        version: 8,
        createdAt: '2024-02-27T08:41:05.077Z',
        lastModifiedAt: '2024-02-28T10:35:29.337Z',
        name: 'DHL Paket (with age check 16+)',
        localizedName: {
          'de-DE': 'DHL Paket (mit Alterssichtprüfung)',
          'en-GB': 'DHL Paket (with age check 16+)',
        },
        taxCategory: {
          typeId: 'tax-category',
          id: '45acf8ad-8733-437e-9399-8589eeadaeb3',
        },
        zoneRates: [
          {
            zone: {
              typeId: 'zone',
              id: '4dc98574-4275-404d-8aa9-0bcebb8be83f',
            },
            shippingRates: [
              {
                price: {
                  type: 'centPrecision',
                  currencyCode: 'EUR',
                  centAmount: 200,
                  fractionDigits: 2,
                },
                freeAbove: {
                  type: 'centPrecision',
                  currencyCode: 'EUR',
                  centAmount: 300000,
                  fractionDigits: 2,
                },
                tiers: [],
              },
            ],
          },
        ],
        isDefault: false,
        key: 'dhl-paket-16',
        custom: {
          type: {
            typeId: 'type',
            id: 'e467350d-4c3f-4f2b-be39-bcb8be669c9c',
            obj: {
              id: 'e467350d-4c3f-4f2b-be39-bcb8be669c9c',
              version: 7,
              createdAt: '2024-02-09T08:49:50.819Z',
              lastModifiedAt: '2024-02-26T11:05:40.726Z',
              key: 'dhl-shipping-method-dhl-paket',
              name: {
                en: 'DHL Paket',
              },
              resourceTypeIds: ['shipping-method'],
              fieldDefinitions: [
                {
                  name: 'ekp',
                  label: {
                    en: 'EKP',
                    de: 'EKP',
                  },
                  required: true,
                  type: {
                    name: 'String',
                  },
                  inputHint: 'SingleLine',
                },
                {
                  name: 'participation',
                  label: {
                    en: 'Contract Participation',
                    de: 'Teilnahme',
                  },
                  required: true,
                  type: {
                    name: 'String',
                  },
                  inputHint: 'SingleLine',
                },
                {
                  name: 'additionalInsurance',
                  label: {
                    en: 'Additional insurance',
                    de: 'Transportversicherung',
                  },
                  required: false,
                  type: {
                    name: 'Boolean',
                  },
                  inputHint: 'SingleLine',
                },
                {
                  name: 'identCheckMinimumAge',
                  label: {
                    en: 'Minimum age',
                    de: 'Alterssichtprüfung',
                  },
                  required: false,
                  type: {
                    name: 'Enum',
                    values: [
                      {
                        key: '',
                        label: 'no check',
                      },
                      {
                        key: 'A16',
                        label: '16+',
                      },
                      {
                        key: 'A18',
                        label: '18+',
                      },
                    ],
                  },
                  inputHint: 'SingleLine',
                },
              ],
            },
          },
          fields: {
            ekp: '3333333333',
            participation: '02',
            additionalInsurance: false,
            identCheckMinimumAge: 'A16',
          },
        },
      },
    },
    taxedPrice: {
      totalNet: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 168,
        fractionDigits: 2,
      },
      totalGross: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 200,
        fractionDigits: 2,
      },
      totalTax: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 32,
        fractionDigits: 2,
      },
    },
    shippingMethodState: 'MatchesCart',
  },
  shippingAddress: {
    id: 'DFqO7sWX',
    firstName: 'Sebastian',
    lastName: 'Müller',
    streetName: 'Schulstrasse',
    streetNumber: '12',
    postalCode: '80331',
    city: 'München',
    country: 'DE',
  },
  shipping: [],
  lineItems: [
    {
      id: '7046a534-61e6-48c2-bf0f-fc754a899432',
      productId: '7987d5d9-153a-4d84-be03-249c6adcdd3d',
      productKey: 'indoor-jute-planter',
      name: {
        'en-US': 'Indoor Jute Planter',
        'en-GB': 'Indoor Jute Planter',
        'de-DE': 'Indoor Jute Blumentopf ',
      },
      productType: {
        typeId: 'product-type',
        id: 'cf44f5a6-02d5-46b9-87d4-2e33051e0a2c',
      },
      productSlug: {
        'en-US': 'indoor-jute-planter',
        'en-GB': 'indoor-jute-planter',
        'de-DE': 'indoor-jute-planter',
      },
      variant: {
        id: 1,
        sku: 'IJP-03',
        prices: [
          {
            id: 'ba05f3d0-a69c-4c01-a439-0b21fd9479eb',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 3299,
              fractionDigits: 2,
            },
            country: 'DE',
          },
          {
            id: '878c62bb-fdf4-4c0c-8340-d04c68304192',
            value: {
              type: 'centPrecision',
              currencyCode: 'GBP',
              centAmount: 3299,
              fractionDigits: 2,
            },
            country: 'GB',
          },
          {
            id: 'f783027c-f03f-4fda-9291-d1ccc14b281c',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 3299,
              fractionDigits: 2,
            },
            country: 'US',
          },
        ],
        images: [
          {
            url: 'https://storage.googleapis.com/merchant-center-europe/sample-data/goodstore/Indoor_Jute_Planter-1.1.jpeg',
            dimensions: {
              w: 5000,
              h: 5000,
            },
          },
        ],
        attributes: [
          {
            name: 'productspec',
            value: {
              'en-GB': '- Plant not included',
              'en-US': '- Plant not included',
              'de-DE': '- Pflanze nicht im Lieferumfang enthalten',
            },
          },
          {
            name: 'size',
            value: {
              'en-GB': 'Large',
            },
          },
          {
            name: 'color-filter',
            value: {
              key: '#000',
              label: {
                'de-DE': 'Schwarz',
                'en-GB': 'Black',
                'en-US': 'Black',
              },
            },
          },
          {
            name: 'weight',
            value: 0.5,
          },
        ],
        assets: [],
        availability: {
          isOnStock: true,
          availableQuantity: 3000,
        },
      },
      price: {
        id: 'ba05f3d0-a69c-4c01-a439-0b21fd9479eb',
        value: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 3299,
          fractionDigits: 2,
        },
        country: 'DE',
      },
      quantity: 1,
      discountedPricePerQuantity: [],
      taxRate: {
        name: 'Standard VAT for Germany',
        amount: 0.19,
        includedInPrice: true,
        country: 'DE',
        id: 'yvUT1MpL',
        key: 'vat-standard-de',
        subRates: [],
      },
      perMethodTaxRate: [],
      addedAt: '2024-02-29T10:14:47.025Z',
      lastModifiedAt: '2024-02-29T10:14:47.025Z',
      state: [
        {
          quantity: 1,
          state: {
            typeId: 'state',
            id: 'ccd41e61-81de-4799-a9e8-3ed988a355ce',
          },
        },
      ],
      priceMode: 'Platform',
      lineItemMode: 'Standard',
      totalPrice: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 3299,
        fractionDigits: 2,
      },
      taxedPrice: {
        totalNet: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 2772,
          fractionDigits: 2,
        },
        totalGross: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 3299,
          fractionDigits: 2,
        },
        totalTax: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 527,
          fractionDigits: 2,
        },
      },
      taxedPricePortions: [],
    },
  ],
  customLineItems: [],
  discountCodes: [],
  cart: {
    typeId: 'cart',
    id: '6bc5da53-652e-4d15-bc91-ee4175cffa78',
  },
  billingAddress: {
    id: 'DFqO7sWX',
    firstName: 'Sebastian',
    lastName: 'Müller',
    streetName: 'Schulstrasse',
    streetNumber: '12',
    postalCode: '80331',
    city: 'München',
    country: 'DE',
  },
  itemShippingAddresses: [],
  refusedGifts: [],
  store: {
    typeId: 'store',
    key: 'the-good-store',
  },
};

export const settings: SettingsFormDataType = {
  dispatch: {
    name1: 'Mediaopt GmbH',
    name2: '',
    name3: '',
    addressStreet: 'Elbestraße 28/29',
    addressHouse: '',
    postalCode: '12045',
    city: 'Berlin',
    country: 'DEU',
    contactName: '',
    email: '',
  },
  return: {
    name1: '',
    name2: '',
    name3: '',
    addressStreet: '',
    addressHouse: '',
    postalCode: '',
    city: '',
    country: 'DEU',
    contactName: '',
    email: '',
  },
  returnIsDispatch: true,
  onlyAllowValidRoutingCodes: false,
  weight: {
    attribute: 'weight',
    unit: 'kg',
    fallbackWeight: 0.45,
  },
};
