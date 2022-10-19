const nunjucks = require('nunjucks');

/**
 * 创建模板引擎运行环境
 * @param {*} path 模板文件目录名称
 * @param {*} opts 模板引擎配置选项
 */
function createEnv(path, opts) {
	const autoescape = opts.autoescape === undefined ? true : opts.autoescape;
	const noCache = opts.noCache || false; // 模板是否启用缓存
	const watch = opts.watch || false; // 是否启用监听模式
	const throwOnUndefined = opts.throwOnUndefined || false;

	const env = new nunjucks.Environment(
		new nunjucks.FileSystemLoader(path || 'views', {
			noCache: noCache,
			watch: watch
		}),
		{
			autoescape: autoescape,
			throwOnUndefined: throwOnUndefined
		}
	);

	if (opts.filters) {
		for (var f in opts.filters) {
			env.addFilter(f, opts.filters[f]);
		}
	}

	return env;
}

/**
 * 将模板编译结果挂载到koa对象上
 * @param {*} path 模板文件目录名称
 * @param {*} opts 模板引擎配置选项
 */
function templating(path, opts) {
	// 创建Nunjucks的env对象:
	const env = createEnv(path, opts);

	return async (ctx, next) => {
		/**
		 * 给ctx绑定render函数:
		 * @param {*} view 模板文件名称 eg: index.html
		 * @param {*} model 模板所需要的实体数据
		 */
		ctx.render = function (view, model) {
			// 把render后的内容赋值给response.body:
			ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
			// 设置Content-Type:
			ctx.response.type = 'text/html';
		};
		// 继续处理请求:
		await next();
	};
}

module.exports = templating;
