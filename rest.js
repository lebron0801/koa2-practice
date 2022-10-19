/* rest api 数据统一返回机制，包括错误处理 */
module.exports = {
	APIError: function (code, msg) {
		this.code = code;
		this.msg = msg;
	},
	restify: (pathPrefix) => {
		pathPrefix = pathPrefix || '/api/';

		return async (ctx, next) => {
			if (ctx.request.path.startsWith(pathPrefix)) {
				// 绑定rest()方法:
				ctx.rest = (data) => {
					ctx.response.type = 'application/json';
					ctx.response.body = data;
				};

				try {
					await next();
				} catch (e) {
					// 返回错误:
					ctx.response.status = 400;
					ctx.response.type = 'application/json';
					ctx.response.body = {
						code: e.code,
						msg: e.msg
					};
				}
			} else {
				await next();
			}
		};
	}
};
