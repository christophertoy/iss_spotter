const request = require('request');
const fetchMyIP = function (callback) {

  request('https://api.ipify.org/?format=json', (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP ${body}`));
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
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(msg, null);
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

const nextISSTimesForMyLocation = function(callback) {


}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };