const request = require('request');

const fetchMyIP = function (callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP ${body}`), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body).data;
    callback(null, { latitude, longitude });
    return;
  });

};


const fetchISSFlyOverTimes = function (coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching ISS pass times with coordinates. Response: ${body}`), null);
      return;
    }

    const data = JSON.parse(body).response;
    callback(null, data);
    return;

  });
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {

    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, coords) => {

      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyOverTimes(coords, (error, flytimes) => {

        if (error) {
          callback(error, null);
          return;
        }

        callback(null, flytimes);

      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };