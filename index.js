var log = require('logger')('menu-service');
var utils = require('utils');

var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/menus/:id', function (req, res) {
    var menus = [
        {
            home: {url: '/', title: 'autos'},
            menu: [
                {url: 'https://autos.serandives.com', title: 'Autos'},
                {url: 'https://hotels.serandives.com', title: 'Hotels'},
                {url: 'https://jobs.serandives.com', title: 'Jobs'},
                {url: 'https://states.serandives.com', title: 'Real States'}
            ]
        },
        {
            home: {url: '/', title: 'accounts'},
            menu: [
                {url: '/login', title: 'Sign in'},
                {url: '/signup', title: 'Sign up'},
                {url: 'https://jobs.serandives.com', title: 'Jobs'},
                {url: 'https://states.serandives.com', title: 'Real States'}
            ]
        }
    ];
    var id = req.params.id;
    var menu = menus[id];
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
        url: 'https://accounts.serandives.com',
        title: 'Account'
    });
    res.send(menu);
});
