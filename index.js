var debug = require('debug')('menu-service');
var utils = require('utils');

var express = require('express');
var app = module.exports = express();

app.use(express.json());

app.get('/menus/:id', function (req, res) {
    //var menu = menus[req.params.id];
    var menus = [
        {
            home: {url: '/', title: 'serandives.com'},
            menu: [
                {url: 'https://auto.serandives.com', title: 'Auto'},
                {url: 'https://hotels.serandives.com', title: 'Hotels'},
                {url: 'https://jobs.serandives.com', title: 'Jobs'},
                {url: 'https://states.serandives.com', title: 'Real States'}
            ]
        }
    ];
    var menu = menus[0];
    if (!menu) {
        res.send(404, {
            error: 'specified menu cannot be found'
        });
        return;
    }
    var token = req.token;
    if (!token) {
        res.send(menu);
        return;
    }
    debug('auth token %s found for user %s', token.access, token.user);
    menu.menu.push({
        url: '/user',
        title: 'Account'
    });
    res.send(menu);
});
