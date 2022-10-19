const Router = require('koa-router');
const Admin = require('../../proxy/user/admin');
const LoginManager = require('../../../services/login');
const Auth = require('../../../middlewares/auth');

const AUTH_ADMIN = 16;

const router = new Router({
	prefix: '/api/user/admin'
});

/**
 * 用户注册
 */
router.post('/register', async (ctx, next) => {
	const body = ctx.request.body;

	const admin = await Admin.create({
		email: body.email,
		password: body.password2,
		nickname: body.nickname
	});

	ctx.rest({
		code: 200,
		msg: '创建成功'
	});
});

/**
 * 用户登录
 */
router.post('/login', async (ctx, next) => {
	const body = ctx.request.body;

	const token = await LoginManager.adminLogin({
		email: body.email,
		password: body.password
	});

	ctx.rest({
		code: 200,
		msg: '登录成功',
		data: {
			token: token
		}
	});
});

/**
 * 获取用户信息
 */
router.get('/auth', new Auth(AUTH_ADMIN).m, async (ctx, next) => {
	// 获取用户ID
	const id = ctx.auth.uid;

	// 查询用户信息
	let userInfo = await Admin.detail(id);

	// 返回结果
	ctx.rest({
		code: 200,
		msg: '获取成功',
		data: {
			userInfo
		}
	});
});

module.exports = router;
