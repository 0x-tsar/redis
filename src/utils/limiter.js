const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

const limiter = rateLimit({
  windowMs: 30 * 1000, //reset atempts after 30 seconds
  max: 3, // max 3 atempts
});

const speedLimiter = slowDown({
  windowMs: 15 * 1000,
  delayAfter: 1, //starts after the first one
  delayMs: 500, //delays +500/ms after  each atempt
});

module.exports = {
  limiter,
  speedLimiter,
};
