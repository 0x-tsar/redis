const express = require("express");
const fetchFiles = require("../lib/library");

const Redis = require("redis");
const { limiter, speedLimiter } = require("../utils/limiter");

const redisClient = Redis.createClient();
const DEFAULT_EXPIRATION = 3600;

const emojis = require("./emojis");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

const checkApi = (req, res, next) => {
  const value = Object.values(req.query)[0];
  if (apiKeys.has(value)) {
    next();
  } else {
    const error = new Error("Invalid API KEY");
    next(error);
  }
};

const apiKeys = new Map();
apiKeys.set("12345", true);

router.get("/fotos", checkApi, async (req, res) => {
  redisClient.get("photos", async (error, photos) => {
    if (error) console.error(error);
    if (photos) {
      console.log(photos);
      return res.json(JSON.parse(photos));
    } else {
      const data = await fetchFiles();
      redisClient.setex("photos", DEFAULT_EXPIRATION, JSON.stringify(data));
      res.status(200).json(data);
    }
  });
});

router.get("/fotos/:id", async (req, res) => {
  const photoId = req.params.id;
  redisClient.get("photo", async (error, photo) => {
    if (error) console.error(error);
    if (photo) {
      return res.json(JSON.parse(photo));
    } else {
      const data = await fetchFiles(photoId);
      redisClient.setex("photo", DEFAULT_EXPIRATION, JSON.stringify(data));
      res.status(200).json(data);
    }
  });
});

router.use("/emojis", emojis);

module.exports = router;
