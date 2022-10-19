const model = require('../model');

/* 获取用户列表 */
const getUserList = async (ctx, next) => {
	const User = model.User;

	const data = await User.findAll({
		where: ctx.query
	});

	ctx.rest({
		code: 200,
		msg: '获取成功',
		data: data
	});
};

/* 新增用户信息 */
const createUserForm = async (ctx, next) => {
	const User = model.User;
	const body = ctx.request.body;

	await User.create(body);

	ctx.rest({
		code: 200,
		msg: '创建成功'
	});
};

/* 删除用户 */
const deleteUserRecord = async (ctx, next) => {
	const User = model.User;

	const data = await User.findAll();

	const body = ctx.request.body.ids;

	for (let item of data) {
		if (body.includes(item.id)) {
			await item.destroy();
		}
	}

	ctx.rest({
		code: 200,
		msg: '删除成功'
	});
};

/* 更新用户信息 */
const updateUserDetail = async (ctx, next) => {
	const User = model.User;

	const data = await User.findOne({
		where: {
			id: ctx.request.body.id
		}
	});

	// await User.update(ctx.request.body, { where: { id: ctx.request.body.id }, individualHooks: true });

	Object.assign(data, ctx.request.body);

	await data.save();

	ctx.rest({
		code: 200,
		msg: '更新成功'
	});
};

module.exports = {
	'GET /api/org/user/list': getUserList,
	'DELETE /api/org/user/record': deleteUserRecord,
	'PUT /api/org/user/detail': updateUserDetail,
	'POST /api/org/user/form': createUserForm
};
