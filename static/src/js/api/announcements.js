/* @file announcements.js
 * @brief Provides the API wrappers for the announcements endpoints.
 *
 * @author Oscar Bezi (bezi@scottylabs)
 */
'use strict';

var ajax = require('./ajax');
var auth = require('./auth');

var announcements = {};

/* @brief The maximum length of an announcement. */
announcements.maxLength = 500;

/* @brief Returns a promise that resolves into a list of all announcements. */
announcements.getAll = function () {
  return ajax.get('/api/announcements');
};

/* @brief Makes a new announcement with the given data.
 *
 * A bit of a lie at the moment.  We disregard the client timestamp and use the
 * server's, I'll get around to fixing it at some point (or not, the difference
 * is tiny).
 *
 * @param {string} text The text of the announcement.
 * @param {string} timestamp The timestamp of the announcement, as an ISO
 * string.
 */
announcements.create = function (text, timestamp) {
  if (text === '') {
    return Promise.reject(new Error('Empty announcement.'));
  }

  if (text.length > announcements.maxLength) {
    return Promise.reject(new Error('Announcement too long.'));
  }

  return auth.requireAdmin(() => {
    return ajax.post('api/announcements', {'text': text});
  })
};

/* @brief Deletes the announcement with the given id. */
announcements.delete = function (id) {
  return auth.requireAdmin(() => {
    return ajax.delete(`/api/announcements/${id}`);
  })
};

module.exports = announcements;
