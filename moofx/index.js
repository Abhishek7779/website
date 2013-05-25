"use strict";

var docs = require('../middleware/docs')('moofx', {
	title: "MooTools MooFx Documentation"
});

var guides = require('../middleware/guides')('moofx', {
	title: "MooTools MooFx Guides"
});

module.exports = function(app){

	var moofx = function(req, res, next){
		res.locals.site = 'moofx';
		next();
	};

	app.get('/moofx', moofx, function(req, res){
		res.render('moofx/index', {
			page: "/moofx",
			title: "MooTools MooFx"
		});
	});

	app.get('/moofx/docs', moofx, docs);
	app.get('/moofx/docs/:version', moofx, docs);

	app.get('/moofx/guides', moofx, guides.index);
	app.get('/moofx/guide/:guide', moofx, guides.article);

};
