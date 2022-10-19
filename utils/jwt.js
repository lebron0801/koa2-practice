const jwt = require('jsonwebtoken');

/**
 * 生成令牌
 * @param {string} uid 用户编号
 * @param {*} scope 授权范围
 * @returns 令牌
 */
const generateToken = function (uid, scope) {
	const secretKey = global.config.security.secretKey;
	const expiresIn = global.config.security.expiresIn;
	const token = jwt.sign(
		{
			uid,
			scope
		},
		secretKey,
		{
			expiresIn: expiresIn
		}
	);

	return token;
};

module.exports = {
	generateToken
};
