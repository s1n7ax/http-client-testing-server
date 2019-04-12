var express = require('express');
var router = express.Router();
var auth = require('basic-auth');

/**
 * middleware functiion that to validate expected request method
 * pass _method query parameter if you want to validate the method of the request againse the _method value
 * 404 will be returned if the request does not match
 */
router.routeValidation = (req, res, next) => {
    if(req.query._method) {
        if(req.method.toUpperCase() !== req.query._method.toUpperCase()) {
            res.sendStatus(404)
            res.end();
            return false;
        }
    }

    return next();
}

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
 */
router.all('/url-param/:organization/:employeeName', function(req, res, next) {
    if(!req.params.organization || !req.params.employeeName) {
        res
            .status(400)
            .send(
                `organization name and employee name should be passed to this end point
                ex:- 
                    'url-param/infor/nisala'
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

/**
 * gets 'organization' and 'employeeName'
 * if values are not passed, 400 response will be returned
 */
router.all('/query-param', function (req, res, next) {
    if(!req.query.organization || !req.query.employeeName) {
        res
            .status(400)
            .send(
                `organization name and employee name should be passed to this end point
                ex:- 
                    'url-param/infor/nisala'
                `
            );

    } else {
        res.status(200);
        res.send({
            organization: req.query.organization,
            employeeName: req.query.employeeName
        });
    }
})

/**
 * gets 'organization' and 'employeeName' as json payload
 * 
 * sample:
 * {"organization" : "org", "employeeName" : "keypton"}
 * 
 * 400 if invalid json is passed
 * 
 */
router.all('/json-payload', function(req, res, next) {
    if(req.query.customBody === 'true') {
        res.send(req.body);
        return;
    }
  
    if(!req.body || !req.body.organization || !req.body.employeeName) {

        res.status(400)
        res.write(`
        request body expected from the request
        body should contain organization and employeeName
        ex:-
        
            {
                "organization": "infor",
                "employeeName": "krypton"
            }
        `)
        res.end();
        return
    }
    
    res.send(req.body)
});

/**
 * gets any type of payload and will be read as utl8 encoding
 * request will timout after 5 seconds
 */
router.all('/payload', (req, res, next) => {
    let reqHandled = false;
    let data = ''
    req.setEncoding('utf8')

    req.on('data', (_data) => {
        data += _data;
        console.log('data: ' + data)
    })

    req.on('end', () => {
        if(reqHandled)
            return;
        
        reqHandled = true
        if(data) {
            res.send(data)
        } else {
            res.status(400)
            res.write(`request data should be sent with the request`)
            res.end()
        }
    })
    
    setTimeout(() => {
        if(reqHandled) 
            return;

        reqHandled = true;
        res.status(400)
        res.write('requst timeout took too long to process or application/json request type')
        res.end();
    }, 500)
});

/**
 * validate customHeader value and return all the header values as the response
 * IF customHeader is not passed request will be rejected as 400
 */
router.all('/headers', function (req, res, next) {
    if(!req.get('customHeader')) {
        res.status(400)
        res.write(`Header value "customHeder" should be passed`);
        res.end();
        return;
    }

    res.send(req.headers);
})

router.all('/random/*?', function(req, res, next) {
    res.send({
        header: req.headers,
        query: req.query,
        param: req.params,
        body: req.body
    });
});

/**
 * This is for the browser authentication popup for basic authentication
 * If the user and password is not 'krypton' 'krypton', you gets authentication popup
 * Valid user will received 200 and 'Welcome' message as payload
 */
router.get('/authentication/auth-popup', function(req, res, next) {
    let user = auth(req);

    if (user === undefined || user['name'] !== 'krypton' || user['pass'] !== 'krypton') {
        res.statusCode = 401
        res.setHeader('WWW-Authenticate', 'Basic realm="Node"')
        res.end('Unauthorized')
    } else {
        res.send("<h1>Welcome</h1>")
    }
})

/**
 * takes only x-www-form-urlencoded form data
 */
router.post('/form/login', function(req, res, next) {

    if(!req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        res.status(401)
        res.end('allowed only content type: application/x-www-form-urlencoded data')

    } else if(!req.body.username || !req.body.password){
        res.status(401)
        res.end('"username" and "password" values should be passed as form')

    } else {
        res.status(200)
        res.send({
            username: req.body.username,
            password: req.body.password
        }) 
    }
});


module.exports = router