import 'isomorphic-fetch';
import cookie from 'react-cookie';
import _ from 'lodash';

import capsulingProfileActions from './capsulingProfileActions';
import { browserHistory } from 'react-router';

export function receivedCapsulingProfile(data) {
  return {
    type: capsulingProfileActions.RECEIVED_CAPSULING_PROFILE_DATA,
    data: data
  };
}

export function loadCapsulingProfile(userId) {
  return dispatch =>
    window.fetch('/api/users/' + (userId || cookie.load('userid')) + '/capsuling/profile', {
      method: 'GET',
      credentials: 'same-origin',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(function (response) {
        if (response.status >= 500) throw new Error('Error response from server');
        if (response.status >= 404) throw new Error('No Capsuling profile found');
        return response.text();
      })
      .then(function (data) {
        dispatch(receivedCapsulingProfile(JSON.parse(data)));
      }).catch(function (error) {
        console.log('error loading capsuling profile info: ', error.message);
      });
}

export function saveCapsulingProfile(userId, data, callback) {
  function saveProfileToElasticSearch(dispatch, resolve, reject) {
    window.fetch('/api/users/' + (userId || cookie.load('userid')) + '/capsuling/profile', {
      method: 'POST',
      credentials: 'same-origin',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    })
      .then(function (response) {
        if (response.status >= 400) throw new Error('Error response from server');
        return response.text();
      })
      .then(function () {
        dispatch(receivedCapsulingProfile(data));
        resolve();
      }).catch(function (error) {
        console.log('error saving capsuling profile info: ', error.message);
        reject(error);
      });
  }

  return dispatch => {
    return new Promise(function (resolve, reject) {
      if (data.wardrobeId && data.colorPalette) {
        window.fetch('/api/capsuling/wardrobe/' + data.wardrobeId, {
          method: 'PUT',
          credentials: 'same-origin',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            'wardrobeId': data.wardrobeId,
            'colorPalette': data.colorPalette
          })
        })
          .then(function (response) {
            if (response.status >= 400) throw new Error('Error response from server');
            return response.text();
          })
          .then(function (response) {
            // User Profile POST
            var wardrobeId = JSON.parse(response).wardrobeId;

            data.wardrobeId = wardrobeId;
          }).catch(function (error) {
            console.log('error saving capsuling selection in Cladwell: ', error.message);
            reject(error);
          });
      }
      saveProfileToElasticSearch(dispatch, resolve, reject);

    })
      .then(function () {
        callback();
      });
  };
}

export function saveCapsulingSelection(userId, data) {

  function saveProfileToElasticSearch(bodyWithId, resolve, reject) {
    window.fetch('/api/users/' + (userId || cookie.load('userid')) + '/capsuling/profile', {
      method: 'POST',
      credentials: 'same-origin',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(bodyWithId)
    })
      .then(function (response) {
        if (response.status >= 400) throw new Error('Error response from server');
        return response.text();
      })
      .then(function () {
        browserHistory.push('/workwardrobe/results');
        resolve();
      }).catch(function (error) {
        console.log('error saving capsuling selection in Elastic Search: ', error.message);
        reject(error);
      });
  }

  return dispatch => {
    return new Promise(function (resolve, reject) {
      if (data.wardrobeId) {
        window.fetch('/api/capsuling/wardrobe/' + data.wardrobeId, {
          method: 'PUT',
          credentials: 'same-origin',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            'wardrobeId': data.wardrobeId,
            'selectedCategories': data.selectedCategories
          })
        })
          .then(function (response) {
            if (response.status >= 400) throw new Error('Error response from server');
            return response.text();
          })
          .then(function (response) {
            // User Profile POST
            var bodyWithId = _.pick(data, 'selectedCategories');

            bodyWithId.wardrobeId = JSON.parse(response).wardrobeId;

            saveProfileToElasticSearch(bodyWithId, resolve, reject);
          }).catch(function (error) {
            console.log('error saving capsuling selection in Cladwell: ', error.message);
            reject(error);
          });
      } else {
        window.fetch('/api/capsuling/wardrobe', {
          method: 'POST',
          credentials: 'same-origin',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(data)
        })
          .then(function (response) {
            if (response.status >= 400) throw new Error('Error response from server');
            return response.text();
          })
          .then(function (response) {
            // User Profile POST
            var bodyWithId = _.pick(data, 'selectedCategories');

            bodyWithId.wardrobeId = JSON.parse(response).wardrobeId;

            saveProfileToElasticSearch(bodyWithId, resolve, reject);
          }).catch(function (error) {
            console.log('error saving capsuling selection in Cladwell: ', error.message);
            reject(error);
          });
      }
    });
  };
}

export default {
  loadCapsulingProfile,
  receivedCapsulingProfile,
  saveCapsulingProfile,
  saveCapsulingSelection
};
