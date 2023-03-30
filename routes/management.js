const express = require("express");
var request = require("request");

const router = express.Router();

router.get("/getToken", async (req, res) => {
  var options = {
    method: "POST",
    url: "https://nagarrotest.us.auth0.com/oauth/token",
    headers: { "content-type": "application/json" },
    body: `{"client_id":"${process.env.CLIENT_ID}","client_secret":"${process.env.CLIENT_SECRET}","audience":"${process.env.AUDIENCE}","grant_type":"client_credentials"}`,
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    const responseJson = JSON.parse(response.body);
    const accessToken = responseJson.access_token;

    //console.log("Access token: " + accessToken);
    res.json({ token: accessToken });
  });
});

module.exports = router;
