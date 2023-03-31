const express = require("express");
var request = require("request");
var axios = require("axios");

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

router.get("/getUsers", async (req, res) => {
  const response = await axios.get(
    `${process.env.API_URL}/api/management/getToken`
  );
  const token = response.data.token;

  const options = {
    method: "GET",
    url: "https://nagarrotest.us.auth0.com/api/v2/users",
    headers: { authorization: "Bearer " + token },
  };

  axios(options)
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/getRoles", async (req, res) => {
  const response = await axios.get(
    `${process.env.API_URL}/api/management/getToken`
  );
  const token = response.data.token;

  const options = {
    method: "GET",
    url: "https://nagarrotest.us.auth0.com/api/v2/roles",
    headers: { authorization: "Bearer " + token },
  };

  axios(options)
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
