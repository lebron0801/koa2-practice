var fn_index = async (ctx, next) => {
	ctx.render('index.html', { title: 'Welcome' });
};

var fn_signin = async (ctx, next) => {
	var name = ctx.request.body.name || '';
	var password = ctx.request.body.password || '';

	if (name === 'koa' && password === '12345') {
		// 登录成功
		ctx.render('signin-ok.html', { name: name });
	} else {
		// 登录失败
		ctx.render('signin-failed.html', {});
	}
};

module.exports = {
	'GET /': fn_index,
	'POST /signin': fn_signin
};
