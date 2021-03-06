/* @file ProfileActions.js
 * @brief All actions related to user profiles.
 *
 * @author Oscar Bezi (bezi@scottylabs)
 */
'use strict';

var Dispatcher = require('../Dispatcher');
var api = require('../api/profile');
var types = require('../ActionTypes');

var loadProfile = function () {
  api.get().then((profile) => {
    Dispatcher.dispatch({
      'type': types.PROFILE_LOAD,
      'data': profile,
    });
  });
};

var updateProfile = function (profile) {
  Dispatcher.dispatch({
    'type': types.PROFILE_UPDATE,
    'data': profile,
  });

  api.update(profile).then(loadProfile).catch(loadProfile);
};

module.exports = {
  'load': loadProfile,
  'update': updateProfile,
};
