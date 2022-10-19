const Router = require('koa-router');
const Auth = require('../../../middlewares/auth');
const Category = require('../../proxy/blog/category');
const { getRedis, setRedis } = require('../../../utils/redis');

const AUTH_ADMIN = 16;

// redis key 前缀
const API_PREFIX = 'boblog_api';

const router = new Router({
	prefix: '/api/blog'
});

/**
 * 创建分类
 */
router.post('/category', new Auth(AUTH_ADMIN).m, async (ctx, next) => {
	const body = ctx.request.body;

	const result = await Category.create({
		name: body.name,
		code: body.code,
		parent_id: body.parent_id
	});

	ctx.rest({
		code: 200,
		msg: '创建成功'
	});
});

/**
 * 删除分类，单个删除
 */
router.delete('/category/:id', new Auth(AUTH_ADMIN).m, async (ctx, next) => {
	const id = ctx.path.split('/').reverse()[0];

	await Category.destroy(id);

	ctx.rest({
		code: 200,
		msg: '删除成功'
	});
});

/**
 * 更新分类
 */
router.put('/category/edit', new Auth(AUTH_ADMIN).m, async (ctx) => {
	const body = ctx.request.body;

	await Category.update(body);

	ctx.rest({
		code: 200,
		msg: '更新成功'
	});
});

/**
 * 查询分类列表
 */
router.get('/category', async (ctx) => {
	const key = `${API_PREFIX}_category_list`;

	let data = null;
	const cacheCategoryListData = await getRedis(key);

	if (cacheCategoryListData) {
		data = cacheCategoryListData;
	} else {
		const list = await Category.list();
		setRedis(key, list, 60); // 设置缓存
		data = list;
	}

	ctx.rest({
		code: 200,
		msg: '获取成功',
		data
	});
});

/**
 * 获取分类详情
 */
router.get('/category/:id', async (ctx) => {
	const id = ctx.path.split('/').reverse()[0];

	const data = await Category.detail(id);

	ctx.rest({
		code: 200,
		msg: '获取成功',
		data
	});
});

module.exports = router;
