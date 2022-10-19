/**
 * 跨域配置中心
 */
const config = {
	// 允许请求的域名
	origin: function (ctx) {
		if (ctx.url === '/test') {
			return '*';
		}

		return '*';
	},
	// 允许前台读取的头部字段
	exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
	// 本次预检请求的缓存有效时间，单位 秒
	maxAge: 60,
	// 是否允许发送Cookie
	credentials: false,
	// 允许前台使用的请求方法
	allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
	// 允许前台使用的头部字段
	allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Tenant']
};

module.exports = config;
