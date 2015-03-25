var log = require('logger')('menu-service');
var utils = require('utils');

var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/menus/:id', function (req, res) {
    //var menu = menus[req.params.id];
    var menus = [
        {
            home: {url: '/', title: 'serandives.com'},
            menu: [
                {url: 'https://autos.serandives.com', title: 'Autos'},
                {url: 'https://hotels.serandives.com', title: 'Hotels'},
                {url: 'https://jobs.serandives.com', title: 'Jobs'},
                {url: 'https://states.serandives.com', title: 'Real States'}
            ]
        }
    ];
    var menu = menus[0];
    if (!menu) {
        res.status(404).send({
            error: 'specified menu cannot be found'
        });
        return;
    }
    var token = req.token;
    if (!token) {
        res.send(menu);
        return;
    }
    menu.menu.push({
        url: '/user',
        title: 'Account'
    });
    res.send(menu);
});
