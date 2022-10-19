const fs = require('fs');

/**
 * 路由注册
 * @param {*} router 路由对象
 * @param {*} mapping 控制器对象
 */
function addMapping(router, mapping) {
	for (let url in mapping) {
		if (url.startsWith('GET ')) {
			const path = url.substring(4);
			router.get(path, mapping[url]);
		} else if (url.startsWith('POST ')) {
			const path = url.substring(5);
			router.post(path, mapping[url]);
		} else if (url.startsWith('PUT ')) {
			const path = url.substring(4);
			router.put(path, mapping[url]);
		} else if (url.startsWith('DELETE ')) {
			const path = url.substring(7);
			router.del(path, mapping[url]);
		} else {
			console.log(`无效的: ${url}`);
		}
	}
}

/**
 * 同步读取控制器所有文件
 * @param {*} router 路由对象
 * @param {*} dir 控制器目录名
 */
function addControllers(router, dir) {
	fs.readdirSync(__dirname + '/' + dir)
		.filter((f) => {
			return f.endsWith('.js');
		})
		.forEach((f) => {
			console.log(f);
			// 单个控制器文件对象：
			let mapping = require(__dirname + '/' + dir + '/' + f);
			addMapping(router, mapping);
		});
}

module.exports = function (dir) {
	let controllers_dir = dir || 'controllers';
	const router = require('koa-router')();
	addControllers(router, controllers_dir);
	return router.routes();
};
