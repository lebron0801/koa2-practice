/* 扫描所有的数据模型进行定义 */
const fs = require('fs');
const db = require('./db');

let files = fs.readdirSync(__dirname + '/models');

let js_files = files.filter((f) => {
	return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files) {
	// 文件名称，即模型名称
	let name = f.substring(0, f.length - 3);
	module.exports[name] = require(__dirname + '/models/' + f);
}

module.exports.sync = () => {
	db.sync();
};
