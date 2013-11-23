
var fs = require('fs');
var path = require('path');
var async = require('async');
var waitForIt = require('../lib/waitForIt');
var pkg = require('../package.json');

var dir = path.join(__dirname, '../', pkg._buildOutput, 'blog/posts');

function loadJSONPosts(callback){

	fs.readFile(dir + '/posts.json', function(err, json){
		if (err) return callback(err);
		try {
			callback(null, JSON.parse(json));
		} catch (e){
			callback(e);
		}
	});

}

function loadPost(post, callback){
	fs.readFile(dir + '/' + post.htmlFile, function(err, str){
		if (err) return callback(err);
		post.content = str;
		callback(null, post);
	});
}

function loadContent(posts, callback){
	async.map(posts, loadPost, callback);
}

function index(posts, callback){

	var total = {
		posts: posts,
		urls: {},
		tags: {}
	};

	posts.forEach(function(post, i){
		post.date = new Date(post.date);
		total.urls[post.permalink] = i;
		if (post.tags && Array.isArray(post.tags)) post.tags.forEach(function(tag){
			tag = tag.toLowerCase();
			(total.tags[tag] || (total.tags[tag] = [])).push(i);
		});
	});

	callback(null, total);

}

var load = async.compose(index, loadContent, loadJSONPosts);

module.exports = waitForIt(load);

var timer;
var watcher = fs.watch(dir, function(){
	clearTimeout(timer);
	timer = setTimeout(function(){
		console.log('reloading blog data');
		module.exports.reset();
	}, 200);
});
