const Admin = require('../controllers/proxy/user/admin');
const { generateToken } = require('../utils/jwt');
const Auth = require('../middlewares/auth');

class LoginManager {
	// 管理员登录
	static async adminLogin(params) {
		const { email, password } = params;
		// 验证账号密码是否正确，如果正确返回当前账号的详细信息
		const admin = await Admin.verify(email, password);
		// 生成token并返回
		return generateToken(admin.id, Auth.ADMIN);
	}
}

module.exports = LoginManager;
