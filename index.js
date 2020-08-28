// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');


// fetchMyIP((error,ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP("68.148.13.185", (error, data) => {
//   if (error) {
//     console.log("It didn't work", error);
//     return;
//   }
//   console.log("It worked! Returned Coords:", data);
// });

// fetchISSFlyOverTimes({ latitude: '53.58500', longitude: '-113.55260' }, (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned flyover times:', data);
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const date = new Date(0);
    date.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }

};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});