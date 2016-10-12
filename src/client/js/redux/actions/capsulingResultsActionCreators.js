import 'isomorphic-fetch';
import _ from 'lodash';

import capsulingResultsActions from './capsulingResultsActions';

export function receivedWardrobe(data) {
  return {
    type: capsulingResultsActions.RECEIVED_WARDROBE,
    data: data
  };
}

export function getWardrobe() {
  return dispatch =>
    window.fetch('/api/capsuling/wardrobe', {
      method: 'GET',
      credentials: 'same-origin',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(function (response) {
        if (response.status >= 400) throw new Error('Error response from server');
        return response.text();
      })
      .then(function (data) {
        dispatch(receivedWardrobe(JSON.parse(data)));
      }).catch(function (error) {
        console.log('error loading wardrobe info: ', error.message);
      });
};

export function receivedSuggestedItems(data) {
  return {
    type: capsulingResultsActions.RECEIVED_SUGGESTED_ITEMS,
    data: data
  };
}

export function getItemNameForSearch(itemName, clothingSize, shoeSize) {
  var shoesList = [
    'Booties',
    'Boots',
    'Flats',
    'Pumps',
    'Heels',
    'Loafers',
    'Oxfords',
    'Sandals',
    'Athletic Shoes',
    'Wedges',
    'Sneakers'
  ];
  var itemNameForSearch = itemName;

  if (itemName === 'Mini' || itemName === 'Knee-length' || itemName === 'Maxi') {
    itemNameForSearch += ' Skirt';
  } else if (itemName === 'Loafers') {
    itemNameForSearch = 'Womens Loafers';
  } else if (itemName === 'Dress Trousers') {
    itemNameForSearch = 'Pants&PANT_STYLE=Trouser';
  } else if (itemName === 'Day Dress') {
    itemNameForSearch = 'Dresses&SPECIAL_OCCASIONS=Daytime';
  } else if (itemName === 'Business Dress') {
    itemNameForSearch = 'Dresses&SPECIAL_OCCASIONS=Wear to Work';
  } else if (itemName === 'Jackets') {
    itemNameForSearch = itemName + '&JACKET_STYLE=Active,Anorak,Bomber,Denim';
  } else if (itemName === 'Overcoat') {
    itemNameForSearch = itemName + '&COAT_STYLE=Raincoat,Trenchcoat';
  }

  if (_.includes(shoesList, itemName)) {
    itemNameForSearch += '&SHOE_WIDTH=' + shoeSize;
  } else {
    itemNameForSearch += '&SPECIAL_SIZE=' + clothingSize;
  }
  return itemNameForSearch;
}

export function getSuggestedItems(itemName, itemColors, clothingSize, shoeSize) {
  var itemNameForSearch = getItemNameForSearch(itemName, clothingSize, shoeSize);

  var apiUrl = '/api/capsuling/products?searchphrase=' + itemNameForSearch + '&GENDER=Female%2CTeen%20Girls' +
    (itemColors === '' ? '' : '&COLOR_NORMAL=' + itemColors);

  return dispatch =>
    window.fetch(apiUrl, {
      method: 'GET',
      credentials: 'same-origin',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(function (response) {
        if (response.status >= 400) throw new Error('Error response from server');
        return response.text();
      })
      .then(function (data) {
        var finalData = JSON.parse(data),
          output;

        if (finalData) {
          finalData.requestComplete = true;
        }
        output = {
          key: itemName + ':' + itemColors,
          results: finalData
        };

        dispatch(receivedSuggestedItems(output));
      }).catch(function (error) {
        console.log('error loading suggested items: ', error.message);
      });
}

export default {
  receivedWardrobe,
  getWardrobe,
  receivedSuggestedItems,
  getSuggestedItems
};
