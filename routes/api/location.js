const router = require("express").Router();

const axios = require("axios");
const makeToken = require("../../utils/AppleTokenGenerator");

router.route("/")
    .get(async function(req, res){
        console.log(req.query);
        if(req.query.lat && req.query.long){
            const latitude = req.query.lat;
            const longitude = req.query.long;
            const token = makeToken();
            const revGeoCodeUrl = `https://maps-api.apple.com/v1/reverseGeocode?loc=${latitude}%2C${longitude}`;
            const accessTokenUrl = `https://maps-api.apple.com/v1/token`;
            const accessTokenConfig = {
              headers: { Authorization: `Bearer ${token}` },
            };
            console.log("getting access token");
            const accessTokenData = await axios
              .get(accessTokenUrl, accessTokenConfig)
              .catch((error) => {
                console.log(error);
                res.status(401).send();
              });
            console.log(accessTokenData.data);
            if(accessTokenData.data && accessTokenData.data.accessToken){
                const accessToken = accessTokenData.data.accessToken;
                const config = {
                headers: { Authorization: `Bearer ${accessToken}` },
                };
                const data = await axios
                .get(revGeoCodeUrl, config)
                .catch((error) => {
                    console.error(error);
                })
            if(data){
                console.log("Got data");
                //console.log(data);
                if (data.data.results) {
                    console.log("results")
                    console.log(data.data.results);
                  res.json(data.data.results);
                } else {
                  res.status(400).send();
                }
            } else {
                res.status(401).send();
            }
            } else {
                res.status(401).send();
            }
            
        } else {
            console.log("error with request body")
            res.status(400).send();
        }
    })

module.exports = router;