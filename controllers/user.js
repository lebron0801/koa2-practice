/* 用户管理模块 */
const model = require('../model');
const { APIError } = require('../rest');

/* 用户登录 */
const userSign = async (ctx, next) => {
	const body = ctx.request.body;

	const User = model.User;

	const user = await User.findOne({
		where: {
			name: body.username
		}
	});

	if (user) {
		if (user.passwd.trim() === body.password) {
			ctx.rest({
				code: 200,
				msg: '登录成功'
			});
		} else {
			throw new APIError(400, '密码错误');
		}
	} else {
		throw new APIError(400, '用户不存在');
	}
};

module.exports = {
	'POST /api/user/sign': userSign
};
