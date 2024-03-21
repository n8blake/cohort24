const router = require("express").Router();
const axios = require("axios");

router.route("/")
    .get(async function(req, res){
        const token = process.env.CANVAS_TOKEN;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const coursesUrl = "https://umd.instructure.com/api/v1/courses/";
        const { data: couresData, status: status } = await axios.get(coursesUrl, config);
        //console.log(couresData);
        //console.log(status);
        if(!couresData){
            res.status(404).send();
        } else {
            res.json(couresData);
        }
    });

router.route("/:id")
    .get(async function(req, res){
        const token = process.env.CANVAS_TOKEN;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const coursesUrl = `https://umd.instructure.com/api/v1/courses/${req.params.id}`;
        const { data: couresData, status: status } = await axios.get(coursesUrl, config);
        //console.log(couresData);
        //console.log(status);
        if(!couresData){
            res.status(404).send();
        } else {
            res.json(couresData);
        }
    });

module.exports = router;