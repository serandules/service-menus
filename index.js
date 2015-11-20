var log = require('logger')('menu-services');
var utils = require('utils');

var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/menus/:id', function (req, res) {
    var menus = [
        {
            home: {url: '/', title: 'accounts'},
            menu: [
                {url: '/signin?name=ruchira ', title: 'Manage'},
                {url: '/signup', title: 'Hotels'},
                {url: 'https://jobs.serandives.com', title: 'Jobs'},
                {url: 'https://states.serandives.com', title: 'Real States'}
            ]
        },
        {
            home: {url: '/', title: 'autos'},
            menu: [
                {url: '/signin', title: 'Sign in'},
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
        title: 'Profile'
    });
    /*if (token.can('users', 'read')) {
     menu.menu.push({
     url: '/users',
     title: 'Users'
     });
     }*/
    res.send(menu);
});
