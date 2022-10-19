/**
 * 加载数据库配置
 */
const fs = require('fs');
const defaultConfig = './db-config-default.js';
const overrideConfig = './db-config-override.js';
const testConfig = './db-config-test.js';

let config = null;

if (process.env.NODE_ENV === 'test') {
	config = require(testConfig);
} else {
	config = require(defaultConfig);

	try {
		if (fs.statSync(overrideConfig).isFile()) {
			config = Object.assign(config, require(overrideConfig));
		}
	} catch (err) {
		console.log(`不能加载特殊配置 ${overrideConfig}.`);
	}
}

module.exports = config;
