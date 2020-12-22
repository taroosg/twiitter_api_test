const express = require("express");
const needle = require('needle');

const app = express();
require('dotenv').config();

const server = app.listen(3001, function () {
  console.log("Node.js is listening to PORT:" + server.address().port);
});

const token = process.env.TWITTER_API_BEARER;
const endpointURL = process.env.TWITTER_API_ENDPOINT_URL;

const getRequest = async () => {

  const params = {
    "query": "#cat -is:retweet has:media has:images",
    "tweet.fields": "attachments",
    "expansions": "attachments.media_keys",
    "media.fields": "height,url",
    "max_results": "20"
  }

  const res = await needle('get', endpointURL, params, {
    headers: {
      "authorization": `Bearer ${token}`
    }
  })

  if (res.body) {
    return res.body;
  } else {
    throw new Error('Unsuccessful request')
  }
}

app.get("/api/list", async (req, res, next) => {
  const result = await getRequest();
  res.json(result);
});