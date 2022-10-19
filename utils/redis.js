const redis = require('redis');
const config = require('../config/redis/config');

// 创建客户端
const redisClient = redis.createClient({
	host: config.host,
	port: config.port,
	password: config.password
});

// 监听客户端错误信息
redisClient.on('error', (err) => {
	console.log('Redis err', err);
});

/**
 * 设置 redis
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间，单位 s 默认1小时
 */
function setRedis(key, val, timeout = 60 * 60) {
	if (typeof val === 'object') val = JSON.stringify(val);
	redisClient.set(key, val);
	redisClient.expire(key, timeout);
}

/**
 *  读取 redis
 * @param {string} key 键
 */
function getRedis(key) {
	return new Promise((resolve, reject) => {
		redisClient.get(key, (err, val) => {
			if (err) {
				reject(err);
				return;
			}

			if (val == null) {
				resolve(null);
				return;
			}

			try {
				resolve(JSON.parse(val));
			} catch (err) {
				resolve(val);
			}
		});
	});
}

module.exports = {
	setRedis,
	getRedis
};
