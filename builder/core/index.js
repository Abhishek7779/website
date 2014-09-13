"use strict";

var project = 'core';
var lastVersion = require('../../package.json')._projects[project].versions[0];

module.exports = function(app){

	app.get('/builder/core', function(req, res){
		res.render('builder/index', {
			title: 'MooTools Core Builder',
			page: 'builder',
			project: 'Core',
			version: lastVersion,
			dependencies: require('../dependencies.js')(project, lastVersion)
		});
	});
};
