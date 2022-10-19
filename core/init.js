const Router = require('koa-router');
const requireDirectory = require('require-directory');

class InitApp {
	static init(app) {
		InitApp.app = app;
		InitApp.initRouters();
		InitApp.loadConfig();
		InitApp.loadHttpException();
	}

	static initRouters() {
		// 绝对路径：
		const apiDirectory = `${process.cwd()}/controllers/api`;
		// 路由自动加载：
		requireDirectory(module, apiDirectory, {
			visit: whenLoadModule
		});

		// 判断 requireDirectory 加载的模块是否为路由
		function whenLoadModule(obj) {
			if (obj instanceof Router) {
				InitApp.app.use(obj.routes());
			}
		}
	}

	static loadConfig(path = '') {
		const configPath = path || process.cwd() + '/config/config.js';
		const config = require(configPath);
		global.config = config;
	}

	static loadHttpException() {
		const errors = require('./http-exception');
		global.errs = errors;
	}
}

module.exports = InitApp;
