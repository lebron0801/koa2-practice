const db = require('../db');
const bcrypt = require('bcryptjs');

module.exports = db.defineModel('admins', {
	nickname: {
		type: db.STRING(36),
		comment: '管理员昵称'
	},
	email: {
		type: db.STRING(36),
		unique: true,
		comment: '管理员邮箱'
	},
	password: {
		type: db.STRING,
		set(val) {
			// 加密：
			const salt = bcrypt.genSaltSync(10);
			// 生成加密密码：
			const psw = bcrypt.hashSync(val, salt);
			this.setDataValue('password', psw);
		},
		comment: '管理员密码'
	},
	gender: {
		type: db.BOOLEAN,
		comment: '性别',
		allowNull: true
	},
	birth: {
		type: db.STRING(10),
		comment: '生日',
		allowNull: true
	}
});
