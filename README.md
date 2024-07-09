![build](https://github.com/mediaopt/dhl-commercetools-connector/actions/workflows/build.yml/badge.svg)
![test](https://github.com/mediaopt/dhl-commercetools-connector/actions/workflows/test.yml/badge.svg)
![audit](https://github.com/mediaopt/dhl-commercetools-connector/actions/workflows/audit.yml/badge.svg)

# dhl-commercetools-custom-application

## Introduction
- this application provides a custom application in the commercetools Merchant Center
- you will find a new tab in the merchant center for `DHL Produkte & Services Commercetools` where you can set dispatch and return addresses and other Shipment settings

## Prerequisite

- please create a custom application in the commercetools Merchant Center

## Installation
- when deploying the connect app, provide the Application ID and entryPointUriPath that is provided when you added the Custom Application in the Merchant Center
- in case that the Application URL is not applied automatically, please insert the URL of the connect custom application in the settings of your custom application

# dhl-commercetools-events

## Indroduction
- the connector handles certain events in commercetools composable commerce to integrate DHL label generation
  - whenever a delivery is created for an order that is using that shipping method, the connector will generate a label and store it in a parcel object for that delivery
  - whenever a parcel is deleted that contains a DHL label, the label will be deleted on DHL side

## Prerequisite
- create an API client for the connector that has at least the following rights:
  - View and Manage Orders
  - View and Manage Subscriptions
  - View and Manage Types
  - View Shipping methods
- create a business customer account for DHL [here](https://www.dhl.de/en/geschaeftskunden/paket.html)

## Installation and Configuration
- when installing the connector, provide the credentials from your commercetools API client and DHL business customer account
- at the end of the installation process, custom types for shipping methods, deliveries and parcels are created
- to utilise the connector, assign one of the new custom types (e.g. DHL Paket) to a shipping method and atjust the parameters to your need
