'use strict';
const PORT = 3000;

// #region completed functions
function addRoutes(app, port, urls) {
	var uaction, added, hostname, urlBase;

	if (!app) throw new Error('app-instance is null!');
	if (!port) throw new Error('port-instance is null!');
	if (!urls) throw new Error('urls-instance is null!');
	if (urls && typeof (urls) === 'object' && Array.isArray(urls)) {
		hostname = 'riktest';
		hostname = process.env['COMPUTERNAME'].toLowerCase();
		urlBase = `http://${hostname}:${PORT}`;
		urls.forEach(url => {
			added = true;

			if (url.url)
				if (url.action)
					if (url.handler) {
						switch (uaction = url.action.toUpperCase()) {
							case 'GET': app.get(url.url, url.handler); break;
							case 'POST': app.post(url.url, url.handler); break;
							case 'PUT': app.put(url.url, url.handler); break;
							case 'PATCH': app.patch(url.url, url.handler); break;
							case 'DELETE': app.delete(url.url, url.handler); break;
							case 'COPY': app.copy(url.url, url.handler); break;
							case 'HEAD': app.head(url.url, url.handler); break;
							case 'OPTIONS': app.options(url.url, url.handler); break;
							case 'LINK': app.link(url.url, url.handler); break;
							case 'LOCK': app.lock(url.url, url.handler); break;
							case 'UNLOCK': app.unlock(url.url, url.handler); break;
							case 'UNLINK': app.unlink(url.url, url.handler); break;
							case 'PURGE': app.purge(url.url, url.handler); break;
							case 'PROPFIND': app.propfind(url.url, url.handler); break;
							case 'VIEW':
								added = false;
								break;
							default:
								added = false;
								console.warn('unhandled request-type: ' + uaction);
								break;
						}
						if (added)
							console.log(`${urlBase}${url.url} [${uaction}]`);
					} else console.warn('missing handler!');
				else console.warn('missing action');
			else console.warn('missing url');
		});

	} else
		throw new Error('problem with \'urls\'');
}
// #endregion completed functions

// #region handlers
function handleF1(req, res) {
	// uses req.query
	res.status(200).send('[' + req.method + '] ' + 'in ' + handleF1.name +
		(req.query ? ('(query=' + JSON.stringify(req.query) + ')') : '') + '.');
}

function handleF2(req, res) {
	// uses req.params
	res.status(200).send('[' + req.method + '] ' + 'in ' + handleF2.name + (req.params ? ('(params=' + JSON.stringify(req.params) + ')') : '') + '.');
}

function handleF3(req, res) {
	// uses req.params
	// res.status(200).send('in ' + handleF3.name + '.');
	res.status(200).send('[' + req.method + '] ' + 'in ' + handleF3.name + (req.params ? ('(params=' + JSON.stringify(req.params) + ')') : '') + '.');
}

function handleF4(req, res) {
	// res.status(200).send('in ' + handleF4.name + '.');
	res.status(200).send('[' + req.method + '] ' + 'in ' + handleF4.name + (req.params ? ('(params=' + JSON.stringify(req.params) + ')') : '') + '.');
}

function handleF5(req, res) {
	// copy an existing record, creating a new primary-key
	// if non-existant, create a new one.
	// res.status(200).send('in ' + handleF5.name + '.');
	res.status(200).send('[' + req.method + '] ' + 'in ' + handleF5.name + (req.params ? ('(params=' + JSON.stringify(req.params) + ')') : '') + '.');
}

function handleF6(req, res) {
	var ret = JSON.stringify(req.headers, null, '\t');
	// res.status(200).send('in ' + handleF6.name + '.');
	res.setHeader('Content-Type', 'application/json');
	res.status(200).send(ret);
}

function handleF7(req, res) {
	res.status(200).send('in ' + handleF7.name + '.');
}

function handleF8(req, res) { res.status(200).send('in ' + handleF8.name + '.'); }
function handleF9(req, res) { res.status(200).send('in ' + handleF9.name + '.'); }
function handleF10(req, res) { res.status(200).send('in ' + handleF10.name + '.'); }
function handleF11(req, res) { res.status(200).send('in ' + handleF11.name + '.'); }
function handleF12(req, res) { res.status(200).send('in ' + handleF12.name + '.'); }
function handleF13(req, res) { res.status(200).send('in ' + handleF13.name + '.'); }
function handleF14(req, res) { res.status(200).send('in ' + handleF14.name + '.'); }
// #endregion handlers

// #region main-line function
/*
* main - line function
*/
function main(listenPort) {
	var app, express, bodyParser, cors;

	bodyParser = require('body-parser');	// adds x-www-form-urlencoded data into the Request
	cors = require('cors');
	express = require('express');

	app = express();

	// // This middleware will not allow the
	// // request to go beyond it
	// app.use(function (req, res, next) {
	// 	console.log('Middleware called');
	// 	next();
	// });

	app.use(cors());
	app.use(bodyParser.urlencoded({ extended: false }));

	addRoutes(
		app,
		listenPort,
		[
			{ url: '/f1', action: 'GET', handler: handleF1 },
			{ url: '/f2/put/:company', action: 'PUT', handler: handleF2 },
			{ url: '/f3/patch/:company', action: 'PATCH', handler: handleF3 },
			{ url: '/f4/delete/:company', action: 'DELETE', handler: handleF4 },
			{ url: '/f5/copy/:company', action: 'COPY', handler: handleF5 },
			{ url: '/f6', action: 'HEAD', handler: handleF6 },
			{ url: '/f7', action: 'OPTIONS', handler: handleF7 },
			{ url: '/f8', action: 'LINK', handler: handleF8 },
			{ url: '/f9', action: 'UNLINK', handler: handleF9 },
			{ url: '/f10', action: 'PURGE', handler: handleF10 },
			{ url: '/f11', action: 'LOCK', handler: handleF11 },
			{ url: '/f12', action: 'UNLOCK', handler: handleF12 },
			{ url: '/f13', action: 'PROPFIND', handler: handleF13 },
			{ url: '/f14', action: 'VIEW', handler: handleF14 },
		]);
	app.listen(listenPort, () => {
		console.log(`Example app listening on port ${listenPort}`);
	});
	console.log('in main');
}
// #endregion main-line function

try {
	main(PORT);
} catch (anException) {
	console.error(anException.message);
}