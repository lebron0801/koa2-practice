const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const templating = require('./templating');
const corsConfig = require('./config/cors-config');
const controller = require('./controller');
const rest = require('./rest');
const koaStatic = require('koa-static');
const InitApp = require('./core/init');

// 实例化koa框架
const app = new Koa();

// 设置静态文件根目录，供模板引擎中使用
app.use(koaStatic(__dirname + '/public'));

// 初始化跨域配置
app.use(cors(corsConfig));

// 监控接口处理时长
app.use(async (ctx, next) => {
	var start = new Date().getTime();
	var execTime = 0;
	await next();
	execTime = new Date().getTime() - start;
	ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// 绑定restful 接口 api处理机制
app.use(rest.restify('/api/'));

// 转换请求体内容
app.use(bodyParser());

const isProduction = process.env.NODE_ENV === 'production';

// 初始化模板引擎
app.use(
	templating('view', {
		noCache: !isProduction,
		watch: !isProduction
	})
);

// 初始化应用:
InitApp.init(app);

// add controllers:
app.use(controller());

app.listen(3008);
console.log('app started at port 3008...');
