import Immutable from 'immutable';

import capsulingResultsActions from '../../../../../src/client/js/redux/actions/capsulingResultsActions';
import capsulingResultsReducers from '../../../../../src/client/js/redux/reducers/capsulingResultsReducers';

describe('capsuling results reducers', function () {
  describe('capsulingResultsReducer', function () {
    it('initializes to default value if capsuling profile is undefined', function () {
      let newState = capsulingResultsReducers.capsulingResultsReducer(undefined, {type: 'DUMMY'});

      expect(newState).toEqual(Immutable.fromJS({
        wardrobe: null
      }));
    });

    it('updates state with received data', function () {
      let newState = capsulingResultsReducers.capsulingResultsReducer(
        Immutable.fromJS({}),
        {
          type: capsulingResultsActions.RECEIVED_WARDROBE,
          data: [
            {
              'id': 1
            },
            {
              'id': 2
            }
          ]
        }
      );

      expect(newState.toJS()).toEqual({
        wardrobe: [
          {
            'id': 1
          },
          {
            'id': 2
          }
        ]
      });
    });
  });

  describe('suggestedItemsDataLoadReducer', function () {
    it('initializes to default value if suggestedItems is undefined', function () {
      let newState = capsulingResultsReducers.suggestedItemsDataLoadReducer(undefined, {type: 'DUMMY'});

      expect(newState).toEqual(Immutable.fromJS({
        suggestedItems: {}
      }));
    });

    it('updates state with received data', function () {
      let newState = capsulingResultsReducers.suggestedItemsDataLoadReducer(
        Immutable.fromJS({}),
        {
          type: capsulingResultsActions.RECEIVED_SUGGESTED_ITEMS,
          data: {
            'key': 'somekey',
            'results': {
              'items': [{
                'id': 785548,
                'name': 'Nike Men\'s Dri-Fit Crew Neck T-Shirt',
                'price': 18.99,
                'high': 19.99,
                'originalPrice': 25,
                'image': {
                  'url': 'http://slimages.macysassets.com/is/image/MCY/products/0/optimized/2913140_fpx.tif?'
                },
                'rating': {
                  'value': 4.7899,
                  'count': 138
                }
              }, {
                'id': 2678329,
                'name': 'Ralph Lauren Boys\' Casual & Cool Shorts, Jersey T-Shirt & Plaid Oxford Shirt',
                'price': 12.6,
                'high': 34.65,
                'originalPrice': 18,
                'originalHigh': 49.5,
                'image': {
                  'url': 'http://slimages.macysassets.com/is/image/MCY/products/5/optimized/3352615_fpx.tif?'
                },
                'rating': {
                  'value': 3.6667
                }
              }, {
                'id': 2731068,
                'name': 'INC International Concepts Cutout Hardware Top, Only at Macy\'s',
                'price': 34.99,
                'originalPrice': 49.5,
                'image': {
                  'url': 'http://slimages.macysassets.com/is/image/MCY/products/5/optimized/3412235_fpx.tif?'
                }
              }, {
                'id': 1873999,
                'name': 'INC International Concepts Sleeveless Surplice Top, Only at Macy\'s ',
                'price': 34.99,
                'originalPrice': 59.5,
                'image': {
                  'url': 'http://slimages.macysassets.com/is/image/MCY/products/2/optimized/3374882_fpx.tif?'
                },
                'rating': {
                  'value': 4.3898,
                  'count': 59
                }
              }, {
                'id': 2083610,
                'name': 'INC International Concepts Dolman-Sleeve Mixed-Media Utility Shirt, Only at Macy\'s',
                'price': 34.99,
                'originalPrice': 59.5,
                'image': {
                  'url': 'http://slimages.macysassets.com/is/image/MCY/products/1/optimized/3374411_fpx.tif?'
                },
                'rating': {
                  'value': 4.6588,
                  'count': 85
                }
              }, {
                'id': 2647770,
                'name': 'Club Room Men\'s Crew-Neck T-Shirt, Only at Macy\'s',
                'price': 12.99,
                'originalPrice': 19.5,
                'image': {
                  'url': 'http://slimages.macysassets.com/is/image/MCY/products/7/optimized/3315027_fpx.tif?'
                }
              }, {
                'id': 2730871,
                'name': 'INC International Concepts Ribbed V-Neck Top, Only at Macy\'s',
                'price': 29.99,
                'originalPrice': 39.5,
                'image': {
                  'url': 'http://slimages.macysassets.com/is/image/MCY/products/5/optimized/3412205_fpx.tif?'
                }
              }, {
                'id': 1723196,
                'name': 'Polo Ralph Lauren Men\'s Thermal Tops and Bottoms',
                'price': 27.99,
                'high': 40,
                'originalPrice': 39,
                'originalHigh': 48,
                'image': {
                  'url': 'http://slimages.macysassets.com/is/image/MCY/products/4/optimized/2368774_fpx.tif?'
                },
                'rating': {
                  'value': 4.4,
                  'count': 5
                }
              }, {
                'id': 1055604,
                'name': 'Polo Ralph Lauren Men\'s Loungewear, Thermal & Flannel Tops and Bottoms',
                'price': 19.99,
                'high': 40,
                'originalPrice': 38,
                'originalHigh': 45,
                'image': {
                  'url': 'http://slimages.macysassets.com/is/image/MCY/products/7/optimized/2340427_fpx.tif?'
                },
                'rating': {
                  'value': 5,
                  'count': 5
                }
              }, {
                'id': 2083314,
                'name': 'INC International Concepts Cap-Sleeve Cutout Top, Only at Macy\'s',
                'price': 22.99,
                'originalPrice': 39.5,
                'image': {
                  'url': 'http://slimages.macysassets.com/is/image/MCY/products/4/optimized/3433714_fpx.tif?'
                },
                'rating': {
                  'value': 4.4727,
                  'count': 55
                }
              }, {
                'id': 615042,
                'name': 'Nike Men\'s Classic Fleece Crew Pullover',
                'price': 29.99,
                'originalPrice': 40,
                'image': {
                  'url': 'http://slimages.macysassets.com/is/image/MCY/products/8/optimized/3093198_fpx.tif?'
                },
                'rating': {
                  'value': 4.3563,
                  'count': 87
                }
              }, {
                'id': 1046093,
                'name': 'American Rag Racerback Tank Top, Only at Macy\'s',
                'price': 9.99,
                'originalPrice': 14.5,
                'image': {
                  'url': 'http://slimages.macysassets.com/is/image/MCY/products/7/optimized/1596637_fpx.tif?'
                },
                'rating': {
                  'value': 4.457,
                  'count': 186
                }
              }],
              'total': 19667,
              'page': {
                'current': 1,
                'total': 1639
              },
              'searchphrase': 'Top'
            }
          }
        }
      );

      expect(newState.toJS()).toEqual({
        suggestedItems: {
          'somekey': {
            'items': [{
              'id': 785548,
              'name': 'Nike Men\'s Dri-Fit Crew Neck T-Shirt',
              'price': 18.99,
              'high': 19.99,
              'originalPrice': 25,
              'image': {
                'url': 'http://slimages.macysassets.com/is/image/MCY/products/0/optimized/2913140_fpx.tif?'
              },
              'rating': {
                'value': 4.7899,
                'count': 138
              }
            }, {
              'id': 2678329,
              'name': 'Ralph Lauren Boys\' Casual & Cool Shorts, Jersey T-Shirt & Plaid Oxford Shirt',
              'price': 12.6,
              'high': 34.65,
              'originalPrice': 18,
              'originalHigh': 49.5,
              'image': {
                'url': 'http://slimages.macysassets.com/is/image/MCY/products/5/optimized/3352615_fpx.tif?'
              },
              'rating': {
                'value': 3.6667
              }
            }, {
              'id': 2731068,
              'name': 'INC International Concepts Cutout Hardware Top, Only at Macy\'s',
              'price': 34.99,
              'originalPrice': 49.5,
              'image': {
                'url': 'http://slimages.macysassets.com/is/image/MCY/products/5/optimized/3412235_fpx.tif?'
              }
            }, {
              'id': 1873999,
              'name': 'INC International Concepts Sleeveless Surplice Top, Only at Macy\'s ',
              'price': 34.99,
              'originalPrice': 59.5,
              'image': {
                'url': 'http://slimages.macysassets.com/is/image/MCY/products/2/optimized/3374882_fpx.tif?'
              },
              'rating': {
                'value': 4.3898,
                'count': 59
              }
            }, {
              'id': 2083610,
              'name': 'INC International Concepts Dolman-Sleeve Mixed-Media Utility Shirt, Only at Macy\'s',
              'price': 34.99,
              'originalPrice': 59.5,
              'image': {
                'url': 'http://slimages.macysassets.com/is/image/MCY/products/1/optimized/3374411_fpx.tif?'
              },
              'rating': {
                'value': 4.6588,
                'count': 85
              }
            }, {
              'id': 2647770,
              'name': 'Club Room Men\'s Crew-Neck T-Shirt, Only at Macy\'s',
              'price': 12.99,
              'originalPrice': 19.5,
              'image': {
                'url': 'http://slimages.macysassets.com/is/image/MCY/products/7/optimized/3315027_fpx.tif?'
              }
            }, {
              'id': 2730871,
              'name': 'INC International Concepts Ribbed V-Neck Top, Only at Macy\'s',
              'price': 29.99,
              'originalPrice': 39.5,
              'image': {
                'url': 'http://slimages.macysassets.com/is/image/MCY/products/5/optimized/3412205_fpx.tif?'
              }
            }, {
              'id': 1723196,
              'name': 'Polo Ralph Lauren Men\'s Thermal Tops and Bottoms',
              'price': 27.99,
              'high': 40,
              'originalPrice': 39,
              'originalHigh': 48,
              'image': {
                'url': 'http://slimages.macysassets.com/is/image/MCY/products/4/optimized/2368774_fpx.tif?'
              },
              'rating': {
                'value': 4.4,
                'count': 5
              }
            }, {
              'id': 1055604,
              'name': 'Polo Ralph Lauren Men\'s Loungewear, Thermal & Flannel Tops and Bottoms',
              'price': 19.99,
              'high': 40,
              'originalPrice': 38,
              'originalHigh': 45,
              'image': {
                'url': 'http://slimages.macysassets.com/is/image/MCY/products/7/optimized/2340427_fpx.tif?'
              },
              'rating': {
                'value': 5,
                'count': 5
              }
            }, {
              'id': 2083314,
              'name': 'INC International Concepts Cap-Sleeve Cutout Top, Only at Macy\'s',
              'price': 22.99,
              'originalPrice': 39.5,
              'image': {
                'url': 'http://slimages.macysassets.com/is/image/MCY/products/4/optimized/3433714_fpx.tif?'
              },
              'rating': {
                'value': 4.4727,
                'count': 55
              }
            }, {
              'id': 615042,
              'name': 'Nike Men\'s Classic Fleece Crew Pullover',
              'price': 29.99,
              'originalPrice': 40,
              'image': {
                'url': 'http://slimages.macysassets.com/is/image/MCY/products/8/optimized/3093198_fpx.tif?'
              },
              'rating': {
                'value': 4.3563,
                'count': 87
              }
            }, {
              'id': 1046093,
              'name': 'American Rag Racerback Tank Top, Only at Macy\'s',
              'price': 9.99,
              'originalPrice': 14.5,
              'image': {
                'url': 'http://slimages.macysassets.com/is/image/MCY/products/7/optimized/1596637_fpx.tif?'
              },
              'rating': {
                'value': 4.457,
                'count': 186
              }
            }],
            'total': 19667,
            'page': {
              'current': 1,
              'total': 1639
            },
            'searchphrase': 'Top'
          }
        }
      });
    });
  });
});
