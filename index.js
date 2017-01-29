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
                {url: 'advertising://', title: 'Advertising'},
                {url: 'autos://', title: 'Autos'}
            ]
        },
        {
            home: {url: '/', title: 'autos'},
            menu: [
                {url: '/vehicles', title: 'Search'},
                {url: '/add', title: 'Add'},
                {url: 'advertising://', title: 'Advertising'}
            ]
        },
        {
            home: {url: '/', title: 'advertising'},
            menu: [
                {url: '/advertisements', title: 'Search'},
                {url: '/add', title: 'Add'},
                {url: 'autos://', title: 'Autos'}
            ]
        }
    ];
    var id = req.params.id;
    var menu = menus[id];
    if (!menu) {
        res.status(404).send([{
            code: 404,
            message: 'Menu Not Found'
        }]);
        return;
    }
    var token = req.token;
    if (!token) {
        res.send(menu);
        return;
    }
    menu.menu.push({
        url: 'accounts://',
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
