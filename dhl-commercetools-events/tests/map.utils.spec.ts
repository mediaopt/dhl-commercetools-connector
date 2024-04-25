import { Order, TypedMoney } from '@commercetools/platform-sdk';
import { describe, test } from '@jest/globals';
import { mapCommercetoolsPrice, mapItems } from '../src/utils/map.utils';
import { Value, ValueCurrencyEnum } from '../src/parcel-de-shipping';
import { SettingsFormDataType } from '../src/types/index.types';

describe('Testing map utilities', () => {
  test.each([
    {
      commercetoolsMoney: {
        currencyCode: 'USD',
        centAmount: 1,
        fractionDigits: 2,
      } as TypedMoney,
      expectedDHLValue: {
        value: 0.01,
        currency: ValueCurrencyEnum.Usd,
      } as Value,
    },
    {
      commercetoolsMoney: {
        currencyCode: 'GBP',
        centAmount: 6532,
        fractionDigits: 2,
      } as TypedMoney,
      expectedDHLValue: {
        value: 65.32,
        currency: ValueCurrencyEnum.Gbp,
      } as Value,
    },
    {
      commercetoolsMoney: {
        currencyCode: 'EUR',
        centAmount: 3097,
        fractionDigits: 2,
      } as TypedMoney,
      expectedDHLValue: {
        value: 30.97,
        currency: ValueCurrencyEnum.Eur,
      } as Value,
    },
    {
      commercetoolsMoney: {
        currencyCode: 'EUR',
        centAmount: 1,
        fractionDigits: 3,
      } as TypedMoney,
      expectedDHLValue: {
        value: 0.001,
        currency: ValueCurrencyEnum.Eur,
      } as Value,
    },
    {
      commercetoolsMoney: {
        currencyCode: 'EUR',
        centAmount: 6532,
        fractionDigits: 4,
      } as TypedMoney,
      expectedDHLValue: {
        value: 0.6532,
        currency: ValueCurrencyEnum.Eur,
      } as Value,
    },
    {
      commercetoolsMoney: {
        currencyCode: 'EUR',
        centAmount: 3097,
        fractionDigits: 1,
      } as TypedMoney,
      expectedDHLValue: {
        currency: ValueCurrencyEnum.Eur,
        value: 309.7,
      } as Value,
    },
  ])(
    'test mapping of commercetools amount',
    ({ commercetoolsMoney, expectedDHLValue }) => {
      expect(mapCommercetoolsPrice(commercetoolsMoney)).toEqual(
        expectedDHLValue
      );
    }
  );

  test('map items', () => {
    const order = {
      lineItems: [
        {
          id: '1',
          name: {
            en: 'Title',
          },
          price: {
            value: {
              currencyCode: 'EUR',
              centAmount: 100,
              fractionDigits: 2,
            },
          },
          variant: {},
        },
      ],
    };
    const lineItems = [
      {
        id: '1',
        quantity: 2,
      },
    ];
    const settings: SettingsFormDataType = {
      weight: {
        fallbackWeight: 0.4,
        unit: 'kg',
        attribute: 'weight',
      },
    } as SettingsFormDataType;
    const commodityItems = mapItems(
      order as unknown as Order,
      lineItems,
      settings
    );
    expect(commodityItems).toHaveLength(1);
    expect(commodityItems[0].itemWeight).toEqual({ uom: 'g', value: 400 });
    expect(commodityItems[0].itemValue).toEqual({ currency: 'EUR', value: 1 });
  });
});
