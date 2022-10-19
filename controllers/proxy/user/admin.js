const model = require('../../../model');
const bcrypt = require('bcryptjs');

class Admin {
	static async create(params) {
		const { email } = params;

		const hasAdmin = await model.Admin.findOne({
			where: {
				email
			}
		});

		if (hasAdmin) {
			throw new global.errs.ParameterException('已存在');
		}

		await model.Admin.create(params);
	}

	/**
	 * 校验当前登录账号信息
	 * @param {String} email 邮箱
	 * @param {string} plainPassword 密码 明文
	 * @returns 当前账号的详细信息
	 */
	static async verify(email, plainPassword) {
		// 查询用户是否存在
		const admin = await model.Admin.findOne({
			where: {
				email
			}
		});

		if (!admin) {
			throw new global.errs.AuthFailed('账号不存在或者密码不正确');
		}

		// 验证密码是否正确
		const correct = bcrypt.compareSync(plainPassword, admin.password);

		if (!correct) {
			throw new global.errs.AuthFailed('账号不存在或者密码不正确');
		}

		return admin;
	}

	/**
	 * 获取管理员信息
	 * @param {string} id 管理员编号
	 * @returns 管理员明细
	 */
	static async detail(id) {
		// 查询管理员是否存在
		const admin = await model.Admin.findOne({
			where: {
				id
			}
		});

		if (!admin) {
			throw new global.errs.AuthFailed('账号不存在或者密码不正确');
		}

		return admin;
	}
}

module.exports = Admin;
