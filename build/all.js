"use strict";

var async = require('async');
var spawn = require('child_process').spawn;

var cmds = [
/*
	["build/docs", "prime"],
	["build/docs", "elements"],
	["build/docs", "moofx"],
	["build/docs", "agent"],
	["build/docs", "slick"],
	["build/guides", "prime"],
	["build/guides", "elements"],
	["build/guides", "moofx"],
	["build/guides", "agent"],
*/
	["build/docs", "core"],
	["build/docs", "more"],
	["build/guides", "core"],
	["build/guides", "more"],
	["build/blog"]
];

function spawnCmd(cmd, callback){
	spawn("node", cmd, {
		stdio: 'inherit',
		cwd: __dirname + '/..'
	})
		.on('close', callback)
		.on('error', function(err){
			throw err;
		});
}

async.series([
	async.apply(spawnCmd, ["build/repositories"]),
	async.apply(async.each, cmds, spawnCmd)
]);
