var log = require('logger')('service-menus');
var bodyParser = require('body-parser');

var utils = require('utils');
var auth = require('auth');
var throttle = require('throttle');
var serandi = require('serandi');

module.exports = function (router, done) {
    router.use(serandi.ctx);
    router.use(throttle.apis({name: 'menus'}));
    router.use(bodyParser.json());

    router.get('/:id', function (req, res) {
        var menus = [
            {
              home: {url: '/', title: 'accounts'},
              global: [
                {url: 'autos://', title: 'Autos'}
              ],
              local: [],
              user: [
                {url: '/profile', title: 'Profile'},
                  {url: '/contacts', title: 'Contacts'},
                  {url: '/locations', title: 'Locations'}
              ]
            },
            {
                home: {url: '/', title: 'accounts'},
                global: [
                    {url: '/signin?name=ruchira ', title: 'Manage'},
                    {url: '/signup', title: 'Hotels'},
                    {url: 'autos://', title: 'Autos'}
                ],
                local: []
            },
            {
                home: {url: '/', title: 'admin'},
                global: [
                    {url: 'autos://', title: 'Autos'},
                    {url: 'accounts://', title: 'Accounts'}
                ],
                local: [
                    {url: '/locations', title: 'Locations'},
                    {url: '/contacts', title: 'Contacts'},
                    {url: '/vehicles', title: 'Vehicles'}
                ],
                user: [
                  {url: 'accounts://', title: 'Account'}
                ]
            },
            {
                home: {url: '/', title: 'autos'},
                global: [
                    {url: '/vehicles', title: 'Search'}
                ],
                local: [
                    {url: '/create-vehicles', title: 'Add'},
                    {url: '/mine', title: 'My Vehicles'}
                ],
                user: [
                  {url: 'accounts://', title: 'Account'}
                ]
            },
            {
                home: {url: '/', title: 'advertising'},
                global: [
                    {url: '/advertisements', title: 'Search'},
                    {url: '/create-advertisements', title: 'Add'},
                    {url: 'autos://', title: 'Autos'}
                ],
                local: []
            },
            {
                home: {url: '/', title: 'serandives'},
                global: [
                    {url: 'autos://', title: 'Autos'},
                    {url: 'realestates://', title: 'Real Estates'}
                ],
                local: [
                    {url: 'accounts://', title: 'Accounts'}
                ],
                user: [
                    {url: 'accounts://', title: 'Account'}
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
        /*if (token.can('users', 'read')) {
         menu.menu.push({
         url: '/users',
         title: 'Users'
         });
         }*/
        res.send(menu);
    });

    done();
};
