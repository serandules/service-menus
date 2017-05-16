var log = require('logger')('menu-services');
var utils = require('utils');

var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/menus/:id', function (req, res) {
    var menus = [
        {
            home: {url: '/', title: 'accounts'},
            global: [
                {url: '/signin?name=ruchira ', title: 'Manage'},
                {url: '/signup', title: 'Hotels'},
                {url: 'advertising://', title: 'Advertising'},
                {url: 'autos://', title: 'Autos'}
            ],
            local: []
        },
        {
            home: {url: '/', title: 'autos'},
            global: [
                {url: '/vehicles', title: 'Search'}
            ],
            local: [
                {url: '/add', title: 'Add'},
                {url: '/mine', title: 'My Vehicles'}
            ]
        },
        {
            home: {url: '/', title: 'advertising'},
            global: [
                {url: '/advertisements', title: 'Search'},
                {url: '/add', title: 'Add'},
                {url: 'autos://', title: 'Autos'}
            ],
            local: []
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
    /*if (token.can('users', 'read')) {
     menu.menu.push({
     url: '/users',
     title: 'Users'
     });
     }*/
    res.send(menu);
});
