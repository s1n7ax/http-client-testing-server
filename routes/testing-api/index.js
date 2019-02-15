var express = require('express');
var path = require('path');
var router = express.Router();


/**
 * response 301 redirecion
 * if the url is passed as a query parameter, redirection location will be that
 * default it navigates to 'https//:www.google.com'
 */
router.all('/redirect/301', function (req, res, next) {
    if(!req.query.location)
        req.query.location = 'https://www.google.com/';

    res
        .status(301)
        .setHeader('Location', req.query.location)

    res.end()
})

/**
 * response 302 redirecion
 * if the url is passed as a query parameter, redirection location will be that
 * default it navigates to 'https//:www.google.com'
 */
router.all('/redirect/302', function (req, res, next) {
    if(!req.query.location)
        req.query.location = 'https://www.google.com/';

    res
        .status(302)
        .setHeader('Location', req.query.location)

    res.end()
})

/**
 * 301 circular redirect to the same APi
 */
router.all('/redirect/circular/301', function (req, res, next) {
    res
        .status(301)
        .setHeader('Location', './301')

    res.end()
})

/**
 * 302 circular redirect to the same APi
 */
router.all('/redirect/circular/302', function (req, res, next) {
    res
        .status(302)
        .setHeader('Location', './302')

    res.end()
})


/**
 * gets organization name and employee name
 * if values are not passed 400 response will be returned
 */
router.all('/url-param/:organization/:employeeName/', function(req, res, next) {
    if(!req.params.organization || !req.params.employeeName) {
        res
            .status(400)
            .send(
                `organization name and employee name should be passed to this end point
                ex:- 
                    'url-param/infor/nisala
                `
            );

    } else {
        res.status(200);
        res.send({
            organization: req.params.organization,
            employeeName: req.params.employeeName
        });
    }
})

module.exports = router