import 'whatwg-fetch';
import { normalize, Schema, arrayOf } from 'normalizr';
import sampleData from 'data/sample.js';

function productHasWeightAttribute(product) {
  return product.ItemAttributes &&
    product.ItemAttributes[0].ItemDimensions &&
    product.ItemAttributes[0].ItemDimensions[0].Weight;
}

function getProductId(product) {
  return product.ASIN[0];
}

function getProductName(product) {
  return product.ItemAttributes[0].Title[0];
}

function getProductImage(product) {
  return product.SmallImage[0].URL[0];
}

function getProductWeightUnit(product) {
  return product.ItemAttributes[0].ItemDimensions[0].Weight[0].$.Units;
}

function getProductWeight(product) {
  return product.ItemAttributes[0].ItemDimensions[0].Weight[0]._;
}

function getWeightInLbs(unit, weight) {
  const lbConversionMap = {
    grams: 0.00220462,
    'hundredths-pounds': 0.01,
    ounces: 0.0625,
    pounds: 1
  };

  return parseFloat(weight) * lbConversionMap[unit];
}

function processData(data) {
  return data
    .filter(product => productHasWeightAttribute(product))
    .map((product, index) => {
      const unit = getProductWeightUnit(product);
      const weight = getProductWeight(product);

      return {
        id: getProductId(product),
        name: getProductName(product),
        image: getProductImage(product),
        weight: getWeightInLbs(unit, weight)
      };
    });
}

export async function fetchGearLists() {
  const gearList = new Schema('gearList');
  gearList.define();

  const data = Object.assign({}, normalize(sampleData, arrayOf(gearList)));

  return data.entities;
}

export async function fetchGearListSuggestions(keywords) {
  const res = await fetch(`/api/gear/${keywords}`);

  if (!res.ok) {
    return Promise.reject();
  }

  const data = await res.json();

  return processData(data);
}
